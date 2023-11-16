import {
  AppBar,
  Grid,
  MenuItem,
  Paper,
  FormControl,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';
import CalculateIcon from '@mui/icons-material/Calculate';
import RezStatusChart from '../../components/car_admin/chart/RezStatusChart';
import axiosInstance from '../../utils/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { format, subDays } from 'date-fns';
import MileageChart from '../../components/car_admin/chart/MileageChart';
import BajajAreaChartCard from '../../components/car_admin/chart/MileagePatternChart';
import OperationCarChart from '../../components/car_admin/chart/OperationCarChart';

const CarDashboard = () => {
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar
          sx={{
            padding: '30px 40px !important',
            width: '100%',
            display: 'block'
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: '#000' }}
          >
            한 주간의 리포트
          </Typography>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            sx={{ flexGrow: 1, marginTop: '10px' }}
          >
            <Typography color="#111111" variant="subtitle2" marginRight="20px">
              기간
            </Typography>
            <Box sx={{ minWidth: 110, width: '270px' }}>
              <FormControl
                sx={{
                  '& .MuiInputBase-root': { width: '270px', height: '30px' }
                }}
              >
                <Select id="demo-simple-select" value={''} onChange={(e) => {}}>
                  <MenuItem value="">1</MenuItem>
                  <MenuItem value="">2</MenuItem>
                  <MenuItem value="">3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Grid
        sx={{
          flexGrow: 1,
          margin: '20px 0px',
          '& .MuiPaper-root': { borderRadius: '6px' }
        }}
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid xs={11}>
          <Box
            marginTop="30px"
            width="90px"
            borderLeft="5px solid #666666"
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h6" color="#666666" paddingBottom="10px">
              운행 통계
            </Typography>
          </Box>
        </Grid>
        <Grid xs={11} marginTop="20px" flexDirection="column">
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={4}>
              <StyledPaper sx={{ height: 350 }}>
                {/* <OperationCarChart /> */}
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper sx={{ height: 350 }}>
                {/* <RezStatusChart /> */}
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '80%',
                    margin: '20px 20px 0px 20px',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    height="48px"
                    display="flex"
                    color="#4ecb71"
                    marginRight="10px"
                    alignItems="center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                    >
                      <path
                        d="M1.55566 20.9165C1.30961 20.9163 1.06784 20.8538 0.853937 20.7351C0.640038 20.6164 0.461327 20.4456 0.335254 20.2393C0.209181 20.0331 0.140054 19.7984 0.134624 19.5583C0.129194 19.3182 0.187646 19.0808 0.304272 18.8693L5.28421 9.84154C5.38927 9.65081 5.53858 9.48672 5.72021 9.36238C5.90184 9.23804 6.11075 9.15691 6.33025 9.12546C6.54974 9.09401 6.77373 9.11313 6.9843 9.18127C7.19487 9.24942 7.38619 9.36471 7.54297 9.51793L11.8656 13.7374L18.7934 0.827652C18.9685 0.50138 19.2693 0.256405 19.6296 0.146618C19.9898 0.0368311 20.3799 0.0712255 20.7142 0.242235C21.0484 0.413244 21.2994 0.70686 21.4119 1.05849C21.5243 1.41012 21.4891 1.79096 21.3139 2.11723L13.4883 16.7006C13.3847 16.8936 13.2361 17.0602 13.0545 17.1868C12.8728 17.3135 12.6632 17.3967 12.4425 17.4297C12.2219 17.4617 11.9967 17.4429 11.7848 17.3751C11.5729 17.3072 11.3801 17.1921 11.2217 17.0388L6.88206 12.8033L2.80989 20.186C2.68799 20.407 2.50698 20.5917 2.28613 20.7203C2.06528 20.849 1.81284 20.9168 1.55566 20.9165Z"
                        fill="#DD2E44"
                      />
                    </svg>
                  </Typography>
                  <Typography variant="h6">운행 패턴</Typography>
                </Box>
                {/* <BajajAreaChartCard /> */}
                <StyledSubBox>
                  <Typography variant="h4">💡</Typography>
                  <Typography variant="subtitle2">
                    총 ㅁㅁ대의 차량 중 11대를 운행했습니다.
                  </Typography>
                </StyledSubBox>
              </StyledPaper>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={11} marginTop="20px">
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={8}>
              <StyledPaper
                sx={{
                  height: 400
                }}
              >
                <Grid container>
                  <Grid item xs={3.5}>
                    <StyledBox>
                      <Typography
                        height="48px"
                        display="flex"
                        color="#4ecb71"
                        marginRight="8px"
                        alignItems="center"
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            id="Vector"
                            d="M5.625 7.63708C4.5125 7.63708 3.6125 6.73713 3.6125 5.62469C3.6125 5.09098 3.82453 4.57912 4.20195 4.20172C4.57936 3.82432 5.09125 3.6123 5.625 3.6123C6.7375 3.6123 7.6375 4.51225 7.6375 5.62469C7.6375 6.15841 7.42547 6.67027 7.04805 7.04767C6.67064 7.42507 6.15875 7.63708 5.625 7.63708ZM5.625 0C2.5 0 0 2.49986 0 5.62469C0 9.83697 5.625 16.0741 5.625 16.0741C5.625 16.0741 11.25 9.83697 11.25 5.62469C11.25 2.49986 8.75 0 5.625 0ZM19.375 7.63708C18.8413 7.63708 18.3294 7.42507 17.9519 7.04767C17.5745 6.67027 17.3625 6.15841 17.3625 5.62469C17.3625 5.36042 17.4146 5.09874 17.5157 4.85459C17.6168 4.61043 17.7651 4.38859 17.9519 4.20172C18.1388 4.01485 18.3607 3.86662 18.6048 3.76549C18.849 3.66436 19.1107 3.6123 19.375 3.6123C19.6393 3.6123 19.901 3.66436 20.1452 3.76549C20.3893 3.86662 20.6112 4.01485 20.7981 4.20172C20.9849 4.38859 21.1332 4.61043 21.2343 4.85459C21.3354 5.09874 21.3875 5.36042 21.3875 5.62469C21.3875 6.15841 21.1755 6.67027 20.7981 7.04767C20.4206 7.42507 19.9087 7.63708 19.375 7.63708ZM19.375 0C16.25 0 13.75 2.49986 13.75 5.62469C13.75 9.83697 19.375 16.0741 19.375 16.0741C19.375 16.0741 25 9.83697 25 5.62469C25 2.49986 22.5 0 19.375 0ZM19.375 17.499C17.7875 17.499 16.375 18.499 15.85 19.9989H9.15C8.81878 19.0634 8.1302 18.2974 7.23516 17.8686C6.34013 17.4399 5.31161 17.3834 4.375 17.7115C3.90948 17.8746 3.48067 18.1279 3.11309 18.4568C2.74551 18.7857 2.44636 19.1839 2.23276 19.6285C2.01915 20.0731 1.89527 20.5554 1.8682 21.0479C1.84114 21.5404 1.91141 22.0334 2.075 22.4988C2.41071 23.4367 3.10393 24.2037 4.00327 24.6323C4.90261 25.0608 5.93501 25.1162 6.875 24.7862C7.9375 24.4112 8.75 23.5612 9.15 22.4988H15.8625C16.55 24.4487 18.7 25.4736 20.625 24.7862C21.0919 24.6247 21.5224 24.3726 21.8916 24.0443C22.2608 23.716 22.5614 23.318 22.7763 22.8732C22.9912 22.4283 23.1161 21.9454 23.1437 21.4521C23.1714 20.9589 23.1013 20.465 22.9375 19.9989C22.4 18.499 20.975 17.499 19.375 17.499ZM19.375 23.1237C18.8777 23.1237 18.4008 22.9262 18.0492 22.5746C17.6975 22.223 17.5 21.7461 17.5 21.2488C17.5 20.7516 17.6975 20.2747 18.0492 19.9231C18.4008 19.5715 18.8777 19.3739 19.375 19.3739C19.8723 19.3739 20.3492 19.5715 20.7008 19.9231C21.0525 20.2747 21.25 20.7516 21.25 21.2488C21.25 21.7461 21.0525 22.223 20.7008 22.5746C20.3492 22.9262 19.8723 23.1237 19.375 23.1237Z"
                            fill="#FFD233"
                          />
                        </svg>
                      </Typography>
                      <Typography variant="h6">총 운행 거리</Typography>
                    </StyledBox>
                    <StyledBox>
                      <Typography
                        variant="h4"
                        color="#333333"
                        margin="0px 10px"
                      >
                        1,234
                      </Typography>
                      <Typography variant="h6" color="#999999">
                        km
                      </Typography>
                    </StyledBox>
                  </Grid>
                  <Grid item xs={8} paddingTop="25px">
                    {/* <MileageChart /> */}
                  </Grid>
                  <StyledSubBox>
                    <Typography variant="h4">💡</Typography>
                    <Typography variant="subtitle2">
                      지난주보다 00km 더 운행했습니다.
                    </Typography>
                  </StyledSubBox>
                </Grid>
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 400
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* 정비 시작 */}
        <Grid xs={11}>
          <Box
            marginTop="50px"
            width="90px"
            borderLeft="5px solid #666666"
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h6" color="#666666" paddingBottom="10px">
              정비 통계
            </Typography>
          </Box>
        </Grid>
        <Grid xs={11} marginTop="20px">
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                <StyledBox>
                  <Typography variant="h3" marginRight="3px">
                    🚨
                  </Typography>
                  <Typography variant="h6">빠른 정비 필요</Typography>
                </StyledBox>
                <StyledSubBox>
                  <Typography variant="h4">💡</Typography>
                  <Typography variant="subtitle2">
                    총 ㅁㅁ대의 차량 중 11대를 운행했습니다.
                  </Typography>
                </StyledSubBox>
              </StyledPaper>
            </Grid>
            <Grid item xs={8}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={4}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <StyledBox>
                      <Typography
                        height="48px"
                        display="flex"
                        color="#4ecb71"
                        marginRight="6px"
                        alignItems="center"
                      >
                        🛠️
                      </Typography>
                      <Typography variant="h6">정비 비용</Typography>
                      {/* 초과 비용이 의심되는 정비 내역 보여주기 */}
                    </StyledBox>
                    <StyledBox>
                      <Typography
                        variant="h3"
                        color="#333333"
                        margin="0px 10px"
                      >
                        26건
                      </Typography>
                    </StyledBox>
                    <StyledSubBox>
                      <Typography variant="h4">💡</Typography>
                      <Typography variant="subtitle2">
                        총 ㅁㅁ대의 차량 중 11대를 운행했습니다.
                      </Typography>
                    </StyledSubBox>
                  </Grid>
                  <Grid item xs={8} paddingTop="25px">
                    <MileageChart />
                  </Grid>
                </Grid>
              </StyledPaper>
            </Grid>
          </Grid>
        </Grid>
        {/* 지출 통계 */}
        {/* <Grid xs={11}>
          <Box
            marginTop="50px"
            width="90px"
            borderLeft="5px solid #666666"
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h6" color="#666666" paddingBottom="10px">
              지출 통계
            </Typography>
          </Box>
        </Grid>
        <Grid xs={11} marginTop="20px">
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={4}>
              <Paper
                elevation={4}
                sx={{
                  height: 350,
                  width: '100%'
                }}
              ></Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={4}
                sx={{
                  height: 350,
                  width: '100%',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
                }}
              ></Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={4}
                sx={{
                  height: 350,
                  width: '100%',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
                }}
              ></Paper>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </>
  );
};

export default CarDashboard;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  margin: '20px 20px',
  alignItems: 'center'
}));

const StyledPaper = styled(Paper)(({ theme, sx }) => ({
  elevation: 4,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  ...sx
}));

const StyledSubBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  marginTop: 'auto',
  marginRight: '20px',
  marginLeft: '20px',
  paddingBottom: '20px',
  alignItems: 'center'
}));

const BorderLinearProgress = styled(LinearProgress)(
  ({ theme, customColor }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[400]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: customColor
    }
  })
);
