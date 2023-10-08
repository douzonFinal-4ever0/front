import PropTypes from 'prop-types';
import { useMemo } from 'react';

// @mui
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider
} from '@mui/material/styles';
//
import { palette, darkPalette } from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node
};

export default function ThemeProvider({ children, adminMode }) {
  const themeOptions = useMemo(
    () => ({
      palette: adminMode ? darkPalette : palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      type: adminMode ? 'dark' : 'light'
    }),
    [adminMode]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
