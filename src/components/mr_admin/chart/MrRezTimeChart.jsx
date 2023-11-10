import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrRezTimeChart = ({ height, width }) => {
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
        '30분',
        '1시간',
        '1시간 30분',
        '2시간',
        '2시간 30분',
        '3시간',
        '3시간 30분',
        '4시간',
        '4시간 30분',
        '5시간',
        '5시간 30분',
        '6시간'
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
        data: [8, 4, 2, 14, 0, 2, 0, 0, 0, 1, 0, 0],
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

export default MrRezTimeChart;
