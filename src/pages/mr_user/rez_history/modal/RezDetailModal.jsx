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
import { useEffect } from 'react';
import axiosInstance from '../../../../utils/axios';
import { palette } from '../../../../theme/palette';

const RezDetailModal = ({ open, handleModal, data, isModify }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);

  // useEffect(() => {
  //   // 예약자 정보 가져오기
  //   const getMemAllApi = async () => {
  //     try {
  //       const res = await axiosInstance.axiosInstance.get('/mr/mem');
  //       if (res.status !== 200) return;
  //       const findMem = res.data.filter(
  //         (mem) => mem.mem_code === data.mem_code
  //       );
  //       setMaster(findMem);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getMemAllApi();
  // }, []);

  const handleCancelBtn = () => {
    handleModal();
  };

  const detailInfo = {
    m_name: data && data.m_name,
    mr_name: data.mr && data.mr.mr_name,
    location: data.mr && data.mr.location,
    rez_date: data && data.rez_start_time,
    rez_start_time: data && data.rez_start_time,
    rez_end_time: data && data.rez_end_time,
    master: data && data.master,
    created_at: data && data.created_at,
    pt_list: data && data.mr_pt_list
  };

  const handleConfirmBtn = () => {};
  return (
    <Dialog
      open={open}
      onClose={handleCancelBtn}
      fullWidth={true}
      maxWidth={'md'}
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

      <DialogContent
        sx={{
          overflowY: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: palette.grey['500'],
            borderRadius: '10px'
          },
          '&::-webkit-scrollbar': {
            width: '10px',
            backgroundColor: '#eee',
            borderRadius: '10px'
          }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <MrInfoSection data={data.mr} />
          </Grid>
          <Grid item xs={6} sx={{ width: '100%' }}>
            {isModify ? (
              <RezSection data={data.mr} isReadOnly={isReadOnly} />
            ) : (
              <RezInfo data={detailInfo} />
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
              text={data.role === '예약자' ? '취소' : '확인'}
              category={'cancel'}
              sx={{ padding: '10px 8px' }}
              handlebtn={handleCancelBtn}
            />
            {data.role === '예약자' ? (
              <RectangleBtn
                type={'button'}
                text={'수정'}
                category={'register'}
                sx={{ padding: '10px 8px' }}
                handlebtn={handleConfirmBtn}
              />
            ) : null}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RezDetailModal;
