import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
// theme
import ThemeProvider from './theme';
//
import Router from './routes/routes';
import store from './redux/store';
//실시간 처리?? 기원
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import JWTdecode from './components/common/JWTdecode';
import SocketProvider from './utils/SocketProvider';
import { useEffect } from 'react';
import { setUserData } from './redux/reducer/userSlice';
import { io } from 'socket.io-client';
import { setSocket } from './redux/reducer/SocketReducer';

const App = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const queryClient = new QueryClient();

  // const [isLogin, setIsLogin] = useState(false);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <JWTdecode />
          <SocketProvider>
            <ThemeProvider>
              <Router
                isAdminMode={isAdminMode}
                setIsAdminMode={setIsAdminMode}
                // setIsLogin={setIsLogin}
              />
            </ThemeProvider>
          </SocketProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
