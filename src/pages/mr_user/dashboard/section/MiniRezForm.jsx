import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axiosInstance from '../../../../utils/axios';

import { Box, Grid, TextField, Typography, Stack } from '@mui/material';
import styled from '@emotion/styled';

import { times } from '../../../../config';
import { meetingTypes } from '../../../../config';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import { setUserData } from '../../../../redux/reducer/userSlice';
import { setMrRecommendData } from '../../../../redux/reducer/MrRecommendSlice';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import Label from '../../../../components/common/Label';
import Selectbox from '../../../../components/common/Selectbox';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Progress from '../../../../components/mr_user/Progress';
import { useState } from 'react';

const MiniRezForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector(setUserData).payload.user;
  const rezData = useSelector(setRezData).payload.mrUser;
  // 사용자 데이터
  const { name, position_name, mem_code, dept_name } = userData;
  // 회의실 예약 데이터
  const { m_name, m_type, rez_date, rez_start_time, rez_end_time, tot_pt_ctn } =
    rezData;

  // 예약 종료 시간 리스트
  const [endTimes, setEndTimes] = useState([]);

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

  // 예약 시작 시간 이벤트
  const handleSelectStartTime = (e) => {
    const findItem = times.filter((time) => time.value === e.target.value);
    if (findItem.length !== 0) {
      const index = findItem[0].index;
      const res = times.filter((time) => time.index > index);
      setEndTimes(res);

      const newRezData = {
        ...rezData,
        rez_start_time: e.target.value,
        rez_end_time: res[0].value
      };
      dispatch(setRezData({ data: newRezData }));
    }
  };

  // 예약 종료 시간 이벤트
  const handleSelectEndtTime = (e) => {
    const newRezData = { ...rezData, rez_end_time: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

  // 총인원수 이벤트
  const handleTotCtn = (e) => {
    const newRezData = { ...rezData, tot_pt_ctn: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

  console.log(times);

  // 예약 버튼 이벤트
  const handleRezBtnSubmit = async (e) => {
    e.preventDefault();

    const userDefaultMrPt = {
      mem_code,
      name,
      dept_name,
      position_name
    };

    const newRezData = { ...rezData, mr_pt_list: [userDefaultMrPt] };
    dispatch(setRezData({ data: newRezData }));

    const data = {
      mem_code, // 사용자 번호
      m_type, // 회의 종류
      rez_date, // 예약 날짜
      rez_start_time, // 예약 시작 시간
      rez_end_time, // 예약 종료 시간
      tot_pt_ctn // 총 인원수
    };

    try {
      setIsLoading(true);
      const res = await axiosInstance.axiosInstance.get('/mr/recommend', {
        params: data
      });
      if (!res.status === 200) return;

      // 추천된 회의실 정보를 리덕스 저장
      dispatch(setMrRecommendData({ data: res.data }));
      setIsLoading(false);
      // 페이지 이동
      navigation('/mr/rez');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WrapContainer bgcolor={'#fff'}>
      <Box
        component={'form'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '30px',
          padding: '10px 0'
        }}
        onSubmit={handleRezBtnSubmit}
      >
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          {/* 회의 종류 */}
          <Grid item container xs={3} spacing={1}>
            <StyledLabelGrid item xs={3}>
              <Label htmlFor={'m_type'} text={'회의 목적'} />
            </StyledLabelGrid>
            <Grid item xs={9}>
              <Selectbox
                value={m_type}
                handleSelectBox={handleSelectBox}
                menuList={meetingTypes}
              />
            </Grid>
          </Grid>

          {/* 예약 일자 */}
          <Grid item container xs={3} spacing={1}>
            <StyledLabelGrid item xs={3}>
              <Label htmlFor={'rez_date'} text={'예약 일자'} />
            </StyledLabelGrid>
            <Grid item xs={9} container direction={'row'}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={['DatePicker']}
                  sx={{ paddingTop: '0' }}
                >
                  <DatePicker
                    onChange={handleDatePick}
                    format="YYYY-MM-DD"
                    value={dayjs(rez_date)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          {/* 예약 시간 */}
          <Grid item container xs={3} spacing={1}>
            <StyledLabelGrid item xs={3}>
              <Label htmlFor={'rezTime'} text={'예약 시간'} />
            </StyledLabelGrid>
            <Grid item xs={9}>
              <Stack direction={'row'} sx={{ alignItems: 'center' }}>
                <Selectbox
                  value={rez_start_time}
                  handleSelectBox={handleSelectStartTime}
                  menuList={times}
                />
                <Typography sx={{ margin: '0 6px', display: 'block' }}>
                  ~
                </Typography>
                <Selectbox
                  value={rez_end_time}
                  handleSelectBox={handleSelectEndtTime}
                  menuList={endTimes.length === 0 ? times : endTimes}
                />
              </Stack>
            </Grid>
          </Grid>

          {/* 총 인원 */}
          <Grid item container xs={3} spacing={1}>
            <StyledLabelGrid item xs={3}>
              <Label htmlFor={'tot_pt_ctn'} text={'총 인원수'} />
            </StyledLabelGrid>
            <Grid item xs={9}>
              <TextField
                id="tot_pt_ctn"
                variant="outlined"
                type="number"
                value={tot_pt_ctn}
                onChange={handleTotCtn}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '240px' }}>
            <RectangleBtn
              type={'submit'}
              text={'빠른 예약'}
              category={'register'}
              sx={{ padding: '14px 12px' }}
            />
          </Box>
        </Grid>
      </Box>
      <Progress open={isLoading} />
    </WrapContainer>
  );
};

export default MiniRezForm;

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
