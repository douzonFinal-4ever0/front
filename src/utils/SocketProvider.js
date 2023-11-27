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
  var memCode = '';

  if (userData) {
    console.log(mem_code);
    memCode = mem_code;
  }

  useEffect(() => {
    newSocket.current = io('http://localhost:4001'); // 서버 주소에 맞게 변경
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  useEffect(() => {
    console.log('loginSuccess');

    // if (newSocket.current && memInfo.mem_code !== '') {
    if (newSocket.current && memCode !== '') {
      const getJwtToken = () => {
        return localStorage.getItem('jwtToken');
      };
      const jwt = getJwtToken();
      // 예시: 로그인 성공 이벤트를 가정하고 'loginSuccess' 이벤트를 사용
      newSocket.current.emit('loginSuccess', { memCode, jwt });

      // 추가적인 로그인 후 소켓 연결 로직
      // ...
    }
  }, [newSocket.current, memCode]);
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
};

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);
