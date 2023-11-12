import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MrInfoSection from '../../pages/mr_user/rez/section/MrInfoSection.jsx';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import axiosInstance from '../../utils/axios.js';
import Modal from '../common/Modal.jsx';

const TimeLineCalendar = ({ events, resources }) => {
  const [mrResources, setMrResources] = useState({});
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
    const mr_code = info.event._def.resourceIds[0];
    // console.log(info.event._def.resourceIds[0]);
    axiosInstance.axiosInstance
      .get(`/mr/${mr_code}`)
      .then((res) => {
        // console.log(res.data);
        setMrResources(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
    info.view.calendar.gotoDate(eventDate);
    handleModal();
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
      <Box sx={{ width: '500px' }}>
        <MrInfoSection data={mrResources} />
      </Box>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          resourceTimelinePlugin,
          resourceTimeGridPlugin,
          listPlugin
        ]}
        locale={koLocale} // 한국어 설정
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
          resourceTimeGridDay: {
            buttonText: '회의실'
          },
          resourceTimelineDay: {
            buttonText: '시간대'
          },
          resourceTimelineMonth: {
            buttonText: '월'
          },
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
