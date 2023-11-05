import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// -------------------------------------------------------------
import styled from '@emotion/styled';
import { Box, Grid, Stack, Typography } from '@mui/material';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
// -------------------------------------------------------------
import { setMrRecommendData } from '../../../redux/reducer/MrRecommendSlice';
import { setBmData } from '../../../redux/reducer/BmSlice';
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import RecommendSection from './section/RecommendSection';
import MrInfoSection from './section/MrInfoSection';
import RezSection from './section/RezSection';
import SubHeader from '../../../components/common/SubHeader';

const MrRezPage = () => {
  const navigation = useNavigate();
  const mrRecommendData = useSelector(setMrRecommendData).payload.mrRecommend;
  const bmData = useSelector(setBmData).payload.bm;
  const { list } = mrRecommendData;
  const { mr_list } = bmData;

  const [selectMrCard, setSelectMrCard] = useState({});

  // 새로고침 시 대시보드로 리다이렉트
  useEffect(() => {
    if (mrRecommendData.list.length === 0) {
      navigation('/mr/dashboard');
    }
  }, []);

  // 첫번째 리스트 카드를 selectMrCard로 설정
  useEffect(() => {
    setSelectMrCard({ ...list[0] });
  }, []);

  // 회의실 카드 클릭 이벤트
  const handleCardClick = (e) => {
    const mrCode = e.currentTarget.getAttribute('name');
    const res = list.find((item) => item.mr_code == mrCode);
    setSelectMrCard({ ...res });
  };

  return (
    <>
      <SubHeader title="회의실 예약" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Grid container direction={'row'} spacing={3}>
              {/* row - 회의실 정보 */}
              <Grid item container xs={8} spacing={3}>
                <Grid item xs={5.5}>
                  <Stack spacing={2}>
                    <StyledStepText>
                      <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                      Step 1 - 추천 회의실 선택
                    </StyledStepText>
                    {list.length !== 0 ? (
                      <RecommendSection
                        data={list}
                        selectMrCard={selectMrCard}
                        handleCardClick={handleCardClick}
                      />
                    ) : (
                      '데이터 없음'
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={6.5}>
                  <Stack spacing={2}>
                    <StyledStepText>
                      <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                      Step 2 - 회의실 상세정보 확인
                    </StyledStepText>
                    {list.length !== 0 ? (
                      <MrInfoSection data={selectMrCard} />
                    ) : (
                      '데이터 없음'
                    )}
                  </Stack>
                </Grid>
              </Grid>
              {/* row - 예약 정보 */}
              <Grid item xs={4}>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <StyledStepText>
                      <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                      Step 3 - 예약 정보 입력
                    </StyledStepText>
                    {list.length !== 0 ? <RezSection /> : '데이터 없음'}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrRezPage;

const StyledStepText = styled(Typography)(({ theme }) => ({
  paddingBottom: '6px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderBottom: '3px solid black'
}));
