import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Tabs from './Tabs';

// props로 넣어줘야 할 것들 : drawer 너비, drawer 내부의 tab 제목 배열과, tab에 해당하는 컴포넌트
const Drawer = ({width, tabTitles, tabContents}) => {
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, ['right']: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: width}}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Drawer 내부 작성*/}
      <Tabs tabTitles={tabTitles} tabContents={tabContents}/>
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'right'}>
          <Button onClick={toggleDrawer('right', true)}>right</Button>
          <MuiDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </MuiDrawer>
        </React.Fragment>
    </div>
  );
}

export default Drawer;