import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import listPlugin from '@fullcalendar/list';
import { useState } from 'react';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import { useDispatch } from 'react-redux';
import Modal from '../common/Modal';
import { Box, IconButton } from '@mui/material';
import SuppliesList from './SuppliesList';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import MrInfoSection from '../../pages/mr_user/rez/section/MrInfoSection';
import axiosInstance from '../../utils/axios.js';

const TimeLineCalendar = ({ events, resources }) => {
  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  const [currentView, setCurrentView] = useState('resourceTimeline');
  // console.log(events[0].title);
  const handleEventClick = (info) => {
    // console.log(info.event.title);
    handleOpenSnackbar();
    handleSetSnackbarContent(info.event.title);
    // dayGridPlugin 페이지로 전환
    setCurrentView('dayGrid');
    /**클릭한 이벤트의 시작 날짜를 가져옴 */
    const eventDate = info.event.start;
    console.log(info.event._def.resourceIds[0]);
    axiosInstance.axiosInstance.get('/mr/mrList').then((res) => {
      console.log(res.data);
    });
    info.view.calendar.gotoDate(eventDate);
  };

  const businessHours = {
    daysOfWeek: [1, 2, 3, 4, 5, 6], // 월~토

    startTime: '9:00', // 시작 시간
    endTime: '22:00' // 종료 시간
  };
  const [open, setOpen] = useState(false);
  /** 모달창 열림닫힘 이벤트*/
  const handleModal = () => setOpen(!open);

  const ModalContentExample = () => {
    return (
      <Box>
        <MrInfoSection data={resources} />
      </Box>
    );
  };

  return (
    <div>
      <IconButton
        component="label"
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleModal}
      >
        <ControlPointOutlinedIcon />
      </IconButton>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          resourceTimelinePlugin,
          resourceTimeGridPlugin,
          listPlugin
        ]}
        initialView={currentView}
        nowIndicator={true}
        businessHours={businessHours}
        events={events}
        eventClick={handleEventClick}
        resourceAreaHeaderContent={'회의실'}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'resourceTimelineDay,listWeek'
          // resourceTimeGridDay,resourceTimelineMonth
        }}
        views={{
          // resourceTimeGridDay: {
          //   buttonText: '회의실'
          // },
          resourceTimelineDay: {
            buttonText: '시간대'
          },
          // resourceTimelineMonth: {
          //   buttonText: '월'
          // },
          listWeek: {
            buttonText: '리스트'
          }
        }}
        resources={resources}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        slotMinTime={businessHours.startTime}
        slotMaxTime={businessHours.endTime} // 11pm
        resourceAreaWidth="15%"
        navLinks="true"
        resourceAreaColumns={[
          {
            field: resources.title,
            width: 150
          }
        ]}
        // eventColor="blue"
      />

      <Modal
        open={open}
        modalTitle={'회의실'}
        handleModal={handleModal}
        content={<ModalContentExample />}
      />
    </div>
  );
};

export default TimeLineCalendar;

// [
//     // 이벤트 데이터를 설정
//     {
//       title: 'title 1',
//       start: '2023-10-19 12:00:00',
//       end: '2023-10-19 14:00:00'
//     },
//     { title: '이벤트 2', date: '2023-10-28' }
//   ]
