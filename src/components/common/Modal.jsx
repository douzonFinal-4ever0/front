import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = (props) => {
  const { open, handleModal, modalTitle, content, buttons } = props;

  return (
    <Dialog
      open={open}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <IconButton
          onClick={handleModal}
          aria-label="close"
          sx={{ padding: '24px' }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{buttons}</DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  buttons: PropTypes.node
};

export default Modal;
