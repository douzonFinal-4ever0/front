import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const SubHeader = ({title}) => {
    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar sx={{ paddingLeft : '40px !important' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color : '#000'}}>
                        {title}
                    </Typography>
                </Toolbar>
            </StyledAppBar>
        </Box>
    </>);
}

export default SubHeader;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor : theme.palette.common.white
  }));