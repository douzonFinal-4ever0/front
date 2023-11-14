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
const users = new Set();
io.on('connection', (socket) => {
  console.log('연결 성공');
  //   io.emit('connect', true);
  socket.on('loginSuccess', (currentUserCode) => {
    users.add(currentUserCode);
    socket.userId = currentUserCode;
    console.log(users);
  });
  socket.on('allParticipant', (data) => {
    for (let mem of data) {
      for (let memCode of users) {
        if (mem.mem_code === memCode) {
          console.log('참석자 입니다');
          io.to(memCode).emit(
            'mrRezParticipant',
            '회의실 예약 참석자로 지정되었습니다.'
          );
        }
      }
    }
  });
});
// server.emit('message', '연결 성공');
server.listen(4001, function () {
  console.log('listening on port 4001');
});
