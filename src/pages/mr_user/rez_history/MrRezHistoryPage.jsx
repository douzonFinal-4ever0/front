import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// -------------------------------------------------------------
import styled from '@emotion/styled';
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
// -------------------------------------------------------------
import axiosInstance from '../../../utils/axios';
import { setUserData } from '../../../redux/reducer/userSlice';
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import SubHeader from '../../../components/common/SubHeader';
import MrRezCalendar from './section/MrRezCalendar';
import { palette } from '../../../theme/palette';
import Progress from '../../../components/mr_user/Progress';

const MrRezHistoryPage = () => {
  const userData = useSelector(setUserData).payload.user;
  const [todayRezList, setTodayRezList] = useState([]); // 오늘 예약 리스트
  const [rezList, setRezList] = useState([]); // 전체 예약 리스트
  const [events, setEvents] = useState([]); // 캘린더 이벤트
  const [master, setMaster] = useState([]); // 회의 예약자 정보
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMrRezApi();
    setIsLoading(false);
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

      // 마스터 정보 찾기
      const masterRes = await axiosInstance.axiosInstance.get('/mr/mem');
      if (masterRes.status !== 200) return;
      const newData = [...data];

      data.forEach((item, index) => {
        const findMem = masterRes.data.filter(
          (mem) => mem.mem_code === item.mem_code
        );
        newData[index] = { ...item, master: findMem[0] };
      });

      // 전체 예약 현황 업데이트
      setRezList(newData);

      const newEvents = data.map((rez) => ({
        title: `${rez.m_name} [${rez.mr.mr_name}] <${rez.role}>`,
        start: rez.rez_start_time,
        end: rez.rez_end_time,
        id: rez.mr_rez_code,
        borderColor: rez.role === '예약자' ? '#0288d1' : '#81c789'
      }));

      setEvents(newEvents);
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

  return (
    <>
      <SubHeader title="MY 회의실 예약" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <Grid container spacing={2}>
            {/* <Grid item container xs={12}>
              <WrapContainer bgcolor={'#fff'}>
                <Grid container sx={{ height: '200px' }}>
                  <Grid item xs={3}>
                    예약
                  </Grid>
                  <Grid item xs={3}>
                    예약
                  </Grid>
                  <Grid item xs={3}>
                    예약
                  </Grid>
                  <Grid item xs={3}>
                    예약
                  </Grid>
                </Grid>
              </WrapContainer>
            </Grid> */}

            <Grid item container spacing={2}>
              <Grid item xs={9}>
                <WrapContainer bgcolor={'#fff'}>
                  <Typography variant="h6" sx={{ marginBottom: '30px' }}>
                    전체 예약 현황
                  </Typography>
                  <MrRezCalendar
                    events={events}
                    data={rezList}
                    setRezList={setRezList}
                    getMrRezApi={getMrRezApi}
                    setEvents={setEvents}
                  />
                </WrapContainer>
              </Grid>

              {/* 오늘 회의실 예약 일정 */}
              <Grid item xs={3} sx={{}}>
                <WrapContainer
                  bgcolor={'#fff'}
                  sx={{ height: '100%', maxHeight: '564px' }}
                >
                  <Typography variant="h6">오늘 예약 현황</Typography>
                  <Box
                    sx={{
                      overflow: 'auto',
                      height: '95%',
                      scrollbarWidth: 'none',
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: palette.grey['500'],
                        borderRadius: '10px'
                      },
                      '&::-webkit-scrollbar': {
                        width: '10px',
                        backgroundColor: '#eee',
                        borderRadius: '10px'
                      }
                    }}
                  >
                    <Timeline
                      sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0
                        }
                      }}
                    >
                      {todayRezList.length !== 0 ? (
                        todayRezList.map((item, index) => (
                          <TimelineItem key={index}>
                            <TimelineSeparator>
                              <TimelineDot />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: palette.primary.main }}
                              >
                                {item.newTime}
                              </Typography>
                              <Typography variant="subtitle1" component="div">
                                {item.m_name}
                              </Typography>
                              <Typography variant="body2">
                                {item.mr && item.mr.mr_name}
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>
                        ))
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                          }}
                        >
                          <StyledNoCalendarIcon />
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            오늘 일정이 없습니다
                          </Typography>
                        </Box>
                      )}
                    </Timeline>
                  </Box>
                </WrapContainer>
              </Grid>
            </Grid>
          </Grid>
        </MainContainer>
      </Box>
      <Progress open={isLoading} />
    </>
  );
};

export default MrRezHistoryPage;

const StyledNoCalendarIcon = styled(EventBusyRoundedIcon)(() => ({
  color: '#666'
}));
