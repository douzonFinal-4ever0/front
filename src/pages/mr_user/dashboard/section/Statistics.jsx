import { Box, Grid, Stack, Typography } from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import MrUsageRateChart from '../chart/MrUsageRateChart';

const Statistics = () => {
  return (
    <WrapContainer bgcolor={'#fff'}>
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Typography variant="h6">실시간 회의실 현황</Typography>
        <Typography sx={{ fontSize: '14px', color: '#999' }}>
          2023.11.12 13:00 기준
        </Typography>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <ChartTitle variant="subtitle1">전체 회의실 예약률</ChartTitle>
              <MrUsageRateChart />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <ChartTitle variant="subtitle1">
                무슨 그래프를 보여주까
              </ChartTitle>
              <MrUsageRateChart />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </WrapContainer>
  );
};

export default Statistics;

const ChartTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.primary.main
}));
