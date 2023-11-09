import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrMostTimeChart = ({ width, height }) => {
  // 그래프 데이터 설정
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [
        '9시',
        '9시 30분',
        '10시',
        '10시 30분',
        '11시',
        '11시 30분',
        '12시',
        '12시 30분',
        '13시',
        '13시 30분',
        '14시',
        '14시 30분',
        '15시',
        '15시 30분',
        '16시',
        '16시 30분',
        '17시',
        '17시 30분',
        '18시',
        '18시 30분',
        '19시',
        '19시 30분',
        '20시',
        '20시 30분',
        '21시'
      ],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          16, 0, 2, 0, 3, 0, 0, 1, 3, 0, 2, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
          0, 0
        ],
        type: 'bar',
        barWidth: '50%',
        name: '건 수'
      }
    ]
  };

  return (
    <div>
      <ReactEcharts option={option} style={{ height: height, width: width }} />
    </div>
  );
};

export default MrMostTimeChart;
