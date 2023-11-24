import { useEffect, useState } from 'react';

// third-party
// import ApexCharts from 'apexcharts';
// import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mui/system';
import { Typography, styled } from '@mui/material';
import axiosInstance from '../../../utils/axios';
import { formatNumber } from '../../../utils/formatNumber';

const ExpenditurePatternChart = ({ searchData }) => {
  const [expenditurePattern, setExpenditurePattern] = useState([]);
  const [chartData, setChartData] = useState({
    parkingCost: [],
    tollCost: [],
    fuelCost: []
  });
  const [diff, setDiff] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance.axiosInstance
      .post('/manager/car/getExpenditurePattern', searchData)
      .then((res) => {
        const daysOfWeek = [1, 2, 3, 4, 5, 6, 7]; // 1~5까지의 요일 값

        const processedData = daysOfWeek.map((day) => {
          // 받아온 데이터에서 현재 요일을 찾음
          const foundDay = res.data.find((item) => item.day_of_week === day);

          // 요일이 존재하지 않으면 새로운 객체를 생성하고 값을 0으로 초기화
          if (!foundDay) {
            return {
              day_of_week: day,
              expenditureDTOS: []
            };
          }

          // 요일이 존재하면 기존 객체 반환
          return foundDay;
        });

        processedData.sort((a, b) => a.day_of_week - b.day_of_week);
        setExpenditurePattern(processedData);
        console.log(processedData);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosInstance.axiosInstance
      .post('/manager/car/getExpenditureDiff', searchData)
      .then((res) => {
        setDiff(parseInt(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchData]);

  useEffect(() => {
    const result = expenditurePattern.map((day) => {
      const parkingCost =
        day.expenditureDTOS.find((item) => item.ac_detail === '주차비')?.cost ||
        0;
      const tollCost =
        day.expenditureDTOS.find((item) => item.ac_detail === '통행료')?.cost ||
        0;
      const fuelCost =
        day.expenditureDTOS.find((item) => item.ac_detail === '유류비')?.cost ||
        0;

      return {
        day_of_week: day.day_of_week,
        parkingCost: parkingCost,
        tollCost: tollCost,
        fuelCost: fuelCost
      };
    });
    setChartData({
      parkingCost: result
        .sort((a, b) => a.day_of_week - b.day_of_week)
        .map((item) => {
          return item.parkingCost;
        }),
      fuelCost: result
        .sort((a, b) => a.day_of_week - b.day_of_week)
        .map((item) => {
          return item.fuelCost;
        }),
      tollCost: result
        .sort((a, b) => a.day_of_week - b.day_of_week)
        .map((item) => {
          return item.tollCost;
        })
    });
    setIsLoading(false);
  }, [expenditurePattern]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      events: {
        height: 200,
        type: 'area'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'category',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    tooltip: {
      x: {
        format: 'ddd'
      }
    }
  });

  const mileageChartData = {
    series: [
      {
        name: '통행료',
        data: chartData.tollCost
      },
      {
        name: '주차비',
        data: chartData.parkingCost
      },
      {
        name: '유류비',
        data: chartData.fuelCost
      }
    ]
  };

  return (
    <>
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
        <Typography variant="h6">지출 패턴</Typography>
      </Box>
      <Box width="90%" margin="auto">
        {!isLoading && (
          <ReactApexChart
            options={chartOptions}
            series={mileageChartData.series}
            type="area"
            height={200}
          />
        )}
      </Box>
      <StyledSubBox>
        <Typography variant="h4">💡</Typography>
        <Typography variant="subtitle2">
          {diff > 0
            ? `지난주 총 지출 금액보다 ${formatNumber(diff)}원 더 사용했습니다.`
            : `지난주 총 지출 금액보다 ${-formatNumber(
                diff
              )}원 적게 사용했습니다.`}
        </Typography>
      </StyledSubBox>
    </>
  );
};

export default ExpenditurePatternChart;

const StyledSubBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  marginTop: 'auto',
  marginRight: '20px',
  marginLeft: '20px',
  paddingBottom: '20px',
  alignItems: 'center'
}));
