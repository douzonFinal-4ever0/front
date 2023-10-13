import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';

const SubSidebar = ({}) => {
  return (
    <Box
      sx={{
        width: '15%',
        backgroundColor: 'white',
        boxShadow: '0px 3px 0px 0px rgba(145, 158, 171, 0.14) inset'
      }}
    >
      서브사이드바 내용
    </Box>
  );
};

export default SubSidebar;
