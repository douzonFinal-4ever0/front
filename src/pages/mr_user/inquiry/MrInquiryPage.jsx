import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRezData } from '../../../redux/reducer/mrUserSlice';
import dayjs from 'dayjs';
// @MUI--------------------------------------------------------------------
import styled from '@emotion/styled';
import { Box, Grid, Stack, Typography } from '@mui/material';
// --------------------------------------------------------------------
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import PageTitle from '../../../components/mr_user/PageTitle';
import Label from '../../../components/mr_user/Label';
import SelectBox from '../../../components/mr_user/SelectBox';
import Input from '../../../components/mr_user/Input';
import SelectTime from '../../../components/mr_user/SelectTime';
import RectangleBtn from '../../../components/mr_user/RectangleBtn';
import DatePicker from '../../../components/mr_user/DatePicker';

const MrInquiryPage = () => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const navigation = useNavigate();

  // 회의실 종류 더미 데이터
  const mrCategory = [
    {
      index: 0,
      value: '미팅룸',
      name: '미팅룸'
    },
    {
      index: 1,
      value: '화상회의룸',
      name: '화상회의룸'
    },
    {
      index: 2,
      value: '컨퍼런스룸',
      name: '컨퍼런스룸'
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

  // 조회 버튼 이벤트
  const handleInquiryBtn = (e) => {
    e.preventDefault();
    navigation('/mr/1');
  };

  return (
    <Box>
      <MainContainer>
        <PageTitle title="회의실 조회" />
      </MainContainer>
      <MainContainer>
        <WrapContainer bgColor={'#fff'}>
          <Box component={'form'} onSubmit={handleInquiryBtn}>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: 'flex' }} gap={2}>
                {/* 회의 종류 */}
                <Grid item xs={3} sx={{ display: 'flex' }} gap={1}>
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
                {/* 예약 날짜 */}
                <Grid item xs={3} sx={{ display: 'flex' }} gap={1}>
                  <Grid item xs={3}>
                    <StyledLabelWrap>
                      <Label for="category" text={'예약 날짜'} />
                    </StyledLabelWrap>
                  </Grid>
                  <Grid item xs={9}>
                    <DatePicker
                      value={rezData.rezDate}
                      handleDatePick={handleDatePick}
                    />
                  </Grid>
                </Grid>
                {/* 예약 시간 */}
                <Grid item xs={3} sx={{ display: 'flex' }} gap={1}>
                  <Grid item xs={3}>
                    <StyledLabelWrap>
                      <Label for="totCtn" text={'예약 시간'} />
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
                {/* 총 인원수 */}
                <Grid item xs={3} sx={{ display: 'flex' }} gap={1}>
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
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ width: '240px' }}>
                  <RectangleBtn type={'submit'} text={'조회하기'} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </WrapContainer>
      </MainContainer>
    </Box>
  );
};

export default MrInquiryPage;

const StyledLabelWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
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
