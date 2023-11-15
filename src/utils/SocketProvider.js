import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { setUserData } from '../redux/reducer/userSlice';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector(setUserData).payload.user;
  const { name, position_name, mem_code, dept_name } = userData;
  var newSocket;
  if (userData) {
    console.log(mem_code);
    const memInfo = {
      mem_code: mem_code,
      name: name
    };
    if (memInfo.mem_code !== null)
      newSocket = io('http://localhost:4001', { query: memInfo }); // 서버 주소에 맞게 변경
  }

  useEffect(() => {
    //   // 소켓 연결 설정
    //   if (!socket) {
    //     const newSocket = io('http://localhost:4001'); // 서버 주소에 맞게 변경
    //     console.log(newSocket);
    //     setSocket({
    //       ...newSocket,
    //       navigate
    //     });
    //     // 컴포넌트가 언마운트될 때 소켓 연결 해제
    //     return () => {
    //       newSocket.disconnect();
    //     };
    //   }
    // console.log(newSocket);
    // 여기에서 소켓에 대한 이벤트 핸들러 등록 등 소켓 사용 로직 추가
    // 페이지 이동을 위한 navigate 함수를 소켓과 함께 제공
    // setSocket({
    //   ...newSocket,
    //   navigate
    // });
    // // 컴포넌트가 언마운트될 때 소켓 연결 해제
    // return () => {
    //   newSocket.disconnect();
    // };
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  //   return (

  return (
    <>
      <SocketContext.Provider value={newSocket}>
        {children}
      </SocketContext.Provider>
    </>
  );

  //   );
};

export { SocketProvider, SocketContext };
