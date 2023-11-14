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
import RezList from './section/RezList';
import Statistics from './section/Statistics';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userData = useSelector(setUserData).payload.user;
  const bmData = useSelector(setBmData).payload.bm;
  const [todayRezList, setTodayRezList] = useState([]); // 오늘 예약 리스트
  const [rezList, setRezList] = useState([]); // 전체 예약 리스트

  // 리덕스 데이터
  const { name, position_name, mem_code, dept_name } = userData;
  const { mr_list } = bmData;

  useEffect(() => {
    getMrRezApi();
  }, []);

  const getMrRezApi = async () => {
    try {
      // 참석자로 지정된 회의 예약 조회
      const resByPt = await axiosInstance.axiosInstance.get(
        `/mr/rez/pt?mem_code=${userData.mem_code}`
      );
      if (resByPt.status !== 200) return;

      // 예약자로 설정된 회의 예약 조회
      const res = await axiosInstance.axiosInstance.get(
        `/mr/rez?mem_code=${userData.mem_code}`
      );
      if (res.status !== 200) return;

      // only 참석자 리스트
      const lestPtList = resByPt.data.filter(
        (itemPt) =>
          !res.data.some(
            (itemMaster) => itemMaster.mr_rez_code === itemPt.mr_rez_code
          )
      );

      // 참석자 & 예약자 role 속성 추가
      lestPtList.forEach((rez) => {
        rez.role = '참석자';
      });
      res.data.forEach((rez) => {
        rez.role = '예약자';
      });

      // 전체 회의 예약 (참석자 + 예약자)
      const data = [...lestPtList, ...res.data];

      let list = [];
      // 오늘 예약 현황 추출
      const today = getToday();
      data.forEach((rez) => {
        if (rez.rez_start_time.includes(today)) {
          const startTime = getTime(rez.rez_start_time);
          const endTime = getTime(rez.rez_end_time);
          const time = `${startTime} - ${endTime}`;
          const newRez = [{ ...rez, newTime: time }];
          list.push(...newRez);
        }
      });

      // 이름 시간 순으로 정렬
      list.sort(
        (a, b) => new Date(a.rez_start_time) - new Date(b.rez_start_time)
      );

      // 오늘 예약 현황 업데이트
      setTodayRezList(list);
    } catch (err) {
      console.log(err);
    }
  };

  // 현재 날짜 구하기
  const getToday = () => {
    let today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
  };

  // 시간 포맷에 맞게 추출
  const getTime = (time) => {
    const timeRegex = /\d{2}:\d{2}/; // 정규 표현식 패턴 (HH:mm)
    const match = time.match(timeRegex);
    if (match) {
      return match[0];
    }
  };

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
          {todayRezList.length !== 0 ? (
            <StyledBigTitle>
              {name} {position_name}님,
              <br />
              오늘 회의 일정 {todayRezList.length}건 있습니다
            </StyledBigTitle>
          ) : (
            <StyledBigTitle>
              {name} {position_name}님,
              <br />
              오늘도 힘내세요 :-D
            </StyledBigTitle>
          )}
        </Box>
        <MainContainer>
          <Stack spacing={3}>
            {/* 예약 폼 */}
            <MiniRezForm />

            <Box>
              <Grid container spacing={3}>
                <Grid item xs={5.5}>
                  <RezList todayRezList={todayRezList} />
                </Grid>
                <Grid item xs={6.5}>
                  <Statistics />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </MainContainer>
      </Box>
    </>
  );
};

export default DashboardPage;

const StyledBigTitle = styled(Typography)(({ theme }) => ({
  paddingTop: PAGE_INNER_PADDING * 2,
  // paddingLeft: PAGE_INNER_PADDING,
  paddingRight: PAGE_INNER_PADDING,
  paddingBottom: PAGE_INNER_PADDING,
  fontSize: '32px',
  fontWeight: 'bold'
}));
