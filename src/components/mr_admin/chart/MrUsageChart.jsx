import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrUsageChart = ({ width, height, data }) => {
  // 그래프 데이터 설정
  const option = {
    // title: {
    //   text: '회의실 사용률',
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
        label: {
          show: true,
          formatter(param) {
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
        data: data
      }
    ]
  };

  return (
    <div>
      <ReactEcharts option={option} style={{ height: height, width: width }} />
    </div>
  );
};

export default MrUsageChart;
