import { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// theme
import ThemeProvider from './theme';
//
import store from './redux/store';
import Router from './routes/routes';
//실시간 처리?? 기원
import { QueryClient, QueryClientProvider } from 'react-query';
import JWTdecode from './components/common/JWTdecode';
import SocketProvider from './utils/SocketProvider';

const queryClient = new QueryClient();

const App = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

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
              />
            </ThemeProvider>
          </SocketProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
