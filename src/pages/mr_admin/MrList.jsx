import React from 'react';
import { useState } from 'react';
import TimeField from '../../components/common/TimeField';
import { Stack, display } from '@mui/system';
import { Container, Grid, Paper, styled, Box, Button } from '@mui/material';
import Calendar from '../../components/common/Calendar';
import SubSidebar from '../../components/common/SubSidebar';
import SubHeader from '../../components/common/SubHeader';
import axios from 'axios';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect } from 'react';
import TimeLineCalendar from '../../components/mr_admin/TimeLineCalendar';

const MrList = () => {
  const [value, setValue] = useState(dayjs().minute(0));

  useEffect(() => {
    axios.get('http://localhost:8081/mr/mrRez').then((res) => {
      setRezList(res.data);
      const newEvents = res.data.map((rez) => ({
        title: rez.m_name,
        start: rez.rez_start_time,
        end: rez.rez_end_time,
        resourceId: rez.mr[0].mr_code
      }));

      setEvents(newEvents);
    });
    axios.get('http://localhost:8081/mr/mrList').then((res) => {
      const mrList = res.data.map((rez) => ({
        id: rez.mr_code,
        title: rez.mr_name
      }));
      setMrList(mrList);
    });
  }, []);

  const [rezList, setRezList] = useState([]);
  const [events, setEvents] = useState([
    {
      title: '',
      start: '',
      end: '',
      resourceId: ''
    }
  ]);
  const [mrList, setMrList] = useState([
    {
      id: '',
      title: ''
    }
  ]);

  // const events = [
  //    {
  //   id: 'event1',
  //   resourceId: 'a', // 리소스 ID (resources 배열에 정의한 ID와 일치해야 함)
  //   title: '이벤트 1',
  //   start: '2023-10-19T09:00:00',
  //   end: '2023-10-19T11:00:00'
  // },
  // {
  //   id: 'event2',
  //   resourceId: 'b',
  //   title: '이벤트 2',
  //   start: '2023-10-19T19:00:00',
  //   end: '2023-10-19T21:00:00'
  // }
  // 추가 이벤트들
  // ];
  const tabData = [
    {
      title: '이름11111',
      content: <TimeField contents={events} />
    }
  ];
  return (
    <>
      <SubHeader
        title={'회의실 예약 상황'}
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: '100%',
            backgroundColor: '#f5f5f5'
          }
        }}
      />
      <Box sx={{ display: 'flex', height: '95%' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Grid spacing={2}>
              {/* <TimeField
                withMonth={false}
                label={'start-time'}
                timeValue={dayjs().minute(0)}
              />
              <TimeField
                withMonth={false}
                label={'end-time'}
                timeValue={dayjs().minute(0).add(2, 'hour')}
              />
              <Button variant="outlined" onClick={handleClick}>
                조회
              </Button> */}
            </Grid>
            <TimeLineCalendar events={events} resources={mrList} />
            {/* <Calendar events={events} tabData={tabData} /> */}
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrList;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%',
  margin: '1%'
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%',
  margin: '1%'
}));
