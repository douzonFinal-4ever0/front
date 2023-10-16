import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Tabs from './Tabs';

// props로 넣어줘야 할 것들 : 
// width : drawer 너비
// drawerState와 toggleDrawer : car_admin의 Example 페이지 참고 
// tabData : title 과 content 를 key 값으로 가지는 객체의 배열을 생성
const Drawer = ({width, drawerState, toggleDrawer, tabData}) => {
  
  const list = (anchor) => (
    <Box
      sx={{ width: width}}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
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