const calcRezRate = (data) => {
  // 회의실 타입별 카운트 (소, 중, 대, 미팅)
  let mrTypes = {
    sm: 0,
    md: 0,
    lg: 0,
    mt: 0
  };
  // 회의실별로 예약건 그룹화
  const groupData = new Map();

  data.forEach((item) => {
    switch (item.mr.mr_type) {
      case '소회의실':
        mrTypes['sm'] = mrTypes.sm + 1;
        break;
      case '중회의실':
        mrTypes['md'] = mrTypes.md + 1;
        break;
      case '대회의실':
        mrTypes['lg'] = mrTypes.lg + 1;
        break;
      case '미팅룸':
        mrTypes['mt'] = mrTypes.mt + 1;
    }

    const mrCode = item.mr.mr_code;
    if (!groupData.has(mrCode)) {
      groupData.set(mrCode, [item]);
    } else {
      groupData.get(mrCode).push(item);
    }
  });

  const result = Array.from(groupData.values());

  console.log(mrTypes);
};

export default calcRezRate;

// const calculateReservationRate = (reservations) => {
//   // 예약 데이터를 이용하여 각 회의실의 예약률 계산
//   // 예약 데이터에는 각 회의실의 예약 정보가 들어있을 것이라 가정
//   const meetingRoomReservations = groupReservationsByMeetingRoom(reservations);

//   // 각 회의실 예약률 출력 또는 활용
//   for (const [meetingRoom, reservations] of meetingRoomReservations) {
//     const reservationRate = calculateRate(reservations);
//     console.log(`회의실 ${meetingRoom}의 예약률: ${reservationRate}%`);
//   }
// };

// // 회의실 예약 데이터를 회의실별로 그룹화
// const groupReservationsByMeetingRoom = (reservations) => {
//   // 구현해야 할 로직: 예약 데이터를 회의실 별로 그룹화
//   // { meetingRoom1: [reservation1, reservation2, ...], meetingRoom2: [...], ... }
// };

// // 예약률 계산 로직
// const calculateRate = (reservations) => {
//   // 구현해야 할 로직: 예약 데이터를 이용하여 예약률 계산
// };
