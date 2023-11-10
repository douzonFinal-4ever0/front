import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrContrastChart = ({ width, height }) => {
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
        data: ['2023-10-30', '2023-10-31', '2023-11-01', '2023-11-02', '2023-11-03']
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
        data: ['2023-11-06', '2023-11-07', '2023-11-08', '2023-11-09', '2023-11-10']
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
        data: [2, 7, 5, 9, 7]
      },
      {
        name: '이번 주',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [11, 15, 17, 52, 25]
      }
    ]
  };
  return (
    <ReactEcharts option={option} style={{ height: height, width: width }} />
  );
};

export default MrContrastChart;
