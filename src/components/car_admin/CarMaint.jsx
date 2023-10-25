import { Button, Typography } from '@mui/material';
import CarMaintTable from './CarMaintTable';
import { Box } from '@mui/system';
import RectangleIcon from '@mui/icons-material/Rectangle';
import RectangleBtn from '../common/RectangleBtn';
import CarDetail from './CarDetail';
import CarMaintRegister from './CarMaintRegister';

const CarMaint = ({
  setTabData,
  carCode,
  carListInfo,
  setCarListInfo,
  carCounts,
  setCarCounts
}) => {
  const maintCtnClick = () => {
    setTabData([
      {
        title: '정비 등록',
        content: (
          <CarMaintRegister
            setTabData={setTabData}
            carCode={carCode}
            carListInfo={carListInfo}
            setCarListInfo={setCarListInfo}
            carCounts={carCounts}
            setCarCounts={setCarCounts}
          />
        )
      }
    ]);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        marginTop="15px"
        sx={{
          width: '100%',
          borderBottom: '3px solid black',
          padding: '20px 0px'
        }}
      >
        <Box display="flex">
          <RectangleIcon
            sx={{
              color: 'black',
              marginTop: 'auto',
              marginBottom: 'auto',
              width: '6px',
              height: '6px'
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              marginLeft: '10px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            정비 내역
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" width="260px">
          <RectangleBtn
            text={'정비 등록'}
            sx={{ width: '120px', height: '40px' }}
            category={'register'}
            handlebtn={maintCtnClick}
          />
          <RectangleBtn
            text={'정비 현황'}
            sx={{ width: '120px', height: '40px' }}
            category={'register'}
          />
        </Box>
      </Box>
      <CarMaintTable />
    </>
  );
};

export default CarMaint;
