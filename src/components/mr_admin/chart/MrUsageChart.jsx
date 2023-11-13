import ReactEcharts from 'echarts-for-react';
import React from 'react';

const MrUsageChart = ({ width, height }) => {
  // 그래프 데이터 설정
  const option = {
    title: {
      text: '회의실 사용률',
      left: 'center'
    },
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
        // label: {
        //   show: false,
        //   position: 'center'
        // },
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
          // label: {
          //   show: false,
          //   fontSize: 40,
          //   fontWeight: 'bold'
          // }
        },
        // labelLine: {
        //   show: true
        // },
        data: [
          { value: 24, name: '사용 ' },
          { value: 7, name: '미사용 ' }
          // {
          //   value: 24 + 7,
          //   itemStyle: {
          //     // stop the chart from rendering this piece
          //     color: 'none',
          //     decal: {
          //       symbol: 'none'
          //     }
          //   }
          // }
        ]
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
