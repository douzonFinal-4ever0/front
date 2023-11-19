import ApexCharts from 'react-apexcharts';

const MrTimeChart = ({ smResult, mdResult, lgResult, mtResult }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 'bold'
            }
          }
        }
      }
    },
    legend: {
      position: 'bottom', // 우측에 위치
      offsetY: 0,
      fontSize: '14px', // 레전드 폰트 크기 조절
      fontWeight: 'bold', // 레전드 폰트 굵기 조절
      itemMargin: {
        horizontal: 20, // 레전드 간 수평 간격 조절
        vertical: 5 // 레전드 간 수직 간격 조절
      },
      markers: {
        colors: ['#FF5733', '#FFC300', '#33FF57', '#3357FF'] // 각 레전드 항목의 마커 색상 변경
      }
    },
    xaxis: {
      categories: slots,
      labels: {
        rotate: -45,
        style: {
          fontSize: '16px', // 글꼴 크기
          colors: '#333' // 글꼴 색상
        }
      }
    }
  };

  const series = [
    {
      name: '소회의실',
      data: smResult.map((i) => i.rez_cnt)
    },
    {
      name: '중회의실',
      data: mdResult.map((i) => i.rez_cnt)
    },
    {
      name: '대회의실',
      data: lgResult.map((i) => i.rez_cnt)
    },
    {
      name: '미팅룸',
      data: mtResult.map((i) => i.rez_cnt)
    }
  ];

  return (
    <ApexCharts
      options={options}
      series={series}
      type="bar"
      height={300}
      width={800}
    />
  );
};

export default MrTimeChart;

const slots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00'
];
