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

  // if (cars.length === 0) {
  //   axios
  //     .get(`http://localhost:8081/car_rez/availableCars2`, {
  //       headers: {
  //         Authorization: token
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       cars = res.data;
  //     });
  //   cars.map((car) => (car.car_status = '선택가능'));
  //   console.log(cars);
  //   console.log(Array.isArray(cars));
  // }
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
      // for (let user of Array.from(users2).keys()) {
      //   console.log('adasd');
      //   console.log(user);
      //   var filterCars = cars.filter((car) => {
      //     users2.get(user).carFilter.includes(car.car_code);
      //   });
      //   io.to(users2.get(user).socketID).emit('cars', filterCars);
      // }
      for (let user of Array.from(users2.keys())) {
        var filterCars;
        if (users2.get(user)) {
          if (users2.get(user).carFilter.length === 0) {
            filterCars = cars;
          } else {
            filterCars = cars.filter((car) => {
              users2.get(user).carFilter.includes(car.car_code);
            });
          }
        }
        io.to(users2.get(user).socketID).emit('cars', filterCars);
      }
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
                var avaiableCars = [];
                var filterCars;
                console.log('예약 정보');
                console.log(rezInfos);
                if (rezInfos && rezInfos.length !== 0) {
                  rezInfos.map((rezInfo) => {
                    const returnAt = new Date(rezReturn_at).getTime();
                    const startAt = new Date(rezStart_at).getTime();
                    if (
                      startAt > rezInfo.return_at ||
                      returnAt < rezInfo.start_at
                    ) {
                      // console.log(rezInfo.car_code);
                      avaiableCars.push(rezInfo.car_code);
                    }
                  });
                  filterCars = cars.filter((car) =>
                    avaiableCars.includes(car.car_code)
                  );
                  console.log(filterCars);
                } else {
                  filterCars = cars;
                }

                const userInfo = {
                  socketID: socket.id,
                  carFilter: avaiableCars
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
            var avaiableCars = [];
            var filterCars;
            if (rezInfos && rezInfos.length !== 0) {
              rezInfos.map((rezInfo) => {
                const returnAt = new Date(rezReturn_at).getTime();
                const startAt = new Date(rezStart_at).getTime();
                if (
                  startAt > rezInfo.return_at ||
                  returnAt < rezInfo.start_at
                ) {
                  // console.log(rezInfo.car_code);
                  avaiableCars.push(rezInfo.car_code);
                }
              });
              filterCars = cars.filter((car) =>
                avaiableCars.includes(car.car_code)
              );
              // console.log(filterCars2);

              // filterCars = cars.filter((car) => {
              //   avaiableCars.includes(car.car_code);
              //   // car.car_code=avaiableCars
              //   // avaiableCars.includes(car.car_code);
              //   // return car['car_code'].includes(avaiableCars);
              // });
              console.log(filterCars);
            } else {
              filterCars = cars;
            }
            const userInfo = {
              socketID: socket.id,
              carFilter: avaiableCars
            };
            users2.set(mem_code, userInfo);
            console.log('유저 정보');
            console.log(users2.get(mem_code).socketID);
            console.log(filterCars);
            io.to(users2.get(mem_code).socketID).emit('cars', filterCars);
          });
      }

      // io.emit('cars', cars);
    }
    // console.log(rows);
    // }
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
    // console.log(cars);
    io.emit('selected', jsonObject);
    // var filterCars = cars.fillter((car) => {
    //   return car['car_code'].includes(users2.get(currentName).carFillter);
    // });

    // io.to(users2.get(currentName).socketID).emit('Upcars', filterCars);
    // users2.map((user) => {
    //   var filterCars = cars.filter((car) => {
    //     return car['car_code'].includes(users2.get(currentName).carFillter);
    //   });
    //   io.to(user.socketID).emit('cars', filterCars);
    // });
    console.log(users2);

    for (let user of Array.from(users2.keys())) {
      var filterCars;
      if (users2.get(user)) {
        if (users2.get(user).carFilter.length === 0) {
          filterCars = cars;
        } else {
          filterCars = cars.filter((car) => {
            users2.get(user).carFilter.includes(car.car_code);
          });
        }
      }
      io.to(users2.get(user).socketID).emit('cars', filterCars);
    }
  });

  socket.on('rezComplete', (disConnectUser) => {
    users.delete(disConnectUser);
    selectedUser.delete(disConnectUser);
    cars.map((car) => {
      if (car.car_code === selectedUser.get(disConnectUser)) {
        car.car_status = '이미 예약된 차량';
        // cars = cars.filter((item) => item !== valueToRemove);
      }
    });
    // users2.map((user) => {
    //   var filterCars = cars.filter((car) => {
    //     return car['car_code'].includes(users2.get(currentName).carFillter);
    //   });
    //   io.to(user.socketID).emit('cars', filterCars);
    // });
    // for (let user of Array.from(users2).keys()) {
    //   var filterCars = cars.filter((car) => {
    //     // return car['car_code'].includes(users2.get(user).carFilter);
    //     // avaiableCars.includes(car.car_code);
    //     users2.carFilter.map((avaiableCar) => {
    //       return (car.car_code = avaiableCar);
    //     });
    //   });
    //   io.to(users2.get(user).socketID).emit('cars', filterCars);
    // }
    for (let user of Array.from(users2.keys())) {
      var filterCars;
      if (users2.get(user)) {
        if (users2.get(user).carFilter.length === 0) {
          filterCars = cars;
        } else {
          filterCars = cars.filter((car) => {
            users2.get(user).carFilter.includes(car.car_code);
          });
        }
      }
      io.to(users2.get(user).socketID).emit('cars', filterCars);
    }
    io.emit('users', users);
    console.log(users.size);
    io.emit('currentCnt', users.size);
    // io.emit('cars', cars);
  });
});

server.listen(4000, function () {
  console.log('listening on port 4000');
});
