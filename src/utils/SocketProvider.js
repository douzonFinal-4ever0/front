import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const newSocket = io('http://localhost:4001'); // 서버 주소에 맞게 변경
  useEffect(() => {
    // 소켓 연결 설정

    console.log(newSocket);
    // 여기에서 소켓에 대한 이벤트 핸들러 등록 등 소켓 사용 로직 추가

    // 페이지 이동을 위한 navigate 함수를 소켓과 함께 제공
    setSocket({
      ...newSocket,
      navigate
    });

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  //   return (

  return (
    <SocketContext.Provider value={newSocket}>
      {children}
    </SocketContext.Provider>
  );

  //   );
};

export { SocketProvider, SocketContext };
