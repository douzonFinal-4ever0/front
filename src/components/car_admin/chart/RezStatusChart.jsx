import { CardContent, Divider, Grid, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';
import { format, subDays } from 'date-fns';
import { useEffect } from 'react';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../../../utils/axios';
import CalculateIcon from '@mui/icons-material/Calculate';

const RezStatusChart = ({ searchData }) => {
  // const [rezData, setRezData] = useState([]);
  const labels = ['미처리', '취소', '운행 대기', '운행 중', '운행 완료'];
  const [series, setSeries] = useState([]);
  // const [operCounts, setOperCounts] = useState({
  //   1: 0,
  //   2: 0,
  //   3: 0,
  //   4: 0,
  //   5: 0
  // });

  useEffect(() => {
    // const edate = format(new Date(), 'yyyy-MM-dd');
    // const sdate = format(subDays(new Date(), 7), 'yyyy-MM-dd');

    axiosInstance.axiosInstance
      .post('/manager/car/rezListGetAll', {
        rez_status: 0,
        rez_start_at: null,
        rez_end_at: null,
        oper_start_at: searchData.sdate,
        oper_end_at: searchData.edate,
        dept_name: '전체'
      })
      .then((res) => {
        console.log(res.data);
        const counts = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        };

        // rezData에서 특정 값을 추출하여 counts에 누적
        res.data.forEach((item) => {
          const status = item.rez_status; // 예약 상태에 맞게 변경 필요
          if (counts.hasOwnProperty(status)) {
            counts[status]++;
          }
        });

        // counts의 값을 series에 맞게 변환
        const series = Object.values(counts);

        setSeries(series);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchData]);

  const state = {
    options: {
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            size: '65%'
          }
        }
      },
      legend: {
        show: false
      },
      colors: ['#B5C7E3', '#e87676', '#ffc107', '#4695db', '#9cb287'],
      tooltip: {
        style: {
          fontSize: '14px',
          fontFamily: undefined
        },
        y: {
          title: {
            formatter: (seriesName, index) => {
              return labels[index.seriesIndex];
            }
          }
        }
      }
    },
    series: series,
    labels: labels
  };

  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <StyledBox>
            <Typography
              height="48px"
              display="flex"
              color="#4ecb71"
              marginRight="6px"
              alignItems="center"
            >
              <CalculateIcon fontSize="large" />
            </Typography>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
              이번주 예약 현황
            </Typography>
          </StyledBox>
          <StyledBox>
            <Typography variant="h3" color="#333333" margin="0px 10px">
              26건
            </Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={7} paddingTop="25px">
          <Box className="donut" sx={{ paddingRight: '30px' }}>
            <Chart
              options={state.options}
              series={state.series}
              height={220}
              type="donut"
              width="100%"
            />
          </Box>
        </Grid>
      </Grid>
      <CardContent>
        <Grid container sx={{ width: '100%' }}>
          {labels.map((item, index) => (
            <Grid item xs={2.4} textAlign="center">
              <Typography gutterBottom variant="subtitle2" component="div">
                {item}
              </Typography>
              <Typography variant="button" color="text.secondary">
                {series[index]}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </>
  );
};

export default RezStatusChart;

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  margin: '15px 20px',
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
