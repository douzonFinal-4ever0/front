import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// -------------------------------------------------------------
import styled from '@emotion/styled';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
// -------------------------------------------------------------
import { setRezData } from '../../../redux/reducer/mrUserSlice';
import { setMrRecommendData } from '../../../redux/reducer/MrRecommendSlice';
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import SubHeader from '../../../components/common/SubHeader';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { palette } from '../../../theme/palette';
import RezInfo from './section/RezInfo';

const MrRezConfirmPage = () => {
  const [isBookmark, setIsBookMark] = useState(false);

  const rezData = useSelector(setRezData).payload.mrUser;
  const mrRecommendData = useSelector(setMrRecommendData).payload.mrRecommend;
  const { list } = mrRecommendData;
  const mr = list.filter((item) => item.mr_code === rezData.mr_code);

  const info = {
    m_name: rezData && rezData.m_name,
    mr_name: mr.length !== 0 && mr[0].mr_name,
    location: mr.length !== 0 && mr[0].location,
    rez_date: rezData && rezData.rez_date,
    rez_start_time: rezData && rezData.rez_start_time,
    rez_end_time: rezData && rezData.rez_end_time,
    created_at: mr.length !== 0 && mr[0].created_at,
    pt_list: rezData && rezData.mr_pt_list
  };

  const handleStarBtnClick = () => {
    setIsBookMark(!isBookmark);
  };

  return (
    <>
      <SubHeader title="회의실 예약" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Grid container direction={'row'} spacing={3}>
              <Grid item xs={8}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: `calc(100vh - 260px)`,
                    rowGap: '50px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <StyledDoneIcon />
                    <StyledDoneTitle>회의실 예약 완료</StyledDoneTitle>
                    <StyledDoneText>
                      자세한 사항은 예약 내역 페이지에서 확인할 수 있습니다.
                    </StyledDoneText>
                    <Stack direction={'row'} gap={1} sx={{ marginTop: '30px' }}>
                      <StyledLinkOutline to={'/mr/dashboard'}>
                        대시보드
                      </StyledLinkOutline>
                      <StyledLink to={'/mr/rez/history'}>예약 내역</StyledLink>
                    </Stack>
                  </Box>
                  <StyledBmSection>
                    <Box>
                      <Stack
                        direction={'row'}
                        sx={{ alignItems: 'center', gap: '4px' }}
                      >
                        <StyledIcon />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: palette.grey['700'], fontSize: '15px' }}
                        >
                          멤버 그룹 즐겨찾기에 등록 해보세요!
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#555',
                          marginTop: '4px'
                        }}
                      >
                        다음에 동일한 회의 예약 시 자동으로 참석자 그룹이
                        지정됩니다.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        padding: '10px 12px',
                        display: 'flex',
                        backgroundColor: '#fff',
                        borderRadius: '2px'
                      }}
                    >
                      <Box sx={{ flexGrow: 1, display: 'flex', gap: '10px' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          회의명
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          4명
                        </Typography>
                      </Box>
                      <StyledStarBtn onClick={handleStarBtnClick}>
                        {isBookmark ? (
                          <StarRoundedIcon fontSize="large" color="warning" />
                        ) : (
                          <StarBorderRoundedIcon
                            fontSize="large"
                            color="warning"
                          />
                        )}
                      </StyledStarBtn>
                    </Box>
                  </StyledBmSection>
                </Box>
              </Grid>

              <Grid
                item
                container
                xs={4}
                sx={{ overflowY: 'auto', maxHeight: '600px' }}
              >
                <RezInfo data={info} />
              </Grid>
            </Grid>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrRezConfirmPage;

const StyledStarBtn = styled(IconButton)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  width: '35px',
  height: '35px',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

const StyledBmSection = styled(Box)(({ theme }) => ({
  padding: '20px',
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey['100'],
  borderRadius: '4px',
  rowGap: '20px'
}));

const StyledDoneIcon = styled(CheckCircleRoundedIcon)(({ theme }) => ({
  width: '60px',
  height: '60px',
  color: theme.palette.primary.main
}));

const StyledDoneTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 'bold'
}));

const StyledDoneText = styled(Typography)(({ theme }) => ({
  marginTop: '10px',
  display: 'flex',
  textAlign: 'center',
  color: '#777'
}));

const StyledLink = styled(Link)(({ theme }) => ({
  padding: '8px 14px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  backgroundColor: theme.palette.grey['500'],
  fontWeight: 'bold',
  // fontSize: '18px',
  color: '#fff',
  textDecoration: 'none'
}));

const StyledLinkOutline = styled(StyledLink)(({ theme }) => ({
  backgroundColor: '#fff',
  border: `2px solid ${theme.palette.grey['500']}`,
  color: theme.palette.grey['500']
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold'
}));

const StyledStepText = styled(Typography)(({ theme }) => ({
  paddingBottom: '6px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderBottom: '3px solid black'
}));

const StyledIcon = styled(CampaignRoundedIcon)(({ theme }) => ({
  color: theme.palette.grey['00']
}));
