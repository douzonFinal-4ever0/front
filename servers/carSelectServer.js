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
const users2 = new Map();
var cars = [];
function mapToJSON(map) {
  const jsonObj = {};
  for (const [key, value] of map) {
    jsonObj[key] = value;
  }
  return jsonObj;
}

io.on('connection', (socket) => {
  console.log('연결성공');
  socket.on('user', (currentName) => {
    users.add(currentName);
    io.emit('users', users);
    io.emit('currentCnt', users.size);
  });
  socket.on('disconnect_with_info', (disConnectUser) => {
    users.delete(disConnectUser);
    cars.map((car) => {
      if (car.car_code === selectedUser.get(disConnectUser)) {
        car.car_status = '선택가능';
      }
    });
    selectedUser.delete(disConnectUser);
    io.emit('users', users);
    console.log(users.size);
    io.emit('currentCnt', users.size);
    users2.delete(disConnectUser);

    if (users2.size !== 0) {
      for (let user of Array.from(users2.keys())) {
        var filterCars;
        if (users2.get(user)) {
          if (users2.get(user).carFilter.length === 0) {
            filterCars = cars;
          } else {
            filterCars = cars.filter(
              (car) => !users2.get(user).carFilter.includes(car.car_code)
            );
          }
        }
        io.to(users2.get(user).socketID).emit('cars', filterCars);
      }
    } else {
      cars = [];
    }
  });

  socket.on(
    'init',
    ({ mem_code, rezStart_at, rezReturn_at, Token }) => {
      console.log(mem_code);
      console.log(socket.id);
      if (cars.length === 0) {
        axios
          .get(`http://localhost:8081/car_rez/availableCars2`, {
            headers: {
              Authorization: Token
            }
          })
          .then((res) => {
            // console.log(res.data);
            cars = res.data;
            cars.map((car) => (car.car_status = '선택가능'));
            // console.log(cars);
            axios
              .get(`http://localhost:8081/car_rez/allRezList`, {
                headers: {
                  Authorization: Token
                }
              })
              .then((res) => {
                const rezInfos = res.data;
                var NotavaiableCars = [];
                var filterCars;
                console.log('예약 정보');
                console.log(rezInfos);
                if (rezInfos && rezInfos.length !== 0) {
                  rezInfos.map((rezInfo) => {
                    const returnAt = new Date(rezReturn_at).getTime();
                    const startAt = new Date(rezStart_at).getTime();
                    if (
                      !(
                        startAt > rezInfo.return_at ||
                        returnAt < rezInfo.start_at
                      )
                    ) {
                      // console.log(rezInfo.car_code);
                      NotavaiableCars.push(rezInfo.car_code);
                    }
                  });
                  filterCars = cars.filter(
                    (car) => !NotavaiableCars.includes(car.car_code)
                  );
                  console.log(filterCars);
                } else {
                  filterCars = cars;
                }

                const userInfo = {
                  socketID: socket.id,
                  carFilter: NotavaiableCars
                };
                users2.set(mem_code, userInfo);

                io.to(users2.get(mem_code).socketID).emit('cars', filterCars);
              });
          });
      } else {
        axios
          .get(`http://localhost:8081/car_rez/allRezList`, {
            headers: {
              Authorization: Token
            }
          })
          .then((res) => {
            const rezInfos = res.data;
            var NotavaiableCars = [];
            var filterCars;
            if (rezInfos && rezInfos.length !== 0) {
              rezInfos.map((rezInfo) => {
                const returnAt = new Date(rezReturn_at).getTime();
                const startAt = new Date(rezStart_at).getTime();
                if (
                  !(startAt > rezInfo.return_at || returnAt < rezInfo.start_at)
                ) {
                  // console.log(rezInfo.car_code);
                  NotavaiableCars.push(rezInfo.car_code);
                }
              });
              filterCars = cars.filter(
                (car) => !NotavaiableCars.includes(car.car_code)
              );
              console.log(filterCars);
            } else {
              filterCars = cars;
            }
            const userInfo = {
              socketID: socket.id,
              carFilter: NotavaiableCars
            };
            users2.set(mem_code, userInfo);
            console.log('유저 정보');
            console.log(users2.get(mem_code).socketID);
            console.log(filterCars);
            io.to(users2.get(mem_code).socketID).emit('cars', filterCars);
          });
      }
    }

  );

  socket.on('selected', ({ car_code, currentName }) => {
    console.log('selected');

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
      // console.log(car);
      if (car_code === car.car_code) {
        car.car_status = '선택된 차량';
        console.log(car);
      }
    });
    const jsonObject = JSON.stringify(Object.fromEntries(selectedUser));
    io.emit('selected', jsonObject);

    console.log(users2);

    for (let user of Array.from(users2.keys())) {
      var filterCars;
      console.log(users2.get(user).carFilter);
      console.log(cars.length);
      if (users2.get(user)) {
        if (users2.get(user).carFilter.length === 0) {
          filterCars = cars;
        } else {
          console.log('필터처리');
          filterCars = cars.filter(
            (car) => !users2.get(user).carFilter.includes(car.car_code)
          );
        }
      }
      console.log(filterCars);
      io.to(users2.get(user).socketID).emit('cars', filterCars);
    }
  });

  socket.on('rezComplete', (currentName) => {
    console.log(currentName);

    cars.map((car) => {
      if (car.car_code === selectedUser.get(currentName)) {
        console.log(car.car_code);
        car.car_status = '선택가능';
        // cars = cars.filter((item) => item !== valueToRemove);
      }
    });
    selectedUser.delete(currentName);
    users.delete(currentName);
    for (let user of Array.from(users2.keys())) {
      var filterCars;
      if (users2.get(user)) {
        if (users2.get(user).carFilter.length === 0) {
          filterCars = cars;
        } else {
          filterCars = cars.filter(
            (car) => !users2.get(user).carFilter.includes(car.car_code)
          );
        }
      }
      io.to(users2.get(user).socketID).emit('cars', filterCars);
    }
    io.emit('users', users);
    console.log(users.size);
    io.emit('currentCnt', users.size);
    if (users.size === 0) {
      cars = [];
    }
    // io.emit('cars', cars);
  });
});

server.listen(4000, function () {
  console.log('listening on port 4000');
});
