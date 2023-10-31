import { Backdrop, CircularProgress, Modal } from '@mui/material';

const LoadingModal = ({ open }) => {
  return (
    <Modal
      open={open}
      BackdropComponent={Backdrop}
      BackdropProps={{
        invisible: true // 배경 눈에 보이지 않도록
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress color="primary" />
    </Modal>
  );
};
export default LoadingModal;
