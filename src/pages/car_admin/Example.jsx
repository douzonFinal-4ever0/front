import Drawer from "../../components/common/Drawer";
import Calendar from "../../components/common/Calendar";
import { useEffect } from "react";
import SubHeader from "../../components/common/SubHeader";
import Box from '@mui/material/Box';
import SubSidebar from "../../components/common/SubSidebar";
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';
import Test from "../../components/car_admin/Test"
import { Container } from "@mui/system";

const ExamplePage = ({ isAdminMode, setIsAdminMode }) => {
    // Drawer의 탭에 따른 컴포넌트를 배열로 선언하여 전달
    // Drawer에 전달할 때 tabTitles와 tabContents의 수 일치하게 전달해주기
    // const contents = [
    //     <Button />,
    //     <Test />
    // ]
    useEffect(() => {
        if (isAdminMode === false) {
            setIsAdminMode(true);
        }
    }, []);

    // drawer 이벤트 처리
    const [drawerState, setDrawerState] = React.useState({
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState({ ...drawerState, ['right']: open });
    };

    const tabData1 = [
        {
            "title": "예약 현황",
            "content": "내용222"
        },
        {
            "title": "탭2",
            "content": "내용222"
        }
    ]

    // Drawer안에 들어갈 컴포넌트 내용
    const [component1, setComponent1] = useState({});
    const [component2, setComponent2] = useState({});

    const tabData2 = [
        {
            "title": "예약 현황",
            "content": <Test contents={component1} />
        },
        {
            "title": "탭2",
            "content": <Test contents={component2} />
        }
    ]


    return (
        <Container>
            {/* 캘린더 이벤트 전달은 객체 배열을 props로 전달하여 표시
            
        */}
            <SubHeader title={'차량'} />
            <Box sx={{ display: 'flex', height: '90%'}}>
                <SubSidebar />
                <Box sx={{ width: '100%' }}>
                    <Calendar events={[{
                        title: 'event1',
                        start: '2013-10-12'
                    },
                    {
                        title: 'event2',
                        start: '2023-10-13',
                        end: '2023-10-16'
                    },
                    {
                        title: 'event3',
                        start: '2023-10-16T12:30:00',
                        allDay: false // will make the time show
                    }]}
                    tabData={tabData2} setComponent1={setComponent1} setComponent2={setComponent2}/>
                    <Button onClick={toggleDrawer('right', true)}>right</Button>
                    <Drawer width={1000} drawerState={drawerState} toggleDrawer={toggleDrawer} tabData={tabData1} />
                </Box>
            </Box>


        </Container>
    );
}

export default ExamplePage;