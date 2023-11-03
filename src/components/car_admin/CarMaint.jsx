import { Button, Grid, Modal, Popover, Slide, Typography } from '@mui/material';
import CarMaintTable from './CarMaintTable';
import { Box } from '@mui/system';
import RectangleIcon from '@mui/icons-material/Rectangle';
import RectangleBtn from '../common/RectangleBtn';
import CarMaintRegister from './CarMaintRegister';
import { useState, forwardRef } from 'react';
import { palette } from '../../theme/palette';
import axiosInstance from '../../utils/axios';
import CarDeleteModal from './CarDeleteModal';
import CarCurrentMaint from './CarCurrentMaint';
import { useDispatch } from 'react-redux';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';

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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CarMaint = ({ carCode, accum_mileage }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const maintCtnClick = () => {
    handleOpen();
  };

  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  // snackbar 상태 관리 함수 끝

  const [maintData, setMaintData] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);

  const handleCompleteBtn = () => {
    // console.log(checkedRow.map((row) => row.id));
    if (checkedRow.length === 0) {
      handleSetSnackbarContent('선택된 값이 존재하지 않습니다.');
      handleOpenSnackbar();
      return;
    }

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

    console.log(maintData);
    console.log(checkedRow);

    let updatedMaintData = [...maintData];

    axiosInstance
      .post(`/manager/car/maintCarStatusModify`, maintModify)
      .then((res) => {
        checkedRow.forEach((rowToCheck) => {
          updatedMaintData.forEach((item) => {
            // 'id'와 'maint_code'가 일치하면
            if (item.maint_code === rowToCheck.id) {
              // 'maint_start_at' 값을 오늘 날짜로 설정합니다.
              item.maint_end_at = today.toLocaleDateString();
            }
          });
        });

        setMaintData(updatedMaintData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 삭제 알림창 변수
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  // const [isDelete, setIsDelete] = useState(false);

  const handleDeleteBtn = () => {
    if (checkedRow.length === 0) {
      handleSetSnackbarContent('선택된 값이 존재하지 않습니다.');
      handleOpenSnackbar();
      return;
    }
    // 삭제 알림창 띄우기
    handleDeleteModalOpen();
  };

  // 정비 삭제 버튼 시 함수
  const handleDeleteConfirm = () => {
    const maintDelete = {
      maint_codes: checkedRow.map((row) => row.id),
      car_code: carCode
    };

    axiosInstance
      .post(`/manager/car/maintRecordDelete`, maintDelete)
      .then((res) => {
        const updatedMaintData = maintData.filter((data) => {
          return !maintDelete.maint_codes.includes(data.maint_code);
        });
        setMaintData(updatedMaintData);
      })
      .catch((error) => {
        console.log(error);
      });

    handleDeleteModalClose();
  };

  // 정비 현황 관련 popover 변수 및 함수
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCurrentMaintClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCurrentMaintClose = () => {
    setAnchorEl(null);
  };

  const currentMaintopen = Boolean(anchorEl);
  const id = currentMaintopen ? 'simple-popover' : undefined;

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
          mileage={accum_mileage}
        />
      </Modal>
      <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
        <CarDeleteModal
          style={style}
          handleDeleteModalClose={handleDeleteModalClose}
          handleDeleteBtn={handleDeleteConfirm}
          title={'정비 삭제'}
        >
          정말로 선택한 정비를 삭제하시겠습니까?
          <br />
          삭제시, 해당 정비의 데이터가 모두 삭제되며,
          <br />
          더이상 복구할 수 없습니다.
        </CarDeleteModal>
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
            handlebtn={handleCurrentMaintClick}
          />
          <Popover
            id={id}
            open={currentMaintopen}
            anchorEl={anchorEl}
            onClose={handleCurrentMaintClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <CarCurrentMaint carCode={carCode} />
          </Popover>
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
