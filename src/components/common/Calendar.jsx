import React, { Component } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/react';
import '../../theme/css/Calendar.css';

const Calendar = ({ events, handleEventClick, handleDateSet }) => {
  return (
    <>
      <div style={{ margin: 15, gridTemplateColumns: '2fr 1fr' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek'
          }}
          height={'600px'}
          windowResizeDelay={100}
          events={events}
          eventClick={handleEventClick}
          datesSet={handleDateSet}
        />
      </div>
    </>
  );
};

export default Calendar;
