import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import dayjs from 'dayjs';

import styled from '@emotion/styled';
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Stack,
  Chip
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Label from '../../../../components/common/Label';
import { palette } from '../../../../theme/palette';
import { times, meetingTypes } from '../../../../config';
import Selectbox from '../../../../components/common/Selectbox';

const RezForm = ({ recentMNames, setClickTagData }) => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const {
    m_name,
    m_type,
    rez_date,
    rez_start_time,
    rez_end_time,
    tot_pt_ctn,
    mr_pt_list
  } = rezData;

  // 회의명 입력 이벤트
  const handleMName = (e) => {
    const newRezData = { ...rezData, m_name: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

  // 회의명 태그 클릭 이벤트
  const handleMNameChip = (e) => {
    const value = e.target.textContent;
    const findData = recentMNames.filter((item) => item.m_name === value);
    setClickTagData([...findData]);
    const newRezData = { ...rezData, m_name: value };
    dispatch(setRezData({ data: newRezData }));
  };

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

  return (
    <Grid container spacing={1.5}>
      {/* 회의명 */}
      <Grid item container spacing={2}>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'m_name'} text={'회의명'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <TextField
            id="m_name"
            variant="outlined"
            value={m_name}
            placeholder="회의명을 입력하세요"
            onChange={handleMName}
            sx={{
              '.MuiInputBase-root': {
                border: `2px solid ${palette.primary.main}`
              }
            }}
          />
        </Grid>
      </Grid>
      <Grid item container>
        <StyledLabelGrid item xs={3}></StyledLabelGrid>
        <Grid item xs={9}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '4px'
            }}
          >
            {recentMNames &&
              recentMNames.map((item) => (
                <StyledChip
                  label={item.m_name}
                  size="small"
                  onClick={handleMNameChip}
                />
              ))}
          </Stack>
        </Grid>
      </Grid>

      {/* 회의 종류 */}
      <Grid item container spacing={2}>
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

      {/* 반복 예약 토글 */}
      {/* <Grid item container sx={{ justifyContent: 'flex-end' }}>
        <StyledSwitchLabel
          value="start"
          control={<Switch />}
          label="정기 예약"
          labelPlacement="start"
        />
      </Grid> */}

      {/* 예약 일자 */}
      <Grid item container spacing={2}>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'rez_date'} text={'예약 일자'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ paddingTop: '0' }}>
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
      <Grid item container spacing={2}>
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

      {/* 총 인원수 */}
      <Grid item container spacing={2}>
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
  );
};

export default RezForm;

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));

const StyledSwitchLabel = styled(FormControlLabel)(({ theme }) => ({
  '&.MuiFormControlLabel-label': {
    fontSize: '14px',
    fontWeight: 'bold'
  }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '&.MuiInputBase-root': {
    width: '100%'
  }
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginBottom: '6px',
  '&.MuiChip-root': {
    borderRadius: '20px',
    fontSize: '12px',
    color: '#000',
    backgroundColor: '#eee'
  }
}));
