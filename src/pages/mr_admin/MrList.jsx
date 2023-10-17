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

const MrList = () => {
  const [rezList, setRezList] = useState([]);
  const [events, setEvents] = useState([
    {
      title: '',
      start: '',
      end: ''
    }
  ]);
  const handleClick = () => {
    axios.get('http://localhost:8081/mr/mrRez').then((res) => {
      console.log(res.data);
      setRezList(res.data);
      const newEvents = res.data.map((rez) => ({
        title: rez.m_purpose,
        start: rez.rez_start_time,
        end: rez.rez_end_time
      }));
      setEvents(newEvents);
    });
  };
  // const events = [
  //   {
  //     title: 'test1',
  //     start: '2023-10-12'
  //   },
  //   {
  //     title: 'test2',
  //     start: '2023-10-13',
  //     end: '2023-10-16'
  //   }
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
        <SubSidebar />
        <MainContainer>
          <WrapContainer bgColor={'#fff'}>
            <Grid spacing={2}>
              <TimeField withMonth={false} label={'start-time'} />
              <TimeField withMonth={false} label={'end-time'} />
              <Button variant="outlined" onClick={handleClick}>
                조회
              </Button>
            </Grid>
            <Calendar events={events} tabData={tabData} />
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
