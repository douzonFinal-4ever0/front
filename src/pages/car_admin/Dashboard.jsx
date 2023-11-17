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
import RezStatusChart from '../../components/car_admin/chart/RezStatusChart';
import MileageChart from '../../components/car_admin/chart/MileageChart';
import BajajAreaChartCard from '../../components/car_admin/chart/MileagePatternChart';
import OperationCarChart from '../../components/car_admin/chart/OperationCarChart';
import MaintUrgentChart from '../../components/car_admin/chart/MaintUrgentChart';
import LocationChart from '../../components/car_admin/chart/LocationChart';
import OperTimeChart from '../../components/car_admin/chart/OperTimeChart';

const CarDashboard = () => {
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
                <OperationCarChart />
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper sx={{ height: 350 }}>
                <RezStatusChart />
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                <LocationChart />
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
                <MileageChart />
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 400
                }}
              >
                <OperTimeChart />
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
            <Grid item xs={8}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                <MaintUrgentChart />
              </StyledPaper>
            </Grid>
            <Grid item xs={4}>
              <StyledPaper
                sx={{
                  height: 350
                }}
              >
                <BajajAreaChartCard />
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
