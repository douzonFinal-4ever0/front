import React, { Component } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import '../../theme/css/Calendar.css';
import Drawer from './Drawer';
import { useState } from 'react';
import Test from '../car_admin/Test';

const Calendar = ({
  events,
  tabData
  // setComponent1, setComponent2
}) => {
  const [drawerState, setDrawerState] = useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const handleEventClick = (info) => {
    // setComponent1(info.event);
    toggleDrawer('right', true)(info.jsEvent); // Drawer 열기
  };

  return (
    <>
      <div style={{ margin: 15, gridTemplateColumns: '2fr 1fr' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height={'85vh'}
          windowResizeDelay={100}
          events={events}
          eventClick={handleEventClick}
        />
        <Drawer
          width={1000}
          drawerState={drawerState}
          toggleDrawer={toggleDrawer}
          tabData={tabData}
        />
      </div>
    </>
  );
};

export default Calendar;
