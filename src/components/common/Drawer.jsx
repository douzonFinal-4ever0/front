import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Tabs from './Tabs';

// props로 넣어줘야 할 것들 : drawer 너비, drawer 내부의 tab 제목 배열과, tab에 해당하는 컴포넌트
const Drawer = ({width, drawerState, toggleDrawer, tabData}) => {
  
  const list = (anchor) => (
    <Box
      sx={{ width: width}}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Drawer 내부 작성*/}

      <Tabs tabData={tabData}/>
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'right'}>
          <MuiDrawer
            anchor={'right'}
            open={drawerState['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </MuiDrawer>
        </React.Fragment>
    </div>
  );
}

export default Drawer;