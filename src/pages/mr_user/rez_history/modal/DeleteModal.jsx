import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import styled from '@emotion/styled';

import RentangleBtn from '../../../../components/common/RectangleBtn';

const DeleteModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ padding: '20px ' }}>
          <DialogTitle id="alert-dialog-title">회의실 예약 취소</DialogTitle>
          <DialogContent sx={{ padding: '' }}>
            <DialogContentText id="alert-dialog-description">
              회의실 예약을 취소 하시겠습니까?
              <br />
              예약 취소 시 참석자에게 알림이 전송됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box sx={{ width: '110px' }}>
              <RentangleBtn
                handlebtn={handleClose}
                text={'닫기'}
                category={'cancel'}
                sx={{ padding: '10px 8px' }}
              />
            </Box>
            <Box sx={{ width: '110px' }}>
              <RentangleBtn
                handlebtn={handleConfirm}
                text={'예약 취소'}
                category={'delete'}
                sx={{ padding: '10px 8px' }}
              />
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default DeleteModal;

const StyledWarningIcon = styled(ReportIcon)(({ theme }) => ({
  color: 'red'
}));
