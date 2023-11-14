import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrContrastChart = ({
  width,
  height,
  currentWeekDates,
  lastWeekDates,
  lastWeekCntData,
  currentWeekCntData
}) => {
  const colors = ['#7cb342', '#2196f3'];
  const option = {
    color: colors,
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: { top: 'bottom', left: 'center' },
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: [
      {
        type: 'category',
        // axisTick: {
        //   alignWithLabel: true
        // },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                params.value +
                (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '')
              );
            }
          }
        },
        // prettier-ignore
        data: currentWeekDates
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                params.value +
                (params.seriesData.length
                  ? '：' + params.seriesData[0].data
                  : '')
              );
            }
          }
        },
        // prettier-ignore
        data: lastWeekDates
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '저번 주',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: lastWeekCntData
      },
      {
        name: '이번 주',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: currentWeekCntData
      }
    ]
  };
  return (
    <ReactEcharts option={option} style={{ height: height, width: width }} />
  );
};

export default MrContrastChart;
