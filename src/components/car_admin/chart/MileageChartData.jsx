// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const mileageChartData = {
  height: 300,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 300,
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
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN']
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Investment',
      data: [35, 125, 35, 35, 35, 80, 35]
    },
    {
      name: 'Loss',
      data: [35, 15, 15, 35, 65, 40, 80]
    },
    {
      name: 'Profit',
      data: [35, 145, 35, 35, 20, 105, 100]
    },
    {
      name: 'Maintenance',
      data: [0, 0, 75, 0, 0, 115, 0]
    }
  ]
};
export default mileageChartData;
