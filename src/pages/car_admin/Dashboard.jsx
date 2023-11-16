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
                <BajajAreaChartCard />
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
                    {/* <MileageChart /> */}
                  </Grid>
                </Grid>
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
