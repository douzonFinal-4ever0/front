import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import MrInfoSection from '../../rez/section/MrInfoSection';
import RezSection from '../../rez/section/RezSection';
import { useState } from 'react';
import RezInfo from '../../rez_confirm/section/RezInfo';

const RezDetailModal = ({ open, handleModal, data, isModify }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);

  console.log(data);
  const handleCancelBtn = () => {
    handleModal();
  };

  const handleConfirmBtn = () => {};
  return (
    <Dialog
      open={open}
      onClose={handleCancelBtn}
      fullWidth={true}
      maxWidth={'md'}
      // sx={{ height: '850px' }}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">회의실 예약 정보</Typography>
        </DialogTitle>
        <IconButton
          onClick={handleModal}
          aria-label="close"
          sx={{ padding: '24px' }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <MrInfoSection data={data.mr} />
          </Grid>
          <Grid item xs={6} sx={{ width: '100%' }}>
            {isModify ? (
              <RezSection data={data.mr} isReadOnly={isReadOnly} />
            ) : (
              <RezInfo
                mr_name={data.mr && data.mr.mr_name}
                location={data.mr && data.mr.location}
                rez_date={data && data.rez_start_time}
                rez_start_time={data && data.rez_start_time}
                rez_end_time={data && data.rez_end_time}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ paddingBottom: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',

            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex', gap: '10px', width: '300px' }}>
            <RectangleBtn
              type={'button'}
              text={'취소'}
              category={'cancel'}
              sx={{ padding: '10px 8px' }}
              handlebtn={handleCancelBtn}
            />
            <RectangleBtn
              type={'button'}
              text={'확인'}
              category={'register'}
              sx={{ padding: '10px 8px' }}
              handlebtn={handleConfirmBtn}
            />
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RezDetailModal;
