import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { setUserData } from '../redux/reducer/userSlice';
import LoadingModal from '../components/car_user/LoadingModal';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector(setUserData).payload.user;
  const { name, position_name, mem_code, dept_name } = userData;
  const newSocket = useRef(null);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  var memInfo = {
    mem_code: '',
    name: ''
  };
  // var newSocket;
  if (userData) {
    console.log(mem_code);
    memInfo = {
      mem_code: mem_code,
      name: name
    };
  }
  //   if (memInfo.mem_code !== '')
  //     newSocket.current = io('http://localhost:4001', { query: memInfo }); // 서버 주소에 맞게 변경
  // }
  // newSocket = io('http://localhost:4001');

  useEffect(() => {
    // if (userData) {
    //   console.log(mem_code);
    //   const memInfo = {
    //     mem_code: mem_code,
    //     name: name
    //   };
    //   if (memInfo.mem_code !== '')
    //     newSocket.current = io('http://localhost:4001', { query: memInfo }); // 서버 주소에 맞게 변경
    // }
    // newSocket.current.on('connect', () => {
    //   setIsConnected(true);
    // });
    //   // 소켓 연결 설정
    //   if (!socket) {
    newSocket.current = io('http://localhost:4001'); // 서버 주소에 맞게 변경
    //     console.log(newSocket);
    //     setSocket({
    //       ...newSocket,
    //       navigate
    //     });
    //   }
    // console.log(newSocket);
    // 여기에서 소켓에 대한 이벤트 핸들러 등록 등 소켓 사용 로직 추가
    // 페이지 이동을 위한 navigate 함수를 소켓과 함께 제공
    // setSocket({
    //   ...newSocket,
    //   navigate
    // });
    // dispatch(
    //   setUserData({
    //     data: {
    //       mem_code: '', // 사번
    //       name: '', // 성명
    //       position_name: '', // 직급명
    //       dept_name: '', // 부서명
    //       role: '', // 역할
    //       email: ''
    //     }
    //   })
    // );
    // // 컴포넌트가 언마운트될 때 소켓 연결 해제
    // return () => {
    //   if (newSocket.current && newSocket.current.connected) {
    //     newSocket.current.disconnect();
    //   }
    // };
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정
  useEffect(() => {
    console.log('loginSuccess');
    if (newSocket.current && memInfo.mem_code !== '') {
      // 예시: 로그인 성공 이벤트를 가정하고 'loginSuccess' 이벤트를 사용
      newSocket.current.emit('loginSuccess', memInfo.mem_code);

      // 추가적인 로그인 후 소켓 연결 로직
      // ...
    }
  }, [newSocket.current, memInfo.mem_code]);
  //   return (
  // if (!isConnected) {
  //   return <LoadingModal open={!isConnected}></LoadingModal>;
  // }
  return (
    <>
      <SocketContext.Provider value={newSocket.current}>
        {children}
      </SocketContext.Provider>
    </>
  );

  //   );
};

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);
