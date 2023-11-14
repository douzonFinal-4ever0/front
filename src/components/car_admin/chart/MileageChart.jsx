import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { palette } from '../../../theme/palette';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

import MileageChartData from './MileageChartData';

// project imports
// import { gridSpacing } from 'store/constant';

// chart data
import mileageChartData from './MileageChartData';
import DefaultBarChart from './DefaultBarChart';

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

const MileageChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const { primary } = palette.text;

  const darkLight = palette.mode.dark.light;
  const grey200 = palette.grey[200];
  const grey500 = palette.grey[500];

  const primary200 = palette.primary[200];
  const primaryDark = palette.primary.dark;
  const secondaryMain = palette.secondary.main;
  const secondaryLight = palette.secondary.light;

  useEffect(() => {
    const newChartData = {
      ...mileageChartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
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
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [
    'light',
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

  return (
    <>
      {isLoading ? (
        <DefaultBarChart />
      ) : (
        <>
          <Chart {...mileageChartData} />
        </>
      )}
    </>
  );
};

MileageChart.propTypes = {
  isLoading: PropTypes.bool
};

export default MileageChart;
