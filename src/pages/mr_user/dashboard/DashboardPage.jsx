import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { PAGE_INNER_PADDING } from '../../../config';
import { setUserData } from '../../../redux/reducer/userSlice';
import SubHeader from '../../../components/common/SubHeader';
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import MiniRezForm from './section/MiniRezForm';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(setUserData).payload.user;

  // 사용자 리덕스 데이터
  const { name, position_name } = userData;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1300px'
          }}
        >
          <StyledBigTitle>
            {name} {position_name}님,
            <br />
            오늘 회의 일정 3건 있습니다
          </StyledBigTitle>
        </Box>
        <MainContainer>
          <Stack spacing={3}>
            {/* 예약 폼 */}
            <MiniRezForm />

            {/* 예약 리스트 */}
            <WrapContainer bgcolor={'#fff'}>
              <Grid container spacing={3}></Grid>
            </WrapContainer>
          </Stack>
        </MainContainer>
      </Box>
    </>
  );
};

export default DashboardPage;

const StyledBigTitle = styled(Typography)(({ theme }) => ({
  paddingTop: PAGE_INNER_PADDING * 2,
  paddingLeft: PAGE_INNER_PADDING,
  paddingRight: PAGE_INNER_PADDING,
  fontSize: '28px',
  fontWeight: 'bold'
}));
