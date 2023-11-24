import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { palette } from '../../../theme/palette';

// material-ui
import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

import DefaultBarChart from './DefaultBarChart';
import { Box } from '@mui/system';

import axiosInstace from '../../../utils/axios';
import { formatNumber } from '../../../utils/formatNumber';

const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const MileageChart = ({ searchData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalOperDistance, setTotalOperDistance] = useState({});
  const [chartData, setChartData] = useState({
    nomal: [],
    commute: [],
    personal: []
  });
  const { primary } = palette.text;

  const darkLight = palette.mode.dark.light;
  const grey200 = palette.grey[200];
  const grey500 = palette.grey[500];

  const primary200 = palette.primary[200];
  const primaryDark = palette.primary.dark;
  const secondaryMain = palette.secondary.main;
  const secondaryLight = palette.secondary.light;

  useEffect(() => {
    axiosInstace.axiosInstance
      .post('/manager/car/weekOperationStatistics', searchData)
      .then((res) => {
        const daysOfWeek = [1, 2, 3, 4, 5]; // 1~5까지의 요일 값

        const processedData = daysOfWeek.map((day) => {
          // 받아온 데이터에서 현재 요일을 찾음
          const foundDay = res.data.weekOfOperationVOList.find(
            (item) => item.day_of_week === day
          );

          // 요일이 존재하지 않으면 새로운 객체를 생성하고 값을 0으로 초기화
          if (!foundDay) {
            return {
              day_of_week: day,
              distance: 0,
              nomal_biz_mileage: 0,
              commute_mileage: 0
            };
          }

          // 요일이 존재하면 기존 객체 반환
          return foundDay;
        });

        console.log(processedData);
        setTotalOperDistance({
          totalDistance: res.data.totalDistance,
          weekOfOperationVOList: processedData,
          lastTotalDistance: res.data.lastTotalDistance
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchData]);

  useEffect(() => {
    setChartData((prevData) => {
      if (totalOperDistance.weekOfOperationVOList) {
        return {
          nomal: totalOperDistance.weekOfOperationVOList
            .sort((a, b) => a.day_of_week - b.day_of_week)
            .map((item) => item.nomal_biz_mileage),
          commute: totalOperDistance.weekOfOperationVOList.map(
            (item) => item.commute_mileage
          ),
          personal: totalOperDistance.weekOfOperationVOList.map(
            (item) =>
              item.distance - (item.commute_mileage + item.nomal_biz_mileage)
          )
        };
      }
      return prevData; // 기존 데이터 유지
    });

    // 테마 바꿔주는 코드
    const newChartData = {
      ...mileageChartData.options,
      colors: [primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary
            ]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };
    // do not load chart when loading
    setIsLoading(false); // axios 요청으로 모두 요청이 끝나면 isLoading false 처리
    // false일 때
    ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
  }, [
    totalOperDistance.weekOfOperationVOList,
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    darkLight,
    grey200,
    isLoading,
    grey500
  ]);

  // Data
  const mileageChartData = {
    height: 300,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 300,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['MON', 'TUE', 'WED', 'THR', 'FRI']
      },
      legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      }
    },
    series: [
      {
        name: '일반업무',
        data: chartData.nomal
      },
      {
        name: '출퇴근',
        data: chartData.commute
      },
      {
        name: '개인사유',
        data: chartData.personal
      }
    ]
  };

  return (
    <>
      <Grid container>
        <Grid item xs={3.5}>
          <StyledBox>
            <Typography
              height="48px"
              display="flex"
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
            <Typography variant="h4" color="#333333" margin="0px 10px">
              {formatNumber(parseInt(totalOperDistance.totalDistance))}
            </Typography>
            <Typography variant="h6" color="#999999">
              km
            </Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={8} paddingTop="25px">
          {isLoading ? (
            <DefaultBarChart />
          ) : (
            <>
              <Chart {...mileageChartData} />
            </>
          )}
        </Grid>
        <StyledSubBox>
          <Typography variant="h4">💡</Typography>
          <Typography variant="subtitle2">
            {`지난주보다 ${formatNumber(
              totalOperDistance.totalDistance -
                totalOperDistance.lastTotalDistance
            )}km 더 운행했습니다.`}
          </Typography>
        </StyledSubBox>
      </Grid>
    </>
  );
};

MileageChart.propTypes = {
  isLoading: PropTypes.bool
};

export default MileageChart;

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
