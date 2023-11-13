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

const CarDashboard = () => {
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar
          sx={{
            padding: '20px 40px !important',
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
                  '& .MuiInputBase-root': { width: '270px', height: '40px' }
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
          margin: '0px',
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
        <Grid xs={11} marginTop="20px">
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={4}>
              <Paper
                elevation={4}
                sx={{
                  height: 300,
                  width: '100%'
                }}
              >
                <StyledBox>
                  <Typography variant="h3">🚗</Typography>
                  <Typography variant="h6">운행 차량</Typography>
                </StyledBox>
                <StyledBox>
                  <Typography variant="h3" color="#333333" margin="0px 10px">
                    26
                  </Typography>
                  <Typography variant="h4" color="#999999">
                    / 35
                  </Typography>
                </StyledBox>
                <Box padding="10px 25px">
                  <BorderLinearProgress
                    variant="determinate"
                    value={50}
                    customColor={'#e53935'}
                  />
                </Box>
                <StyledBox>
                  <Typography variant="h4">💡</Typography>
                  <Typography variant="subtitle2">
                    총 ㅁㅁ대의 차량 중 11대를 운행했습니다.
                  </Typography>
                </StyledBox>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={4}
                sx={{
                  height: 300,
                  width: '100%',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
                }}
              >
                <StyledBox>
                  <Typography
                    height="48px"
                    display="flex"
                    color="#4ecb71"
                    marginRight="3px"
                    alignItems="center"
                  >
                    <CalculateIcon fontSize="large" />
                  </Typography>
                  <Typography variant="h6">총 운행 횟수</Typography>
                </StyledBox>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={4}
                sx={{
                  height: 300,
                  width: '100%',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={11} marginTop="20px">
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={4}>
              <Paper
                elevation={4}
                sx={{
                  height: 300,
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
                  height: 300,
                  width: '100%',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={4}
                sx={{
                  height: 300,
                  width: '100%',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
                }}
              />
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

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  margin: '20px 20px',
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
