import { useState } from 'react';
import Toggle from '../../components/common/Toggle';
import Modal from '../../components/common/Modal';
import { Box, Button, Typography } from '@mui/material';
import Searchbar from '../../components/common/Searchbar';

// 모달창 콘텐츠 예시
const ModalContentExample = () => {
  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica Lizards are a
        widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica Lizards are a widespread group
        of squamate reptiles, with over 6,000 species, ranging across all
        continents except Antarctica Lizards are a widespread group of squamate
        reptiles, with over 6,000 species, ranging across all continents except
        Antarctica Lizards are a widespread group of squamate reptiles, with
        over 6,000 species, ranging across all continents except Antarctica
      </Typography>
    </Box>
  );
};

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

const Dashboard = () => {
  // 토글 ------------------------------------------------------
  // 선택된 토글 버튼 값
  const [selectBtn, setSeletBtn] = useState('calender');
  // 토글 버튼 이벤트
  const handleToggleBtn = (event) => {
    setSeletBtn(event.currentTarget.value);
  };
  // 토글버튼 데이터
  const data = [
    {
      index: 0,
      value: 'calender',
      name: '캘린더'
    },
    {
      index: 1,
      value: 'map',
      name: '지도'
    },
    {
      index: 2,
      value: 'table',
      name: '테이블'
    }
  ];

  // 모달창------------------------------------------------------
  // 모달창 열림 여부 값
  const [open, setOpen] = useState(false);
  // 모달창 열림닫힘 이벤트
  const handleModal = () => setOpen(!open);

  // 검색창------------------------------------------------------
  const [value, setValue] = useState(null);
  // 검색창 입력 이벤트
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  // 검색 클릭 이벤트
  const handleSearchBtn = (e) => {
    e.preventDefault();
    console.log('asd');
  };

  return (
    <>
      {/* 토글버튼 예시 */}
      <Toggle
        data={data}
        selectBtn={selectBtn}
        handleToggleBtn={handleToggleBtn}
      />

      {/* 모달창 예시 (*모달창 크기는 content 컴포넌트에서 지정!!!)*/}
      <Button onClick={handleModal}>Open modal</Button>
      <Modal
        open={open}
        handleModal={handleModal}
        modalTitle={'모달 타이틀'}
        content={<ModalContentExample />}
        buttons={<ModalActionBtns />}
      />

      {/* 검색창 예시 (*검색창 크기는 겉에 감싸는 태그 width만큼 !!!)*/}
      <Box sx={{ width: '300px' }}>
        <Searchbar />
      </Box>
    </>
  );
};

export default Dashboard;
