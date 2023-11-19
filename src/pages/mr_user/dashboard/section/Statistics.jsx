import { Box, Grid, Stack, Typography } from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import MrUsageRateChart from '../chart/MrUsageRateChart';
import MrTimeChart from '../chart/MrTimeChart';
import { getFormattedDate } from '../../../../utils/formatDate';
import { getFormattedTime } from '../../../../utils/formatTime';

const Statistics = ({ data }) => {
  const today = getFormattedDate(); // 현재 날짜 (년-월-일)
  const time = getFormattedTime();

  // 그룹화할 기준 속성 (예: type)
  const groupByProperty = 'mr_type';

  // 각 그룹에 해당하는 객체들을 담을 객체 초기화
  const groupedObject = {};

  // 객체를 그룹에 따라 분배
  data &&
    data.forEach((obj) => {
      const groupValue = obj[groupByProperty];

      if (!groupedObject[groupValue]) {
        groupedObject[groupValue] = [];
      }

      groupedObject[groupValue].push(obj);
    });

  // 회의실별 데이터 분류 (없을 시 undefined)
  const sm = groupedObject['소회의실'];
  const md = groupedObject['중회의실'];
  const lg = groupedObject['대회의실'];
  const mt = groupedObject['미팅룸'];

  // 소회의실 데이터 가공 ************************************************
  sm &&
    sm.forEach((item) => {
      const inputString = item.rez_time;
      const regex = /\b\d{2}:\d{2}\b/;
      const match = inputString.match(regex);

      if (match) {
        const extractedTime = match[0];
        item.rez_time = extractedTime;
      } else {
        console.log('No match found');
      }
    });

  let smResult = [];
  slots.forEach((time) => {
    const res = sm && sm.filter((date) => date.rez_time === time);
    if (res && res.length !== 0) {
      // 데이터가 있는 경우
      smResult.push(...res);
    } else {
      // 데이터가 없는 경우 cnt 0 처리
      smResult.push({ rez_time: time, rez_cnt: 0 });
    }
  });

  const smCnt = smResult
    .map((i) => i.rez_cnt)
    .reduce((acc, cur) => acc + cur, 0);
  const smtot = mr[0].cnt * ((18 - 9) * 2);
  const smRate = (smCnt / smtot) * 100;

  // 중회의실 데이터 가공 ************************************************
  md &&
    md.forEach((item) => {
      const inputString = item.rez_time;
      const regex = /\b\d{2}:\d{2}\b/;
      const match = inputString.match(regex);

      if (match) {
        const extractedTime = match[0];
        item.rez_time = extractedTime;
      } else {
        console.log('No match found');
      }
    });

  let mdResult = [];
  slots.forEach((time) => {
    const res = md && md.filter((date) => date.rez_time === time);
    if (res && res.length !== 0) {
      // 데이터가 있는 경우
      mdResult.push(...res);
    } else {
      // 데이터가 없는 경우 cnt 0 처리
      mdResult.push({ rez_time: time, rez_cnt: 0 });
    }
  });

  const mdCnt = smResult
    .map((i) => i.rez_cnt)
    .reduce((acc, cur) => acc + cur, 0);
  const mdtot = mr[1].cnt * ((18 - 9) * 2);
  const mdRate = (mdCnt / mdtot) * 100;
  console.log(`소회의실 예약률: ${mdRate.toFixed(2)}%`);

  // 대회의실 데이터 가공 ************************************************
  lg &&
    lg.forEach((item) => {
      const inputString = item.rez_time;
      const regex = /\b\d{2}:\d{2}\b/;
      const match = inputString.match(regex);

      if (match) {
        const extractedTime = match[0];
        item.rez_time = extractedTime;
      } else {
        console.log('No match found');
      }
    });

  let lgResult = [];
  slots.forEach((time) => {
    const res = lg && lg.filter((date) => date.rez_time === time);
    if (res && res.length !== 0) {
      // 데이터가 있는 경우
      lgResult.push(...res);
    } else {
      // 데이터가 없는 경우 cnt 0 처리
      lgResult.push({ rez_time: time, rez_cnt: 0 });
    }
  });

  const lgCnt = smResult
    .map((i) => i.rez_cnt)
    .reduce((acc, cur) => acc + cur, 0);
  const lgtot = mr[2].cnt * ((18 - 9) * 2);
  const lgRate = (lgCnt / lgtot) * 100;
  console.log(`소회의실 예약률: ${lgRate.toFixed(2)}%`);

  // 미팅룸 데이터 가공 ************************************************
  mt &&
    mt.forEach((item) => {
      const inputString = item.rez_time;
      const regex = /\b\d{2}:\d{2}\b/;
      const match = inputString.match(regex);

      if (match) {
        const extractedTime = match[0];
        item.rez_time = extractedTime;
      } else {
        console.log('No match found');
      }
    });

  let mtResult = [];
  slots.forEach((time) => {
    const res = mt && mt.filter((date) => date.rez_time === time);
    if (res && res.length !== 0) {
      // 데이터가 있는 경우
      mtResult.push(...res);
    } else {
      // 데이터가 없는 경우 cnt 0 처리
      mtResult.push({ rez_time: time, rez_cnt: 0 });
    }
  });

  const mtCnt = smResult
    .map((i) => i.rez_cnt)
    .reduce((acc, cur) => acc + cur, 0);
  const mttot = mr[3].cnt * ((18 - 9) * 2);
  const mtRate = (mtCnt / mttot) * 100;

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
        <Typography variant="h6">실시간 회의실 예약 현황</Typography>
        <Typography sx={{ fontSize: '14px', color: '#999' }}>
          {`${today} ${time} 기준`}
        </Typography>
      </Stack>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <StyledCard category={0}>
              <Typography variant="subtitle2" sx={{ color: '#666' }}>
                소회의실
              </Typography>
              <StyledRate>{`${smRate.toFixed(1)}%`}</StyledRate>
            </StyledCard>
          </Grid>
          <Grid item xs={3}>
            <StyledCard category={1}>
              <Typography variant="subtitle2" sx={{ color: '#666' }}>
                중회의실
              </Typography>
              <StyledRate>{`${mdRate.toFixed(1)}%`}</StyledRate>
            </StyledCard>
          </Grid>
          <Grid item xs={3}>
            <StyledCard category={2}>
              <Typography variant="subtitle2" sx={{ color: '#666' }}>
                대회의실
              </Typography>
              <StyledRate>{`${lgRate.toFixed(1)}%`}</StyledRate>
            </StyledCard>
          </Grid>

          <Grid item xs={3}>
            <StyledCard category={3}>
              <Typography variant="subtitle2" sx={{ color: '#666' }}>
                미팅룸
              </Typography>
              <StyledRate>{`${mtRate.toFixed(1)}%`}</StyledRate>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', marginTop: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledCard>
              {/* <Typography variant="subtitle2" sx={{ color: '#666' }}>
                회의실
              </Typography> */}
              <MrTimeChart
                smResult={smResult}
                mdResult={mdResult}
                lgResult={lgResult}
                mtResult={mtResult}
              />
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </WrapContainer>
  );
};

export default Statistics;

const mr = [
  {
    type: '소회의실',
    cnt: 23
  },
  {
    type: '중회의실',
    cnt: 10
  },
  {
    type: '대회의실',
    cnt: 4
  },
  {
    type: '미팅룸',
    cnt: 5
  }
];

const slots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00'
];

const StyledChartTitle = styled(Typography)(({ theme }) => ({
  padding: '2px 4px',
  backgroundColor: '',
  textAlign: 'center'
  // color: theme.palette.primary.main
}));

const StyledCard = styled(Grid)(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  borderRadius: '2px',
  backgroundColor: theme.palette.grey['100'],
  border: `1px solid ${theme.palette.grey['300']}`
}));

const StyledRate = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 'bold'
}));
