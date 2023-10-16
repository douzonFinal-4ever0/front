import React from 'react';
import { useState } from 'react';
import { Paper, styled, Box, Button } from '@mui/material';
import Calendar from '../../components/common/Calendar';
import SubSidebar from '../../components/common/SubSidebar';
import SubHeader from '../../components/common/SubHeader';
import Modal from '../../components/common/Modal';
import MrRegistForm from '../../components/mr_admin/MrRegistForm';

const ModalContentExample = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <MrRegistForm />
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
            content={<ModalContentExample />}
            buttons={<ModalActionBtns />}
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

const ModalActionBtns = () => {
  const handleBtn = () => {
    console.log('clicked');
  };

  return (
    <Box>
      <Button color="primary" onClick={handleBtn}>
        Save
      </Button>
      <Button color="secondary" onClick={handleBtn}>
        Cancel
      </Button>
    </Box>
  );
};
