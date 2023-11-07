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

const users = new Set();
const selectedUser = new Map();
var cars = [];
function mapToJSON(map) {
  const jsonObj = {};
  for (const [key, value] of map) {
    jsonObj[key] = value;
  }
  return jsonObj;
}
io.on('connection', (socket) => {
  socket.on('user', (currentName) => {
    users.add(currentName);
    io.emit('users', users);
    io.emit('currentCnt', users.size);
  });
  socket.on('disconnect_with_info', (disConnectUser) => {
    users.delete(disConnectUser);
    selectedUser.delete(disConnectUser);
    io.emit('users', users);
    console.log(users.size);
    io.emit('currentCnt', users.size);
  });

  socket.on(
    'init',
    ({ rows, currentName, rezStart_at, rezReturn_at, Token, setRows }) => {
      // GET 요청 보내기
      axios
        .get(
          `http://localhost:8081/car_rez/availableCars/${rezStart_at}/${rezReturn_at}`,
          {
            headers: {
              Authorization: Token
            }
          }
        )
        .then((res) => {
          // 성공적인 응답 처리
          // console.log('응답 데이터:', res.data);
          // cars = res.data.map((car) => {
          //   car.car_status = '선택가능';
          // });
          cars = res.data;
          cars.map((car) => (car.car_status = '사용가능'));

          io.emit('cars', cars);
        })
        .catch((error) => {
          // 오류 처리
          console.error('오류 발생:', error);
        });
      // console.log(rows);
    }
  );
  socket.on('selected', ({ car_code, currentName }) => {
    if (selectedUser.get(currentName)) {
      //선택한게 있을때
      //전에 선택한 차량
      console.log(selectedUser.get(currentName));
      cars.map((car) => {
        if (car.car_code === selectedUser.get(currentName)) {
          car.car_status = '선택가능';
          // console.log(car);
        }
      });
      // console.log(cars);
      selectedUser.delete(currentName);
      selectedUser.set(currentName, car_code);
    } else {
      selectedUser.set(currentName, car_code);
    }
    console.log(selectedUser);
    console.log(car_code);
    cars.map((car) => {
      console.log(car);

      if (car_code === car.car_code) {
        car.car_status = '선택됨';
        console.log(car);
      }
    });
    // console.log(cars);
    io.emit('Upcars', cars);
  });
});

server.listen(4000, function () {
  console.log('listening on port 4000');
});
