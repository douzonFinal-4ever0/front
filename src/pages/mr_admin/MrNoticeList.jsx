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
import MrNoticeDeatails from './MrNoticeDeatails';
import MainContainer2 from '../../components/mr_admin/MainContainer2';
const MrNoticeList = () => {
  /*-------------------------------------url 이동---------------------------------------------------*/
  const navigate = useNavigate();
  const handleWriteNotice = () => {
    navigate('../Notice');
  };
  /*-----------------------------------공지사항 가져오기------------------------------------------------------ */
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    axiosInstance.get('/mr/notice').then((res) => {
      const processedData = res.data.map((item) => ({
        ...item,
        id: item.notice_code
      }));
      setNoticeList(processedData);
      // console.log(res.data);
    });
  }, []);
  /*---------------------------상세 내용으로 이동-------------------------------------------------- */
  const handleClickEvent = (params) => {
    const notice_code = params.row.notice_code;
    axiosInstance.get(`/mr/notice/${notice_code}`).then((res) => {
      navigate(`../NoticeDetail/${notice_code}`);
    });
  };

  return (
    <>
      <SubHeader title={'공지사항 조회'} />
      <Box sx={{ display: 'flex' }}>
        <MainContainer2>
          <WrapContainer bgcolor={'#fff'}>
            <Container sx={{ width: 'auto' }}>
              <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                  columns={columns}
                  rows={noticeList}
                  pageSize={10}
                  pageSizeOptions={[5, 10]}
                  //   disableRow={false}
                  clickEvent={handleClickEvent}
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
        </MainContainer2>
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
