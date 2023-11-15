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
// const axios = require('axios');
const users = new Map();
io.on('connection', (socket) => {
  const memInfo = socket.handshake.query;
  console.log(memInfo.mem_code);
  users.set(memInfo.mem_code, socket.id);
  console.log('연결 성공... ');
  // console.log('소켓 ID : +' + socket.id + '사용자 ID : ' + currentUserCode);
  console.log(users);
  //   io.emit('connect', true);
  // socket.on('loginSuccess', (currentUserCode) => {
  //   // users.add(currentUserCode);
  //   users.set(currentUserCode, socket.id);
  //   // socket.id = currentUserCode;
  //   console.log(users);
  // });
  socket.on('allParticipant', (data) => {
    for (let mem of data) {
      for (let memCode of Array.from(users.keys())) {
        if (mem.mem_code === memCode) {
          console.log(memCode + ' 참석자 입니다. 소켓 : ' + users.get(memCode));
          io.to(users.get(memCode)).emit(
            'mrRezParticipant',
            '회의실 예약 참석자로 지정되었습니다.'
          );
        }
      }
    }
  });
  socket.on('disconnect', (mem_code) => {
    users.delete(mem_code);
    socket.disconnect();
  });
});
// server.emit('message', '연결 성공');
server.listen(4001, function () {
  console.log('listening on port 4001');
});
