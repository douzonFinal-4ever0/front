import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const SubHeader = ({ title, children }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '40px !important',
          width: '100%'
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: '#000' }}
        >
          {title}
        </Typography>
        {children}
      </Toolbar>
    </StyledAppBar>
  );
};

export default SubHeader;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white
}));
