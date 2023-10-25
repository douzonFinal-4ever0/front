import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Box, Grid, TextField, Typography, Stack } from '@mui/material';
import styled from '@emotion/styled';

import { times } from '../../../../config';
import { meetingTypes } from '../../../../config';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import { setMrRecommendData } from '../../../../redux/reducer/MrRecommendSlice';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import Label from '../../../../components/common/Label';
import Selectbox from '../../../../components/common/Selectbox';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { async } from 'q';
import axios from 'axios';

const MiniRezForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const rezData = useSelector(setRezData).payload.mrUser;
  // 예약 리덕스 데이터
  const { m_name, m_type, rez_date, rez_start_time, rez_end_time, tot_pt_ctn } =
    rezData;

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
    const newRezData = { ...rezData, rez_start_time: e.target.value };
    dispatch(setRezData({ data: newRezData }));
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

  // 예약 버튼 이벤트
  const handleRezBtnSubmit = async (e) => {
    e.preventDefault();
    const data = {
      m_type,
      rez_date,
      rez_start_time,
      rez_end_time,
      tot_pt_ctn
    };

    const res = await axios.get('/mr/recommend', { params: data });
    if (!res.data) return;

    // 리덕스 저장
    dispatch(setMrRecommendData({ data: res.data }));
    // 페이지 이동
    navigation('/mr/rez');
  };

  return (
    <WrapContainer bgcolor={'#fff'}>
      <Box
        component={'form'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px'
        }}
        onSubmit={handleRezBtnSubmit}
      >
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          {/* 회의 종류 */}
          <Grid item container xs={3} spacing={1}>
            <StyledLabelGrid item xs={3}>
              <Label htmlFor={'m_type'} text={'회의 종류'} />
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
            <Grid item xs={9} direction={'row'}>
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
                  menuList={times}
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
    </WrapContainer>
  );
};

export default MiniRezForm;

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));