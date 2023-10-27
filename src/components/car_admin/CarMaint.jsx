import { Button, Grid, Modal, Typography } from '@mui/material';
import CarMaintTable from './CarMaintTable';
import { Box } from '@mui/system';
import RectangleIcon from '@mui/icons-material/Rectangle';
import RectangleBtn from '../common/RectangleBtn';
import CarMaintRegister from './CarMaintRegister';
import { useState } from 'react';
import { palette } from '../../theme/palette';
import axiosInstance from '../../utils/axios';

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

const CarMaint = ({ carCode }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const maintCtnClick = () => {
    handleOpen();
  };

  const [maintData, setMaintData] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);

  const handleCompleteBtn = () => {
    // console.log(checkedRow.map((row) => row.id));

    // 오늘 날짜 가져오기
    const today = new Date();
    // 비교할 대상 날짜 파싱
    const hasFutureDate = checkedRow.some((data) => {
      const maintStartDate = new Date(data.maint_start_at);
      if (maintStartDate > today) {
        alert('정비 시작일자가 당일 이후입니다.');
        return true; // 조건을 만족하면 true 반환
      }
      return false;
    });

    if (hasFutureDate) {
      return; // 조건을 만족하는 경우 함수 종료
    }

    const maintModify = {
      maint_codes: checkedRow.map((row) => row.id),
      car_code: carCode
    };

    console.log(maintModify);

    axiosInstance
      .post(`/manager/car/maintCarStatusModify`, maintModify)
      .then((res) => {
        // 여기서 maintData 값을 변경
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteBtn = () => {
    console.log(checkedRow);
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
          carCode={carCode}
          style={style}
          maintData={maintData}
          setMaintData={setMaintData}
          handleModalClose={handleClose}
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
        <Box display="flex" width="40%">
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
          <Grid
            container
            display="flex"
            spacing={2}
            width="60%"
            marginLeft="40px"
            alignItems="flex-end"
          >
            <Grid item xs={5}>
              <Button
                variant="outlined"
                sx={{
                  height: '30px',
                  color: '#2e7d32',
                  borderColor: '#2e7d32',
                  borderRadius: '6px !important',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    borderColor: '#2e7d32'
                  }
                }}
                onClick={handleCompleteBtn}
              >
                선택 완료
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                variant="outlined"
                sx={{
                  height: '30px',
                  color: '#d32f2f',
                  borderColor: '#d32f2f',
                  borderRadius: '6px !important',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    borderColor: '#d32f2f'
                  }
                }}
                onClick={handleDeleteBtn}
              >
                선택 삭제
              </Button>
            </Grid>
          </Grid>
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
      <CarMaintTable
        maintData={maintData}
        setMaintData={setMaintData}
        carCode={carCode}
        setCheckedRow={setCheckedRow}
      />
    </>
  );
};

export default CarMaint;
