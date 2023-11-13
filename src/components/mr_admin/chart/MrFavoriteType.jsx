import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrFavoriteType = ({ width, height, data }) => {
  const option = {
    // title: {
    //   text: '회의실 유형',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'top',
      left: 'right',
      orient: 'vertical'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        // avoidLabelOverlap: false,
        label: {
          show: true,
          formatter(param) {
            // correct the percentage
            return param.name + ' (' + param.percent.toFixed(1) + '%)';
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        // labelLine: {
        //   show: false
        // },
        data: data
      }
    ]
  };
  return (
    <ReactEcharts option={option} style={{ height: height, width: width }} />
  );
};

export default MrFavoriteType;
