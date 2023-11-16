import { useEffect } from 'react';

// third-party
// import ApexCharts from 'apexcharts';
// import Chart from 'react-apexcharts';

// project imports
import chartData from './MileagePatternData';

import { palette } from '../../../theme/palette';
import ReactApexChart from 'react-apexcharts';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
  //   const theme = useTheme();
  //   const customization = useSelector((state) => state.customization);
  //   const { navType } = customization;

  return (
    <>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={200}
      />
    </>
  );
};

export default BajajAreaChartCard;
