import React, { Component } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import '../../theme/css/Calendar.css';
import Drawer from './Drawer';
import { useState } from 'react';
import Test from '../car_admin/Test';

const Calendar = ({ events }) => {

    const [drawerState, setDrawerState] = useState({
        right: false
    });

    // Drawer안에 들어갈 컴포넌트 내용
    const [component1, setComponent1] = useState({});
    const [component2, setComponent2] = useState({});

    const tabData = [
        {
            "title" : "예약 현황",
            "content" : <Test contents={component1}/>
        },
        {
            "title" : "탭2",
            "content" : <Test contents={component2}/>
        }
    ]

    


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState({ ...drawerState, [anchor]: open });
    };

    const handleEventClick = (info) => {
        setComponent1(info.event);
        toggleDrawer('right', true)(info.jsEvent); // Drawer 열기
        
    };

    

    return (
        <>
            <div style={{ margin: 15, gridTemplateColumns: "2fr 1fr" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={'dayGridMonth'}
                    headerToolbar={
                        {
                            start: 'prev,next today',
                            center: 'title',
                            end: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }
                    }
                    height={"85vh"}
                    windowResizeDelay={100}
                    events={events}
                    eventClick={handleEventClick}
                />
                <Drawer width={1000} drawerState={drawerState} toggleDrawer={toggleDrawer} tabData={tabData}/>
            </div>
        </>
    );
}

export default Calendar;
