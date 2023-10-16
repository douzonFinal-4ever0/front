import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// theme
import ThemeProvider from './theme';
//
import Router from './routes/routes';
import store from './redux/store';

const App = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <Router isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
