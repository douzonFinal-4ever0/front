import * as React from 'react';

import { Button, Checkbox, Container, Paper, styled } from '@mui/material';
import { useState } from 'react';
import MrTag from '../../components/mr_admin/MrTag';
import SubHeader from '../../components/common/SubHeader';
import { Box } from '@mui/system';
import axios from 'axios';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { useEffect } from 'react';
import CommonTable from '../../components/car_admin/CarInfoTable';
import DataGrid from '../../components/common/DataGrid';

const DashBoard = () => {
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/mr/notice').then((res) => {
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
      <Box sx={{ display: 'flex' }}>
        <MainContainer>
          <WrapContainer bgColor={'#fff'}>
            <Container sx={{ width: 'auto' }}>
              {/* {noticeList.map((notice) => {
                return (
                  // <>
                  //   <div>공지사항 번호 : {notice.notice_code}</div>
                  //   <div>공지사항 제목 : {notice.notice_title}</div>
                  //   <div>공지사항 업로드일 : {notice.updated_at}</div>
                  //   <div>공지사항 첨부파일 : {notice.notice_file}</div>
                  // </>
                );
              })} */}
              <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                  columns={columns}
                  rows={noticeList}
                  pageSize={10}
                  pageSizeOptions={[5, 10]}
                  disableRow={false}
                />
              </div>
            </Container>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default DashBoard;

// car DataGrid 시작
const columns = [
  { field: 'notice_code', headerName: '번호', width: 170 },
  { field: 'notice_title', headerName: '제목', width: 600 },
  {
    field: 'updated_at',
    headerName: '작성일',
    width: 300
  }
];
