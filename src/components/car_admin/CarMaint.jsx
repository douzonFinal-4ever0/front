import { Button, Grid, Modal, Typography } from '@mui/material';
import CarMaintTable from './CarMaintTable';
import { Box } from '@mui/system';
import RectangleIcon from '@mui/icons-material/Rectangle';
import RectangleBtn from '../common/RectangleBtn';
import CarMaintRegister from './CarMaintRegister';
import { useState } from 'react';
import { palette } from '../../theme/palette';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: palette.grey['50'],
  // border: '2px solid #000',
  boxShadow: 24
};

const CarMaint = ({
  setTabData,
  carCode,
  carListInfo,
  setCarListInfo,
  carCounts,
  setCarCounts
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const maintCtnClick = () => {
    // setTabData([
    //   {
    //     title: '정비 등록',
    //     content: (
    //       <CarMaintRegister
    // setTabData={setTabData}
    // carCode={carCode}
    // carListInfo={carListInfo}
    // setCarListInfo={setCarListInfo}
    // carCounts={carCounts}
    // setCarCounts={setCarCounts}
    //       />
    //     )
    //   }
    // ]);
    handleOpen();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CarMaintRegister
          setTabData={setTabData}
          carCode={carCode}
          carListInfo={carListInfo}
          setCarListInfo={setCarListInfo}
          carCounts={carCounts}
          setCarCounts={setCarCounts}
          style={style}
        />
      </Modal>
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
      <CarMaintTable carCode={carCode} />
    </>
  );
};

export default CarMaint;
