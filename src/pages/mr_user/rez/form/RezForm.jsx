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
  Stack
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Label from '../../../../components/common/Label';

const RezForm = () => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const { mPurpose, mType, rezDate, rezStartTime, rezEndTime, totPtCtn } =
    rezData;

  const meetingTypes = [
    {
      index: 0,
      value: '프로젝트 회의'
    },
    {
      index: 1,
      value: '컨퍼런스'
    },
    {
      index: 3,
      value: '화상 회의'
    },
    {
      index: 4,
      value: '정기 회의'
    }
  ];

  const times = [
    {
      index: 0,
      value: '9:00'
    },
    {
      index: 1,
      value: '9:30'
    },
    {
      index: 2,
      value: '10:00'
    },
    {
      index: 3,
      value: '10:30'
    },
    {
      index: 4,
      value: '11:00'
    },
    {
      index: 5,
      value: '11:30'
    },
    {
      index: 6,
      value: '12:00'
    },
    {
      index: 7,
      value: '12:30'
    },
    {
      index: 8,
      value: '13:00'
    },
    {
      index: 9,
      value: '13:30'
    },
    {
      index: 10,
      value: '14:00'
    },
    {
      index: 11,
      value: '14:30'
    },
    {
      index: 12,
      value: '15:00'
    },
    {
      index: 13,
      value: '15:30'
    },
    {
      index: 14,
      value: '16:00'
    },
    {
      index: 15,
      value: '16:30'
    },
    {
      index: 16,
      value: '17:00'
    },
    {
      index: 17,
      value: '17:30'
    },
    {
      index: 18,
      value: '18:00'
    }
  ];

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
      <Grid item container spacing={2}>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'mPurpose'} text={'회의 목적'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <TextField
            id="mPurpose"
            variant="outlined"
            value={mPurpose}
            placeholder="회의 목적을 입력하세요"
          />
        </Grid>
      </Grid>

      {/* 회의 종류 */}
      <Grid item container spacing={2}>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'mrType'} text={'회의 종류'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <Select value={mType} onChange={handleSelectBox} displayEmpty>
            <MenuItem value="">선택</MenuItem>
            {meetingTypes.map((item) => (
              <MenuItem key={item.index} value={item.value}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      {/* 반복 예약 토글 */}
      <Grid item container sx={{ justifyContent: 'flex-end' }}>
        <StyledSwitchLabel
          value="start"
          control={<Switch />}
          label="정기 예약"
          labelPlacement="start"
        />
      </Grid>

      {/* 예약 일자 */}
      <Grid item container spacing={2}>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'rezDate'} text={'예약 일자'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                onChange={handleDatePick}
                format="YYYY-MM-DD"
                value={rezDate}
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
            <Select
              value={rezData.rezStartTime}
              onChange={handleSelectStartTime}
              displayEmpty
            >
              <MenuItem value="">선택</MenuItem>
              {times.map((item) => (
                <MenuItem value={item.value}>{item.value}</MenuItem>
              ))}
            </Select>
            <Typography sx={{ margin: '0 6px', display: 'block' }}>
              ~
            </Typography>
            <Select
              value={rezData.rezEndTime}
              onChange={handleSelectEndtTime}
              displayEmpty
            >
              <MenuItem value="">선택</MenuItem>
              {times.map((item) => (
                <MenuItem value={item.value}>{item.value}</MenuItem>
              ))}
            </Select>
          </Stack>
        </Grid>
      </Grid>

      {/* 총 인원수 */}
      <Grid item container spacing={2}>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'totPtCtn'} text={'총 인원수'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <TextField
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
  justifyContent: 'flex-end',
  alignItems: 'center'
}));

const StyledSwitchLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
    fontWeight: 'bold'
  }
}));
