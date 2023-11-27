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
import calcRezRate from '../../../utils/calcRezRate';
import Notice from './section/Notice';
import Notices from './section/Notices';
import { setRezData } from '../../../redux/reducer/mrUserSlice';
import { getFormattedDate } from '../../../utils/formatDate';
import Progress from '../../../components/mr_user/Progress';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userData = useSelector(setUserData).payload.user;
  const bmData = useSelector(setBmData).payload.bm;
  const [todayRezList, setTodayRezList] = useState([]); // 오늘 예약 리스트
  const [notice, setNotice] = useState([]); // 공지사항 리스트
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]); // 실시간 회의실 예약 현황 차트 데이터

  // 리덕스 데이터
  const { name, position_name, mem_code, dept_name } = userData;
  const { mr_list } = bmData;

  useEffect(() => {
    setIsLoading(true);
    getMrRezApi();
    getMrUsageApi();
    getNotice();
    bmMrApi();
    setIsLoading(false);
  }, []);

  // 즐겨찾기 회의실 API
  const bmMrApi = async () => {
    const res = await axiosInstance.axiosInstance.get(
      `/mr/bm?mem_code=${mem_code}`
    );
    if (res.status !== 200) return;
    // 즐겨찾기 회의실 리덕스 저장
    dispatch(setBmData({ data: res && res.data }));
  };

  // 전체 회의실 사용률 조회
  const getMrUsageApi = async () => {
    const date = getToday(); // 오늘 날짜 (년-월-일)

    const res = await axiosInstance.axiosInstance.get(
      `/mr/statistics?date=${date}`
    );

    if (res.status !== 200) return;
    setChartData(res.data);
  };

  // 사용자 회의실 예약 조회
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
      let lestPtList = [];

      if (Array.isArray(resByPt.data)) {
        lestPtList =
          resByPt.data.length !== 0 &&
          resByPt.data.filter(
            (itemPt) =>
              !res.data.some(
                (itemMaster) => itemMaster.mr_rez_code === itemPt.mr_rez_code
              )
          );

        // 참석자 & 예약자 role 속성 추가
        lestPtList.forEach((rez) => {
          rez.role = '참석자';
        });
        res.data &&
          res.data.forEach((rez) => {
            rez.role = '예약자';
          });
      }

      // 전체 회의 예약 (참석자 + 예약자)

      let data = [];
      if (Array.isArray(res.data)) {
        data = [...lestPtList, ...res.data];

        let list = [];
        // 오늘 예약 현황 추출
        const today = getToday();
        data &&
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 공지사항 조회
  const getNotice = async () => {
    const res = await axiosInstance.axiosInstance.get('/mr/notice');
    if (res.status !== 200) return;

    let processedData = [];

    if (Array.isArray(res.data)) {
      processedData = res.data.map((item) => ({
        ...item,
        id: item.notice_code
      }));
    } else {
      // 데이터가 배열이 아닌 경우에 대한 처리
      console.error('Data is not an array:', res.data);
    }

    setNotice(processedData);
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
            {/* 1단락 */}
            <MiniRezForm />

            {/* 2단락 */}
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={4.2} sx={{ height: '600px' }}>
                  <RezList todayRezList={todayRezList} />
                </Grid>
                <Grid item xs={7.8}>
                  <Statistics data={chartData} />
                </Grid>
              </Grid>
            </Box>

            {/* 3단락 */}
            {/* <Box>
              <Grid container spacing={3}>
                <Grid item xs={4.2}>
                  <Notice data={notice} />
                </Grid>
                <Grid item xs={7.8}>
                  asd
                </Grid>
              </Grid>
            </Box> */}
          </Stack>
        </MainContainer>
      </Box>
      <Progress open={isLoading} />
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
