const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true
  }
});
const axios = require('axios');

const users = new Map();
var jwtT = null;
io.on('connection', (socket) => {
  console.log('연결 성공... ');

  // //db값이 바뀌면 알림 전송 고민
  if (jwtT !== null) {
    setInterval(() => {
      if (jwtT) {
        const memList = Array.from(users.keys());
        axios
          .get(`http://localhost:8081/car_rez/loadAlarm/${memList}`, {
            headers: {
              Authorization: jwtT
            }
          })
          .then((res) => {
            // console.log(res.data);
            for (let memCode of Array.from(users.keys())) {
              var filterData = res.data.filter((item) => {
                return !item['mem_code'] || item['mem_code'].includes(memCode);
              });
              io.to(users.get(memCode)).emit('loadAlarm', filterData);
            }
            // io.emit('loadAnnouncement', res.data);
          });
      }
    }, 60000);
  }

  socket.on('loginSuccess', ({ memCode, jwt }) => {
    console.log('login');
    console.log(memCode);
    users.set(memCode, socket.id);
    console.log(users);
    const memCodes = [memCode];
    jwtT = jwt;
    //로그인시 alarm정보 가져오기
    axios
      .get(`http://localhost:8081/car_rez/loadAlarm/${memCodes}`, {
        headers: {
          Authorization: jwt
        }
      })
      .then((res) => {
        // console.log('alarmInfo');
        // console.log(res.data);
        if (res.data !== null) {
          var filterData = res.data.filter((item) => {
            return (
              // item['contents'].includes('전체') ||
              !item['mem_code'] || item['mem_code'].includes(memCode)
            );
          });
          io.to(users.get(memCode)).emit('loadAlarm', filterData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });

  // socket.on('clickAlarm', ({ alert_code, jwt, mem_code }) => {
  //   console.log(alert_code);
  //   console.log(jwt);
  //   axios
  //     .get(`http://localhost:8081/car_rez/loadAlarm/${mem_code}`, {
  //       headers: {
  //         Authorization: jwt
  //       }
  //     })
  //     .then((res) => {
  //       console.log('alarmInfo');
  //       console.log(res.data);
  //       io.to(users.get(mem_code)).emit('loadAlarm2', res.data);
  //     });
  // });

  socket.on('allParticipant', ({ ptList, mr_rez_code, jwt }) => {
    for (let mem of ptList) {
      alertDTO = {
        mem_code: mem.mem_code,
        contents: `예약 번호 : ${mr_rez_code}\n회의실 예약 참석자로 지정되었습니다.`
      };
      axios
        .post(`http://localhost:8081/car_rez/alarmSave`, alertDTO, {
          headers: {
            Authorization: jwt
          }
        })
        .then((res) => {
          // console.log(res.data);
          // mrRezDatas = res.data;
        });
      // for (let memCode of Array.from(users.keys())) {
      //   if (mem.mem_code === memCode) {
      //     console.log(memCode + ' 참석자 입니다. 소켓 : ' + users.get(memCode));
      //     axios
      //       .get(`http://localhost:8081/car_rez/loadAlarm/${memCode}`, {
      //         headers: {
      //           Authorization: jwt
      //         }
      //       })
      //       .then((res) => {
      //         console.log('alarmInfo');
      //         console.log(res.data);
      //         io.to(users.get(memCode)).emit('loadAlarm', res.data);
      //         // mrRezDatas = res.data;
      //       });
      //     // io.to(users.get(memCode)).emit(
      //     //   'mrRezParticipant',
      //     //   '회의실 예약 참석자로 지정되었습니다.'
      //     // );
      //   }
      // }
    }
  });

  socket.on('disconnect_mem', (mem_code) => {
    console.log('delete');
    console.log(mem_code);
    users.delete(mem_code);
    console.log(users);
    // socket.off();
  });

  //DB값 변경 시 값 불러오기
  socket.on('changeDB', ({ memList, jwt }) => {
    console.log(memList);

    //변화된 사람 알람만 가져오기
    axios
      .get(`http://localhost:8081/car_rez/loadAlarm/${memList}`, {
        headers: {
          Authorization: jwt
        }
      })
      .then((res) => {
        //변화된 클라이언트들에게만 알람보내기
        // console.log(res.data);
        for (let mem of memList) {
          for (let memCode of Array.from(users.keys())) {
            if (mem === memCode) {
              var filterData = res.data.filter((item) => {
                return !item['mem_code'] || item['mem_code'].includes(memCode);
              });
              io.to(users.get(memCode)).emit('loadAlarm', filterData);
            }
          }
        }
      });
  });

  socket.on('allUsers', (jwt) => {
    const memList = Array.from(users.keys());
    axios
      .get(`http://localhost:8081/car_rez/loadAlarm/${memList}`, {
        headers: {
          Authorization: jwt
        }
      })
      .then((res) => {
        for (let memCode of Array.from(users.keys())) {
          var filterData = res.data.filter((item) => {
            return !item['mem_code'] || item['mem_code'].includes(memCode);
          });
          io.to(users.get(memCode)).emit('loadAlarm', filterData);
        }
        // io.emit('loadAnnouncement', res.data);
      });
  });
});
// server.emit('message', '연결 성공');
server.listen(4001, function () {
  console.log('listening on port 4001');
});
