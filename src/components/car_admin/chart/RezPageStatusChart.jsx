import { Box } from '@mui/system';
import Chart from 'react-apexcharts';

const RezPageStatusChart = ({ series, labels }) => {
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
      colors: ['#B5C7E3', '#e87676', '#ffc107', '#3884C7', '#BFDAA7'],
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

export default RezPageStatusChart;
