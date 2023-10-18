import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Tabs from './Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer, closeDrawer } from '../../redux/reducer/DrawerSlice'

// props로 넣어줘야 할 것들 : 
// width : drawer 너비
// drawerState와 toggleDrawer : car_admin의 Example 페이지 참고 
// tabData : title 과 content 를 key 값으로 가지는 객체의 배열을 생성
const Drawer = ({ width, tabData }) => {

  const isDrawerOpen = useSelector((state) => state.drawer.isDrawerOpen);
  const dispatch = useDispatch();

  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };



  const list = (anchor) => (
    <Box
      sx={{ width: width }}
      role="presentation"
      onClick={handleOpenDrawer}
    >
      {/* Drawer 내부 작성*/}

      <Tabs tabData={tabData} />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <MuiDrawer
          anchor={'right'}
          open={isDrawerOpen}
          onClose={handleCloseDrawer}
        >
          {list('right')}
        </MuiDrawer>
      </React.Fragment>
    </div>
  );
}

export default Drawer;