// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------
import { palette } from './palette';

const GlobalStyles = () => {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%'
        },
        '#root': {
          width: '100%',
          height: '100%'
        },
        '.MuiFormControl-root': {
          width: '100%',
          borderRadius: '2px',
          border: 'none',
          backgroundColor: palette.grey['100']
        },
        '.MuiInputBase-root': {
          width: '100%',
          borderRadius: '2px',
          border: `1px solid ${palette.grey['400']}`,
          backgroundColor: palette.grey['100']
        },
        '.MuiIconButton-root': {
          '&:hover': {
            backgroundColor: 'transparent'
          }
        },
        '.MuiOutlinedInput-input': {
          padding: '12px 10px'
        },
        '.MuiPaper-root': {
          borderRadius: '2px',
          border: `1px solid ${palette.grey['400']}`
        },
        '.MuiContainer-root': {
          borderRadius: '2px'
        },
        '.MuiButtonBase-root': {
          borderRadius: '2px'
        },
        '.MuiChip-root': {
          borderRadius: '6px'
        },
        '.MuiSwitch-track': {
          backgroundColor: palette.grey['600']
        },
        '.MuiSwitch-switchBase': {
          '&:hover': {
            backgroundColor: 'transparent'
          }
        },
        '.MuiSwitch-switchBase.Mui-checked': {
          '&:hover': {
            backgroundColor: 'transparent'
          }
        },
        input: {
          width: '100%'
        },
        img: {
          display: 'block',
          maxWidth: '100%'
        },
        ul: {
          margin: 0,
          padding: 0
        }
      }}
    />
  );

  return inputGlobalStyles;
};

export default GlobalStyles;
