import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import dayjs from 'dayjs';
// @MUI--------------------------------------------------------------------
import styled from '@emotion/styled';
import { Grid, Box, Stack, Typography } from '@mui/material';
// --------------------------------------------------------------------
import Input from '../../../../components/mr_user/Input';
import Label from '../../../../components/mr_user/Label';
import RectangleBtn from '../../../../components/mr_user/RectangleBtn';
import SelectBox from '../../../../components/mr_user/SelectBox';
import DatePicker from '../../../../components/mr_user/DatePicker';
import SelectTime from '../../../../components/mr_user/SelectTime';

const MrForm = ({ mrCategory }) => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  // 예약하기 버튼 활성화 유무
  const [isDisabled, setIsDisabled] = useState(true);

  // rezData 모두 입력되어야 예약하기 버튼 활성화 처리
  useEffect(() => {
    if (
      rezData.mtype !== '' &&
      rezData.mPurpose !== '' &&
      rezData.rezDate !== '' &&
      rezData.rezStartTime !== '' &&
      rezData.rezEndTime !== '' &&
      rezData.totPtCtn !== ''
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rezData]);

  // 총인원수 이벤트
  const handleMPurpose = (e) => {
    const newRezData = { ...rezData, mPurpose: e.target.value };
    dispatch(setRezData({ data: newRezData }));
  };

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

  // 예약 버튼 이벤트
  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(rezData);
  };

  return (
    <StyledForm onSubmit={handleSubmitForm}>
      <Grid container spacing={2}>
        {/* 회의 목적 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="purpose" text={'회의 목적'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <Input
              value={rezData.mPurpose}
              handleInputChange={handleMPurpose}
              id="purpose"
              placeholder="회의 목적을 입력하세요"
            />
          </Grid>
        </Grid>
        {/* 회의 종류 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="category" text={'회의 종류'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <SelectBox
              value={rezData.mType}
              list={mrCategory}
              handleSelectBox={handleSelectBox}
            />
          </Grid>
        </Grid>
        {/* 회의 날짜 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="date" text={'예약 날짜'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <DatePicker
              value={dayjs(rezData.rezDate)}
              handleDatePick={handleDatePick}
            />
          </Grid>
        </Grid>
        {/* 회의 예약시간 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="time" text={'예약 시간'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <Stack
              direction={'row'}
              sx={{ width: '100%', justifyContent: 'space-between' }}
            >
              <SelectTime
                value={rezData.rezStartTime}
                handleSelectTime={handleSelectStartTime}
              />
              <StyledDashText>~</StyledDashText>
              <SelectTime
                value={rezData.rezEndTime}
                handleSelectTime={handleSelectEndtTime}
              />
            </Stack>
          </Grid>
        </Grid>
        {/* 회의 총인원수 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="totCtn" text={'총 인원수'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <Input
              type="number"
              id="totCtn"
              placeholder={'총 인원수'}
              value={rezData.totPtCtn}
              handleInputChange={handleTotCtn}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <RectangleBtn
            type="submit"
            text={'예약하기'}
            isDisabled={isDisabled}
          />
        </Grid>
      </Grid>
    </StyledForm>
  );
};

export default MrForm;

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%'
}));

const StyledLabelWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '100%'
}));

const StyledDashText = styled(Typography)(({ theme }) => ({
  margin: '0px 8px',
  display: 'flex',
  alignItems: 'center',
  fontWeight: theme.typography.fontWeightBold
}));
