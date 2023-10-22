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
import MrTag from '../../components/mr_admin/MrTag';
import SubHeader from '../../components/common/SubHeader';
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
import EditIcon from '@mui/icons-material/Edit';
import ImageUpload from '../../components/mr_admin/ImageUpload';
const DashBoard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const events = [
    {
      resourceId: 'a', // 리소스 ID (resources 배열에 정의한 ID와 일치해야 함)
      title: '이벤트 1',
      start: '2023-10-19T09:00:00',
      end: '2023-10-19T11:00:00'
    },
    {
      resourceId: 'b',
      title: '이벤트 2',
      start: '2023-10-19T19:00:00',
      end: '2023-10-19T21:00:00'
    }
    // 추가 이벤트들
  ];
  const resources = [
    { id: 'a', title: 'Room A' },
    { id: 'b', title: 'Room B' },
    { id: 'c', title: 'Room C' },
    { id: 'd', title: 'Room D' }
  ];
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Container sx={{ width: 'auto' }}>
              <SpeedDial
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
              </SpeedDial>
              <TimeLineCalendar events={events} resources={resources} />
              <ImageUpload />
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
