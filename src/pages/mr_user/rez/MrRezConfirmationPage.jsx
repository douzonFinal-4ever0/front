import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// -------------------------------------------------------------
import styled from '@emotion/styled';
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
// -------------------------------------------------------------
import { setRezData } from '../../../redux/reducer/mrUserSlice';
import { setMrRecommendData } from '../../../redux/reducer/MrRecommendSlice';
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import SubHeader from '../../../components/common/SubHeader';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SectionTitle from '../../../components/mr_user/SectionTitle';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { palette } from '../../../theme/palette';

const MrRezConfirmationPage = () => {
  const rezData = useSelector(setRezData).payload.mrUser;
  const mrRecommendData = useSelector(setMrRecommendData).payload.mrRecommend;
  const {
    m_name,
    rez_date,
    rez_end_time,
    rez_start_time,
    mr_pt_list,
    mr_code
  } = rezData;
  const { list } = mrRecommendData;
  const mr = list.filter((item) => item.mr_code === mr_code);
  const { mr_name, location } = mr[0];

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
                    height: `calc(100vh - 260px)`
                  }}
                >
                  <StyledDoneIcon />
                  <StyledDoneTitle>회의실 예약 완료</StyledDoneTitle>
                  <StyledDoneText>
                    예약이 완료되었습니다. <br />
                    자세한 사항은 예약 내역 페이지에서 확인할 수 있습니다.
                  </StyledDoneText>
                  <Stack direction={'row'} gap={1} sx={{ marginTop: '40px' }}>
                    <StyledLinkOutline to={'/mr/dashboard'}>
                      대시보드
                    </StyledLinkOutline>
                    <StyledLink to={'/mr/rez/history'}>예약 내역</StyledLink>
                  </Stack>
                </Box>
              </Grid>

              <Grid item container xs={4}>
                <Box
                  component={'section'}
                  sx={{
                    // padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    overflow: 'auto'
                  }}
                >
                  <StyledStepText>
                    <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                    예약 내역
                  </StyledStepText>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ margin: '16px 0 8px' }}
                    >
                      회의실 정보
                    </Typography>
                    <Box>
                      {/* 회의실명  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd',
                            borderTop: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="회의실명" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">
                                  {mr_name}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>

                      {/* 회의실 장소  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="회의장소" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">
                                  {location}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>

                      {/* 예약일자  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="예약일자" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">
                                  {rez_date}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>

                      {/* 예약시간  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="예약시간" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">{`${rez_start_time} ~ ${rez_end_time}`}</Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Box>

                    {/*  ******************************************************  */}
                    <Typography
                      variant="subtitle1"
                      sx={{ margin: '16px 0 8px' }}
                    >
                      참석자 정보
                    </Typography>
                    <Box>
                      {/* 회의명  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd',
                            borderTop: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="예약자" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">
                                  {'에스더씨'}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>

                      {/* 회의실명  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="회의실명" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">
                                  {'내일 저와 함께 간다니'}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>

                      {/* 회의실 장소  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="회의장소" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">
                                  {'너모 기대되어요'}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>

                      {/* 예약일자  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="예약일자" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">
                                  {'앞으로도 함께 해요..❤️'}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>

                      {/* 예약시간  */}
                      <Grid
                        item
                        xs={12}
                        sx={{
                          '& .infoTitle': {
                            backgroundColor: '#eeeeee'
                          },
                          '& .MuiListItem-gutters': {
                            borderBottom: '1px solid #bdbdbd'
                          }
                        }}
                      >
                        <Stack direction={'row'}>
                          <Grid item xs={5}>
                            <ListItem className="infoTitle">
                              <ListItemText primary="예약시간" />
                            </ListItem>
                          </Grid>
                          <Grid item xs={7}>
                            <ListItem>
                              <ListItemText>
                                <Typography variant="subtitle1">
                                  {'남은 시간 열공해요🤭'}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrRezConfirmationPage;

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
  marginTop: '20px',
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
