import React from 'react';
import { useState } from 'react';
import { Paper, styled, Box, Button, Typography } from '@mui/material';
import Calendar from '../../components/common/Calendar';
import SubSidebar from '../../components/common/SubSidebar';
import SubHeader from '../../components/common/SubHeader';
import Modal from '../../components/common/Modal';
import MrNotice from './MrNotice';

const ModalContentExample = () => {
  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        몰?루는건가... 그래.. 그런일이 있었지.. 하지만 알려주지 않겠다
      </Typography>
    </Box>
  );
};
const MrRegister = () => {
  // 모달창------------------------------------------------------
  // 모달창 열림 여부 값
  const [open, setOpen] = useState(false);
  // 모달창 열림닫힘 이벤트
  const handleModal = () => setOpen(!open);
  return (
    <Item>
      <SubHeader title={'회의실 등록'} />
      <Box sx={{ display: 'flex' }}>
        <SubSidebar>
          <Button variant="text" onClick={handleModal}>
            회의실 등록
          </Button>
          <Modal
            open={open}
            modalTitle={'회의실 항목'}
            handleModal={handleModal}
            content={<MrNotice />}
          />
        </SubSidebar>
        <Item2>
          <Calendar />
        </Item2>
      </Box>
    </Item>
  );
};

export default MrRegister;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%',
  margin: '1%'
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%',
  margin: '1%'
}));
