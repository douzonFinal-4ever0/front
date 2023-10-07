import { BrowserRouter } from 'react-router-dom';

// theme
import ThemeProvider from './theme';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>hello</ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
