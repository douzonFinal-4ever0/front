import { Box } from '@mui/system';
import Chart from 'react-apexcharts';

const RezStatusChart = ({ series, labels }) => {
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
      colors: ['#9e9e9e', '#d32f2f', '#ffc107', '#1769aa', '#2e7d32'],
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
    <Box
      className="donut"
      // sx={{ '& .apexcharts-legend': { marginTop: '20px' } }}
    >
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width="100%"
      />
    </Box>
  );
};

export default RezStatusChart;
