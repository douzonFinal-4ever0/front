import React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useDispatch, useSelector } from 'react-redux';
import TimeLineCalendar from '../../../../components/mr_admin/TimeLineCalendar';
import axiosInstance from '../../../../utils/axios.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import listPlugin from '@fullcalendar/list';
import RezDetailModal from '../modal/RezDetailModal';

const MrRezCalendar = ({
  events,
  data, // 전체 예약 리스트
  setRezList,
  getMrRezApi,
  setEvents
}) => {
  const [currentView, setCurrentView] = useState('listWeek');
  const [rezDetail, steRezDetail] = useState([]);
  const [open, setOpen] = useState(false); // 모달창 오픈 여부
  const [isModify, setIsModify] = useState(false); // 수정모드 여부

  const businessHours = {
    daysOfWeek: [1, 2, 3, 4, 5, 6],
    startTime: '9:00',
    endTime: '22:00'
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleModifyMode = () => {
    setIsModify(!isModify);
  };

  const handleEventClick = (e) => {
    const info = e.event._def;
    const { title, publicId } = info; // publicId -> 예약 코드
    const rezData = data.filter((item) => item.mr_rez_code === publicId);
    steRezDetail(rezData[0]);
    setOpen(true);
  };

  return (
    <>
      <FullCalendar
        plugins={[listPlugin, dayGridPlugin, multiMonthPlugin]}
        initialView={currentView}
        nowIndicator={true}
        events={events}
        eventClick={handleEventClick}
        businessHours={businessHours}
        resourceAreaHeaderContent={'회의실'}
        views={{
          dayGridMonth: {
            buttonText: '월별'
          },
          listWeek: {
            buttonText: '주별'
          },
          today: {
            buttonText: '오늘'
          }
        }}
        res
        headerToolbar={{
          left: 'prevYear,prev,next,nextYear,today',
          center: 'title',
          right: 'listWeek,dayGridMonth'
        }}
        resourceAreaWidth="15%"
        navLinks="true"
        locale={'ko'}
        contentHeight={'520px'}
      />
      <RezDetailModal
        open={open}
        handleModal={handleModal}
        data={rezDetail}
        steRezDetail={steRezDetail}
        list={data}
        setRezList={setRezList}
        isModify={isModify}
        handleModifyMode={handleModifyMode}
        getMrRezApi={getMrRezApi}
        events={events}
        setEvents={setEvents}
      />
    </>
  );
};

export default MrRezCalendar;
