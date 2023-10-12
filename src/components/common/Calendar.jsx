import React, { Component } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';

const Calendar = () => {
    return(
        <>
            <div style={{ margin:15, display:'grid',gridTemplateColumns:"2fr 1fr"}}>
                <FullCalendar   
                    plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                    initialView={'dayGridMonth'}
                    headerToolbar={
                        {
                            start: 'prev,next,today', 
                            center: 'title',
                            end: 'dayGridMonth,timeGridWeek,timeGridDay' 
                        }
                    }
                    height={"85vh"}
                    events={[{title:'판매건수 : 23건', date:'2023-05-11',},{title:'판매건수 : 23건',date:'2023-05-13',}]}
                />
            </div>
        </>
    );
}

export default Calendar;