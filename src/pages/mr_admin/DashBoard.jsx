import * as React from 'react';

import {
  Backdrop,
  Button,
  Checkbox,
  Container,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled
} from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import axios from 'axios';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { useEffect } from 'react';
import CommonTable from '../../components/car_admin/CarInfoTable';
import DataGrid from '../../components/common/DataGrid';
import TimeLineCalendar from '../../components/mr_admin/TimeLineCalendar';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Login from '../user/Login';
import axiosInstance from '../../utils/axios.js';
const DashBoard = () => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const [mem_code, setMem_code] = useState('MEM003');
  // const [password, setPassword] = useState('1234');
  // const [jwt, setJwt] = useState('');
  //
  // const FormToData = {
  //   mem_code,
  //   password
  // };
  //로그인 테스트
  // const handleTest = () => {
  //   axiosInstance
  //     .post('http://localhost:8081/api/v1/user/login', FormToData)
  //     .then((res) => {
  //       setJwt('Bearer ' + res.data.token);
  //     });
  // };
  // JWT 토큰을 localStorage에 저장
  // localStorage.setItem('jwtToken', jwt);

  // JWT 토큰을 localStorage에서 가져오기
  // const storedJwtToken = localStorage.getItem('jwtToken');

  // // 가져온 토큰을 사용하여 API 요청을 보낼 수 있음
  // if (storedJwtToken) {
  //   // API 요청 헤더에 JWT 토큰을 추가
  //   const headers = {
  //     Authorization: `Bearer ${storedJwtToken}`
  //   };

  //   // 실제 API 요청을 보내는 부분
  //   // axios 또는 fetch 등을 사용하여 요청을 보낼 수 있음
  // }
  // console.log(FormToData);
  // const events = [
  //   {
  //     resourceId: 'a', // 리소스 ID (resources 배열에 정의한 ID와 일치해야 함)
  //     title: '이벤트 1',
  //     start: '2023-10-19T09:00:00',
  //     end: '2023-10-19T11:00:00'
  //   },
  //   {
  //     resourceId: 'b',
  //     title: '이벤트 2',
  //     start: '2023-10-19T19:00:00',
  //     end: '2023-10-19T21:00:00'
  //   }
  //   // 추가 이벤트들
  // ];
  // const resources = [
  //   { id: 'a', title: 'Room A' },
  //   { id: 'b', title: 'Room B' },
  //   { id: 'c', title: 'Room C' },
  //   { id: 'd', title: 'Room D' }
  // ];
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Container sx={{ width: 'auto' }}>
              {/* 이미지 리스트 */}
              {/* <img src="https://heejinawsbucket1.s3.ap-northeast-2.amazonaws.com/25942229-e8e1-41ed-9fd1-98168eb36e7e-d1.jpg"></img> */}
              {/* 스피드 다이얼 테스트 */}
              {/* <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={handleClose}
                  />
                ))}
              </SpeedDial> */}
              {/* 자원 캘린더 */}
              {/* <TimeLineCalendar events={events} resources={resources} /> */}
              {/* 이미지 업로드 */}
              {/* <ImageUpload /> */}
              {/* <Login /> */}
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
const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' }
];
