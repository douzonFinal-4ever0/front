import {
  AppBar,
  Grid,
  MenuItem,
  Paper,
  FormControl,
  Select,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import RezStatusChart from '../../components/car_admin/chart/RezStatusChart';
import MileageChart from '../../components/car_admin/chart/MileageChart';
import OperationCarChart from '../../components/car_admin/chart/OperationCarChart';
import MaintUrgentChart from '../../components/car_admin/chart/MaintUrgentChart';
import LocationChart from '../../components/car_admin/chart/LocationChart';
import OperTimeChart from '../../components/car_admin/chart/OperTimeChart';
import ExpenditureChart from '../../components/car_admin/chart/ExpenditureChart';
import ExpenditurePatternChart from '../../components/car_admin/chart/ExpenditurePatternChart';
import { useState } from 'react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CarDashboard = () => {
  const [searchData, setSearchData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [week, setWeek] = useState(0);

  const setPeriod = (weeksAgo) => {
    const today = new Date();

    // 이번 주의 월요일을 계산합니다.
    const monday = new Date(today);
    monday.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
    );

    console.log(monday);

    // 서버로 보낼 요청 객체를 만듭니다.
    setSearchData({
      sdate: dayjs(monday).subtract(weeksAgo, 'week').format('YYYY-MM-DD'),
      edate: dayjs(monday)
        .subtract(weeksAgo - 1, 'week')
        .subtract(1, 'day')
        .format('YYYY-MM-DD')
    });
    console.log(searchData);
  };

  useEffect(() => {
    console.log(searchData);
    setPeriod(week); // 이번 주의 일주일
    setIsLoading(false);
  }, [week]);

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar
          sx={{
            padding: '20px 30px !important',
            display: 'flex'
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ color: '#000', marginRight: '20px' }}
          >
            한 주간의 리포트
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setWeek(week + 1);
              }}
            >
              <ArrowBackIosIcon sx={{ width: '10px' }} />
            </Button>
            <Typography
              color="#111111"
              size="large"
              variant="subtitle2"
              margin=" 0px 20px"
            >
              {`${searchData.sdate} - ${searchData.edate}`}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setWeek(week - 1);
              }}
            >
              <ArrowForwardIosIcon sx={{ width: '10px' }} />
            </Button>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Grid
        sx={{
          flexGrow: 1,
          margin: '20px 0px 50px 0px',
          '& .MuiPaper-root': { borderRadius: '2px' }
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
                {!isLoading && <OperationCarChart searchData={searchData} />}
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper sx={{ height: 350 }}>
                {!isLoading && <RezStatusChart searchData={searchData} />}
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                {!isLoading && <LocationChart searchData={searchData} />}
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
                {!isLoading && <MileageChart searchData={searchData} />}
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 400
                }}
              >
                {!isLoading && <OperTimeChart searchData={searchData} />}
              </StyledPaper>
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
            <Grid item xs={12}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                <MaintUrgentChart searchData={searchData} />
              </StyledPaper>
            </Grid>
          </Grid>
        </Grid>
        {/* 지출 통계 */}
        <Grid xs={11}>
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
            <Grid item xs={8}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                {!isLoading && (
                  <ExpenditurePatternChart searchData={searchData} />
                )}
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                {!isLoading && <ExpenditureChart searchData={searchData} />}
              </StyledPaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CarDashboard;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white
}));

const StyledPaper = styled(Paper)(({ theme, sx }) => ({
  elevation: 4,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  ...sx
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  margin: '20px 20px',
  alignItems: 'center'
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
