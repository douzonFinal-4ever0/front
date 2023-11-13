import ApexCharts from 'react-apexcharts';

// 회의실 사용률 차트
const MrUsageRateChart = () => {
  var options = {
    chart: {
      height: 200,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '16px'
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return 249;
            }
          }
        }
      }
    },
    labels: ['소회의실', '중회의실', '대회의실', '미팅룸']
  };

  return (
    <ApexCharts type="radialBar" options={options} series={[44, 55, 67, 83]} />
  );
};

export default MrUsageRateChart;
