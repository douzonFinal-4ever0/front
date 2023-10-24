import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRezData } from '../../redux/reducer/mrUserSlice';
import dayjs from 'dayjs';

import styled from '@emotion/styled';
import { Box, Button, Grid, Stack, Typography, TextField } from '@mui/material';

import { meetingTypes } from '../../config';
import { PAGE_INNER_PADDING } from '../../config';
import { setUserData } from '../../redux/reducer/userSlice';
import { palette } from '../../theme/palette';
import SubHeader from '../../components/common/SubHeader';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import Label from '../../components/common/Label';
import Selectbox from '../../components/common/Selectbox';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = useSelector(setUserData).payload.user;
  const rezData = useSelector(setRezData).payload.mrUser;
  // 예약 리덕스 데이터
  const { m_name, m_type, rez_date, rez_start_time, rez_end_time, tot_pt_ctn } =
    rezData;
  // 사용자 리덕스 데이터
  const { name, position_name } = userData;

  // 회의 종류 셀렉트박스 이벤트
  const handleSelectBox = (e) => {
    const newRezData = { ...rezData, m_type: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

  // 예약 날짜 데이트피커 이벤트
  const handleDatePick = (newValue) => {
    const newRezData = {
      ...rezData,
      rez_date: newValue.format('YYYY-MM-DD')
    };
    dispatch(setRezData({ data: newRezData }));
  };

  return (
    <>
      {/* <SubHeader title="대시보드" /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <StyledBigTitle>
          {name} {position_name}님,
          <br /> 오늘 회의 일정 3건 있습니다
        </StyledBigTitle>
        <MainContainer>
          <Stack spacing={3}>
            <WrapContainer bgcolor={'#fff'}>
              <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'space-between' }}
              >
                <Grid item container xs={3} spacing={1}>
                  <StyledLabelGrid item xs={4}>
                    <Label htmlFor={'m_type'} text={'회의 종류'} />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <Selectbox
                      value={m_type}
                      handleSelectBox={handleSelectBox}
                      menuList={meetingTypes}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <StyledLabelGrid item xs={3}>
                    <Label htmlFor={'rez_date'} text={'예약 일자'} />
                  </StyledLabelGrid>
                  <Grid item xs={9} direction={'row'}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          onChange={handleDatePick}
                          format="YYYY-MM-DD"
                          value={dayjs(rez_date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  1
                </Grid>
                <Grid item xs={2}>
                  1
                </Grid>
              </Grid>
            </WrapContainer>
            <WrapContainer bgcolor={'#fff'}>
              <Grid container spacing={3}></Grid>
            </WrapContainer>
          </Stack>
        </MainContainer>
      </Box>
    </>
  );
};

export default Dashboard;

const StyledBigTitle = styled(Typography)(({ theme }) => ({
  paddingTop: PAGE_INNER_PADDING * 2,
  paddingLeft: PAGE_INNER_PADDING,
  paddingRight: PAGE_INNER_PADDING,
  fontSize: '26px',
  fontWeight: 'bold'
}));

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
