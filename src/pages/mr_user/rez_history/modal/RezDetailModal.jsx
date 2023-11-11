import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

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

import { getFormattedDate } from '../../../../utils/formatDate';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import { setUserData } from '../../../../redux/reducer/userSlice';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import MrInfoSection from '../../rez/section/MrInfoSection';
import RezSection from '../../rez/section/RezSection';
import RezInfo from '../../rez_confirm/section/RezInfo';
import axiosInstance from '../../../../utils/axios';
import { palette } from '../../../../theme/palette';
import {
  openSanckbar,
  setSnackbarContent
} from '../../../../redux/reducer/SnackbarSlice';
import DeleteModal from './DeleteModal';

const RezDetailModal = ({
  open,
  handleModal,
  data,
  isModify,
  handleModifyMode,
  getMrRezApi
}) => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const userData = useSelector(setUserData).payload.user;
  const [deleteModal, setDeleteModal] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
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

  // 삭제 모달창 취소 이벤트
  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  // 삭세 모달창 삭제 확인 이벤트
  const handleDeleteConfirm = async () => {
    try {
      console.log(data.mr_rez_code);
      const res = await axiosInstance.axiosInstance.delete(
        `/mr/rez?mr_rez_code=${data.mr_rez_code}`
      );

      if (res.status !== 200) return;

      getMrRezApi(); // 페이지 재로드

      // 스낵바
      handleSetSnackbarContent('예약 삭제 되었습니다. ');
      handleOpenSnackbar();

      handleModifyMode();
      handleModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  // 확인 & 취소 버튼 이벤트
  const handleCancelBtn = () => {
    // 수정모드 시
    if (isModify === true) {
      const initialState = {
        mr_code: '', // 회의실 번호
        m_name: '', // 회의명
        m_type: '프로젝트회의', // 회의 종류,
        rez_date: getFormattedDate(), // 예약 날짜(Default: 현재 날짜)
        rez_start_time: '09:00', // 예약 시작 시간
        rez_end_time: '09:30', // 예약 종료 시간
        tot_pt_ctn: '2', // 총 인원수,
        rez_type: '0', // 예약 구분 (0:일반/1:정기)
        mr_pt_list: [] // 회의 참석자 리스트
      };

      dispatch(setRezData({ data: initialState }));
      handleModifyMode();
    }
    handleModal();
  };

  // 수정 버튼 이벤트
  const handleModifyBtn = () => {
    const list = { ...data };
    if (list.length !== 0) {
      list.mr_pt_list.forEach((item) => {
        item.memVO.mem_code = item.mem_code;
      });
    }
    const pts = list.mr_pt_list.map((item) => item.memVO);
    const newData = {
      m_name: data.m_name,
      m_type: data.m_type,
      mr_code: data.mr.mr_code,
      mr_pt_list: pts,
      rez_date: data.rez_start_time.substring(0, 10),
      rez_start_time: data.rez_start_time.substring(11, 16),
      rez_end_time: data.rez_end_time.substring(11, 16),
      rez_type: `${data.rez_type}`,
      tot_pt_ctn: `${data.mr_pt_list.length}`
    };

    dispatch(setRezData({ data: newData }));
    handleModifyMode();
  };

  // 수정 완료 버튼 이벤트
  const handleSaveBtn = () => {
    try {
      const updateRezApi = async () => {
        const newData = {
          ...rezData,
          mem_code: userData.mem_code,
          mr_rez_code: data.mr_rez_code
        };

        console.log('newData', newData);
        const res = await axiosInstance.axiosInstance.put('/mr/rez', newData);
        if (res.status !== 200) return;

        // 리덕스 리셋
        const initialState = {
          mr_code: '', // 회의실 번호
          m_name: '', // 회의명
          m_type: '프로젝트회의', // 회의 종류,
          rez_date: getFormattedDate(), // 예약 날짜(Default: 현재 날짜)
          rez_start_time: '09:00', // 예약 시작 시간
          rez_end_time: '09:30', // 예약 종료 시간
          tot_pt_ctn: '2', // 총 인원수,
          rez_type: '0', // 예약 구분 (0:일반/1:정기)
          mr_pt_list: [] // 회의 참석자 리스트
        };

        dispatch(setRezData({ data: initialState }));
        getMrRezApi(); // 페이지 재로드

        // 스낵바
        handleSetSnackbarContent('예약 수정 완료되었습니다. ');
        handleOpenSnackbar();

        handleModifyMode();
        handleModal();
      };

      updateRezApi();
    } catch (err) {
      console.log(err);
    }
  };

  // 삭제 버튼 이벤트
  const handleDeletBtn = () => {
    setDeleteModal(true);
  };

  return (
    <>
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
            onClick={handleCancelBtn}
            aria-label="close"
            sx={{ padding: '24px' }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <DialogContent
          sx={{
            maxHeight: '561px',
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
                text={data.role === '예약자' ? '삭제' : '확인'}
                category={'cancel'}
                sx={{ padding: '10px 8px' }}
                handlebtn={
                  data.role === '예약자' ? handleDeletBtn : handleCancelBtn
                }
              />
              {data.role === '예약자' ? (
                <RectangleBtn
                  type={'button'}
                  text={isModify ? '완료' : '수정'}
                  category={'register'}
                  sx={{ padding: '10px 8px' }}
                  handlebtn={isModify ? handleSaveBtn : handleModifyBtn}
                />
              ) : null}
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
      <DeleteModal
        open={deleteModal}
        handleClose={handleDeleteModalClose}
        handleConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default RezDetailModal;
