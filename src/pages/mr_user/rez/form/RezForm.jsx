import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';

import styled from '@emotion/styled';
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Stack
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Label from '../../../../components/mr_user/Label';
import { palette } from '../../../../theme/palette';
import dayjs from 'dayjs';

const RezForm = () => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  console.log(rezData);

  // 회의 종류 셀렉트박스 이벤트
  const handleSelectBox = (e) => {
    const newRezData = { ...rezData, mType: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

  // 예약 날짜 데이트피커 이벤트
  const handleDatePick = (newValue) => {
    const newRezData = {
      ...rezData,
      rezDate: dayjs(newValue).format('YYYY-MM-DD')
    };
    dispatch(setRezData({ data: newRezData }));
  };

  // 예약 시작 시간 이벤트
  const handleSelectStartTime = (e) => {
    const newRezData = { ...rezData, rezStartTime: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

  // 예약 종료 시간 이벤트
  const handleSelectEndtTime = (e) => {
    const newRezData = { ...rezData, rezEndTime: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

  // 총인원수 이벤트
  const handleTotCtn = (e) => {
    const newRezData = { ...rezData, totPtCtn: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

  return (
    <Grid container spacing={1}>
      {/* 회의 목적 */}
      <Grid item container>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'mPurpose'} text={'회의 목적'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <StyledTextInput
            id="mPurpose"
            variant="outlined"
            value={rezData.mPurpose}
          />
        </Grid>
      </Grid>

      {/* 회의 종류 */}
      <Grid item container>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'mrType'} text={'회의 종류'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <StyledSelect
            value={rezData.mType}
            onChange={handleSelectBox}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ width: '100%' }}
          >
            <MenuItem value="">선택</MenuItem>
            <MenuItem value={'미팅'}>미팅</MenuItem>
            <MenuItem value={'화상회의'}>화상회의</MenuItem>
            <MenuItem value={'컨퍼런스'}>컨퍼런스</MenuItem>
          </StyledSelect>
        </Grid>
      </Grid>

      {/* 반복 예약 토글 */}
      <Grid item container sx={{ justifyContent: 'flex-end' }}>
        <StyledSwitchLabel
          value="start"
          control={
            <Switch
              sx={{
                '& .MuiSwitch-track': {
                  backgroundColor: palette.grey['400']
                }
              }}
            />
          }
          label="정기 예약"
          labelPlacement="start"
        />
      </Grid>

      {/* 예약 일자 */}
      <Grid item container>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'rezDate'} text={'예약 일자'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <StyledDatePicker onChange={handleDatePick} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>

      {/* 예약 시간 */}
      <Grid item container>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'rezTime'} text={'예약 시간'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <Stack direction={'row'} sx={{ alignItems: 'center' }}>
            <StyledSelect
              value={rezData.rezStartTime}
              onChange={handleSelectStartTime}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ width: '100%' }}
            >
              <MenuItem value="">선택</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </StyledSelect>
            <Typography sx={{ margin: '0 6px', display: 'block' }}>
              ~
            </Typography>
            <StyledSelect
              value={rezData.rezEndTime}
              onChange={handleSelectEndtTime}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ width: '100%' }}
            >
              <MenuItem value="">선택</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </StyledSelect>
          </Stack>
        </Grid>
      </Grid>

      {/* 총 인원수 */}
      <Grid item container>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'totPtCtn'} text={'총 인원수'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <StyledTextInput
            id="totPtCtn"
            variant="outlined"
            type="number"
            value={rezData.totPtCtn}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RezForm;

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

const StyledTextInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  border: '1px solid #ddd',
  backgroundColor: theme.palette.grey['100'],
  '& .MuiOutlinedInput-input': {
    padding: '12px 10px'
  }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  border: '1px solid #ddd',
  backgroundColor: theme.palette.grey['100'],
  '& .MuiOutlinedInput-input': {
    padding: '12px 10px'
  }
}));

const StyledSwitchLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
    fontWeight: 'bold'
  }
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.grey['100'],
  borderRadius: '8px',
  border: '1px solid #ddd',
  '& .MuiInputBase-input': {
    padding: '12px 10px'
  }
}));
