import { BrowserRouter } from 'react-router-dom';

// theme
import ThemeProvider from './theme';

import Router from './routes/routes';
import { useState } from 'react';

const App = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider adminMode={isAdminMode}>
        <Router isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
