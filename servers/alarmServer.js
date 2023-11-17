const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const { forEach } = require('jszip');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true
  }
});
const axios = require('axios');
// const oracledb = require('oracledb');
// oracledb.initOracleClient({
//   libDir: 'C:/final_work/front/servers/instantclient_21_12'
// });
// // Oracle 데이터베이스 연결 정보
// const dbConfig = {
//   user: 'admin',
//   password: 'ResQ123456789',
//   connectString:
//     '146.56.121.170:1522?TNS_ADMIN=C:/final_work/back/src/main/resources/OracleCloud/Wallet_ResQ'
// };

// async function connectToDatabase() {
//   try {
//     console.log('adasdasdasdasdasda');
//     // Oracle 데이터베이스에 연결
//     const connection = await oracledb.getConnection(dbConfig);

//     // 연결 성공시 수행할 작업 추가
//     console.log('Connected to Oracle Database');

//     // 여기에서 추가적인 작업 수행 가능

//     // 연결 종료
//     await connection.close();
//   } catch (err) {
//     console.error('Error connecting to Oracle Database:', err);
//   }
// }
const users = new Map();
var mrRezDatas;
// let currentSocket = null;
io.on('connection', (socket) => {
  console.log('연결 성공... ');

  socket.on('loginSuccess', ({ memCode, jwt }) => {
    console.log('login');
    console.log(memCode);
    users.set(memCode, socket.id);
    console.log(users);
    axios
      .get(`http://localhost:8081/car_rez/loadAlarm/${memCode}`, {
        headers: {
          Authorization: jwt
        }
      })
      .then((res) => {
        console.log('alarmInfo');
        console.log(res.data);
        io.to(users.get(memCode)).emit('loadAlarm', res.data);
        // mrRezDatas = res.data;
      });
  });
  socket.on('clickAlarm', ({ alert_code, jwt, mem_code }) => {
    console.log(alert_code);
    console.log(jwt);
    // axios
    //   .patch(`http://localhost:8081/car_rez/clickAlarm/${alert_code}`, {
    //     headers: {
    //       Authorization: jwt
    //     }
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log('읽음처리 완');
    //       //   axios
    //       //     .get(`http://localhost:8081/car_rez/loadAlarm/${mem_code}`, {
    //       //       headers: {
    //       //         Authorization: jwt
    //       //       }
    //       //     })
    //       //     .then((res) => {
    //       //       console.log('alarmInfo');
    //       //       console.log(res.data);
    //       //       io.to(users.get(mem_code)).emit('loadAlarm2', res.data);
    //       //     });
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    axios
      .get(`http://localhost:8081/car_rez/loadAlarm/${mem_code}`, {
        headers: {
          Authorization: jwt
        }
      })
      .then((res) => {
        console.log('alarmInfo');
        console.log(res.data);
        io.to(users.get(mem_code)).emit('loadAlarm2', res.data);
      });
  });

  // socket.on('loadRez', (Token) => {
  //   console.log('asd');
  //   axios
  //     .get(`http://localhost:8081/mr/participantPerRez`, {
  //       headers: {
  //         Authorization: Token
  //       }
  //     })
  //     .then((res) => {
  //       // console.log(res.data);
  //       // mrRezDatas = res.data;
  //     });
  // });

  socket.on('allParticipant', ({ ptList, mr_rez_code, jwt }) => {
    for (let mem of ptList) {
      console.log('asdasd');
      alertDTO = {
        mem_code: mem.mem_code,
        contents: '회의실 예약 참석자로 지정되었습니다.'
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
      for (let memCode of Array.from(users.keys())) {
        if (mem.mem_code === memCode) {
          console.log(memCode + ' 참석자 입니다. 소켓 : ' + users.get(memCode));
          axios
            .get(`http://localhost:8081/car_rez/loadAlarm/${memCode}`, {
              headers: {
                Authorization: jwt
              }
            })
            .then((res) => {
              console.log('alarmInfo');
              console.log(res.data);
              io.to(users.get(memCode)).emit('loadAlarm', res.data);
              // mrRezDatas = res.data;
            });
          // io.to(users.get(memCode)).emit(
          //   'mrRezParticipant',
          //   '회의실 예약 참석자로 지정되었습니다.'
          // );
        }
      }
    }
  });
  socket.on('disconnect_mem', (mem_code) => {
    console.log('delete');
    console.log(mem_code);
    users.delete(mem_code);
    console.log(users);
    // socket.off();
  });
});
// server.emit('message', '연결 성공');
server.listen(4001, function () {
  console.log('listening on port 4001');
});
