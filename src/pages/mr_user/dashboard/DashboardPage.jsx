import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import base64 from 'base-64';
import utf8 from 'utf8';

import styled from '@emotion/styled';
import { Box, Grid, Stack, Typography } from '@mui/material';

import axiosInstance from '../../../utils/axios';
import { PAGE_INNER_PADDING } from '../../../config';
import { setUserData } from '../../../redux/reducer/userSlice';
import { setBmData } from '../../../redux/reducer/BmSlice';
import SubHeader from '../../../components/common/SubHeader';
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import MiniRezForm from './section/MiniRezForm';
import { useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import QRcode from '../../../components/mr_user/QRcode';
import Spinner from '../../../components/common/Spinner';
import Progress from '../../../components/mr_user/Progress';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userData = useSelector(setUserData).payload.user;
  const bmData = useSelector(setBmData).payload.bm;

  // 리덕스 데이터
  const { name, position_name, mem_code, dept_name } = userData;
  const { mr_list } = bmData;

  useEffect(() => {
    //getBmMrApi();
  }, []);

  const getBmMrApi = async () => {
    try {
      // 토큰 디코딩
      const token = localStorage.getItem('jwtToken');

      // JWT 디코딩
      let payload = token.substring(
        token.indexOf('.') + 1,
        token.lastIndexOf('.')
      );
      //base64  디코딩
      const bytes = base64.decode(payload);
      //한글 디코딩
      const text = utf8.decode(bytes);
      const userInfo = JSON.parse(text);
      const mem_code = userInfo.userCode;

      // 즐겨찾기 데이터 API 요청 (*추후 대시보드에서 즐겨찾기 회의실 리스트 보여줄 예정이라 일단 추가함)
      const res = await axiosInstance.axiosInstance.get(
        `/mr/bm?mem_code=${mem_code}`
      );
      if (res.status !== 200) return;
      const { data } = res;

      dispatch(setBmData({ data: data }));
    } catch (err) {
      console.log(err);
    }
  };

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
