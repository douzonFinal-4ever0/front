import React, { useEffect } from 'react';
import SubHeader from '../../components/common/SubHeader';
import { Box } from '@mui/system';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { Button, Container, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import DataGrid from '../../components/common/DataGrid';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../../components/common/RectangleBtn';
const MrNoticeList = () => {
  const navigate = useNavigate();
  const handleWriteNotice = () => {
    navigate('../Notice');
  };
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    axiosInstance.get('http://localhost:8081/mr/notice').then((res) => {
      const processedData = res.data.map((item) => ({
        ...item,
        id: item.notice_code
      }));
      setNoticeList(processedData);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <SubHeader title={'공지사항 조회'} />
      <Box sx={{ display: 'flex' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Container sx={{ width: 'auto' }}>
              <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                  columns={columns}
                  rows={noticeList}
                  pageSize={10}
                  pageSizeOptions={[5, 10]}
                  //   disableRow={false}
                />
              </div>
              <RectangleBtn
                category={'register'}
                type={'submit'}
                text={'공지사항 작성'}
                sx={{
                  padding: '14px 12px'
                }}
                handlebtn={handleWriteNotice}
              />
            </Container>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrNoticeList;

// DataGrid 시작
const columns = [
  { field: 'notice_code', headerName: '번호', width: 170 },
  { field: 'notice_title', headerName: '제목', width: 600 },
  {
    field: 'updated_at',
    headerName: '작성일',
    width: 300
  }
];
