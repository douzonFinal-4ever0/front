import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrFavoriteType = ({ width, height }) => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 21, name: '소회의실' },
          { value: 3, name: '중회의실' },
          { value: 1, name: '대회의실' },
          { value: 5, name: '미팅룸' }
        ]
      }
    ]
  };
  return (
    <ReactEcharts option={option} style={{ height: height, width: width }} />
  );
};

export default MrFavoriteType;
