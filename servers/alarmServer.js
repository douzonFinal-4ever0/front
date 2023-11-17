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
const users = new Map();
var mrRezDatas;
// let currentSocket = null;
io.on('connection', (socket) => {
  //연결된게 있으면 지움
  // if (currentSocket) {
  //   currentSocket.disconnect(true);
  // }
  // currentSocket = socket;
  // const memInfo = socket.handshake.query;
  // users.set(memInfo.mem_code, socket.id);
  console.log('연결 성공... ');
  // console.log('소켓 ID : +' + socket.id + '사용자 ID : ' + memInfo.mem_code);
  // console.log(users);
  socket.on('loginSuccess', (mem_code) => {
    console.log('login');
    users.set(mem_code, socket.id);
    console.log(users);
    // for (let mrRezData of mrRezDatas) {
    //   for (let mem of mrRezData.mem_code_per_rez) {
    //     if (memInfo.mem_code === mem) {
    //       //해당 소켓
    //       // const targetSocket = io.sockets.sockets.get(users.get(mem));
    //       // targetSocket.join(mrRezData.mr_rez_code);
    //     }
    //   }
    // }
  });
  socket.on('loadRez', (Token) => {
    console.log('asd');
    axios
      .get(`http://localhost:8081/mr/participantPerRez`, {
        headers: {
          Authorization: Token
        }
      })
      .then((res) => {
        // console.log(res.data);
        mrRezDatas = res.data;
      });
  });

  socket.on('allParticipant', ({ ptList, mr_rez_code, jwt }) => {
    console.log('asdasd');
    for (let mem of ptList) {
      for (let memCode of Array.from(users.keys())) {
        if (mem.mem_code === memCode) {
          console.log(memCode + ' 참석자 입니다. 소켓 : ' + users.get(memCode));
          alertDTO = {
            mem_code: memCode,
            contents: '회의실 예약 참석자로 지정되었습니다.'
          };
          axios
            .post(`http://localhost:8081/car_rez/alarmSave`, alertDTO, {
              headers: {
                Authorization: jwt
              }
            })
            .then((res) => {
              console.log(res.data);
              mrRezDatas = res.data;
            });
          io.to(users.get(memCode)).emit(
            'mrRezParticipant',
            '회의실 예약 참석자로 지정되었습니다.'
          );
        }
      }
    }
  });
  socket.on('disconnect_mem', (mem_code) => {
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
