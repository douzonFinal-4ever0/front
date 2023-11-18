import { Box, Grid, Paper, styled } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/common/Spinner.jsx';
import SubHeader from '../../components/common/SubHeader';
import MainContainer2 from '../../components/mr_admin/MainContainer2';
import TimeLineCalendar from '../../components/mr_admin/TimeLineCalendar';
import WrapContainer from '../../components/mr_user/WrapContainer';
import axiosInstance from '../../utils/axios.js';
const MrList = () => {
  const [value, setValue] = useState(dayjs().minute(0));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/mr/mrRez')
      .then((res) => {
        setRezList(res.data);
        const newEvents = res.data.map((rez) => ({
          title: rez.m_name,
          start: rez.rez_start_time,
          end: rez.rez_end_time,
          resourceId: rez.mr[0].mr_code,
          description: rez.m_name + '     [' + rez.mr[0].mr_name + ']',
          mr_rez_code: rez.mr_rez_code
        }));
        setEvents(newEvents);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
    axiosInstance.axiosInstance
      .get('/mr/mrList')
      .then((res) => {
        const mrList = res.data.map((rez) => ({
          id: rez.mr_code,
          title: rez.mr_name
        }));
        setMrList(mrList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);

  const [rezList, setRezList] = useState([]);
  const [events, setEvents] = useState([
    {
      title: '',
      start: '',
      end: '',
      resourceId: '',
      description: '',
      mr_rez_code: ''
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

  // console.log(value);
  return (
    <>
      <Spinner isLoading={isLoading} />
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
        <MainContainer2>
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
        </MainContainer2>
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

// const handleSearchClick = () => {
//   // startDate와 endDate 사이에 있는 데이터를 필터링
//   const filteredData = receipts.filter((receipt) => {
//     const reqDate = new Date(receipt.reqdate); // 문자열을 JavaScript Date 객체로 변환
//     const startDateObj = new Date(startDate); // 문자열을 JavaScript Date 객체로 변환
//     const endDateObj = new Date(endDate); // 문자열을 JavaScript Date 객체로 변환
//     return reqDate >= startDateObj && reqDate <= endDateObj;
//   });
//   // 필터링된 데이터를 상태에 저장
//   setFilteredReceipts([...filteredData]);
// };
