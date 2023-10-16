import React from 'react';
import { useState } from 'react';
import { Paper, styled, Box, Button, Grid, Divider } from '@mui/material';
import Calendar from '../../components/common/Calendar';
import SubSidebar from '../../components/common/SubSidebar';
import SubHeader from '../../components/common/SubHeader';
import MrRegistForm from '../../components/mr_admin/MrRegistForm';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import Drawer from '../../components/common/Drawer';

const MrRegister = () => {
  /**오프캔버스 상태 관리*/
  const [drawerState, setDrawerState] = useState({
    right: false
  });
  /**오프캔버스 토글링 */
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerState({ ...drawerState, ['right']: open });
  };
  /**오프캔버스 컨텐츠 지정 */
  const tabData = [
    {
      title: '회의실 등록',
      content: <MrRegistForm />
    }
  ];

  return (
    <>
      <SubHeader title={'회의실 등록'} />
      <Box sx={{ display: 'flex', height: '95%' }}>
        <SubSidebar
          widthP={20}
          content={
            <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
              <Button
                variant="outlined"
                sx={{ width: '100%' }}
                onClick={toggleDrawer('right', true)}
              >
                회의실 등록
              </Button>
              <Drawer
                width={600}
                drawerState={drawerState}
                toggleDrawer={toggleDrawer}
                tabData={tabData}
              />
            </Grid>
          }
        />
        <MainContainer>
          <WrapContainer bgColor={'#fff'}>
            <Box sx={{ display: 'flex' }}></Box>
            <Calendar />
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrRegister;
