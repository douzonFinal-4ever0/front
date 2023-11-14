import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrRezTimeChart = ({ height, width, data }) => {
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
        '6시간',
        '6시간 30분',
        '7시간',
        '7시간 30분',
        '8시간',
        '8시간 30분',
        '9시간'
      ],
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0, // 모든 레이블을 표시하도록 설정
        rotate: 45 // 레이블을 45도로 회전
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'bar',
        barWidth: '60%',
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
