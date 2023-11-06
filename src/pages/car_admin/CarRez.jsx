import styled from '@emotion/styled';
import { Box, Container } from '@mui/system';
import { PAGE_INNER_PADDING } from '../../config';
import SubHeader from '../../components/common/SubHeader';
import Calendar from '../../components/common/Calendar';
import { useState } from 'react';
import Test from '../../components/car_admin/Test';

const CarRezPage = () => {
  // Drawer안에 들어갈 컴포넌트 내용
  const [component1, setComponent1] = useState({});
  const [component2, setComponent2] = useState({});
  const tabData2 = [
    {
      title: '예약 현황',
      content: <Test contents={component1} />
    },
    {
      title: '탭2',
      content: <Test contents={component2} />
    }
  ];
  return (
    <>
      <SubHeader title={'예약 내역'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledMain>
          <Box sx={{ width: '100%', padding: 3, backgroundColor: '#ffffff' }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                padding: '10px 24px',
                maxWidth: '1200px',
                margin: 'auto'
              }}
            ></Box>
            <StyledContainer>
              <Calendar
                events={[
                  {
                    title: 'event1',
                    start: '2013-11-12'
                  },
                  {
                    title: 'event2',
                    start: '2023-11-13',
                    end: '2023-11-16'
                  },
                  {
                    title: 'event3',
                    start: '2023-11-16T12:30:00',
                    allDay: false // will make the time show
                  }
                ]}
                tabData={tabData2}
                setComponent1={setComponent1}
                setComponent2={setComponent2}
              />
            </StyledContainer>
          </Box>
        </StyledMain>
      </Box>
    </>
  );
};

export default CarRezPage;

const StyledMain = styled(Box)(({ theme }) => ({
  padding: PAGE_INNER_PADDING,
  width: '100%',
  maxWidth: '1400px'
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  minHeight: '630px',
  height: 'auto',
  padding: '20px',
  borderRadius: 10
}));
