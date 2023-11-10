import styled from '@emotion/styled';
import { Box, Container } from '@mui/system';
import { PAGE_INNER_PADDING } from '../../config';
import SubHeader from '../../components/common/SubHeader';
import Calendar from '../../components/common/Calendar';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import SubSidebar from '../../components/common/SubSidebar';
import { Button, Divider, Grid, Modal, Typography } from '@mui/material';
import format from 'date-fns/format';
import CarRezListModal from '../../components/car_admin/rez/CarRezListModal';
import { useDispatch } from 'react-redux';
import Drawer from '../../components/common/Drawer';
import { openDrawer, closeDrawer } from '../../redux/reducer/DrawerSlice';
import CarRezDetail from '../../components/car_admin/rez/CarRezDetail';
import ReorderIcon from '@mui/icons-material/Reorder';
import EventIcon from '@mui/icons-material/Event';
import CarRezList from '../../components/car_admin/rez/CarRezList';

// 사이드바 컴포넌트
const SubSidebarContent = () => {
  return (
    <Box flexGrow={1}>
      <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
        <Button variant="contained" sx={{ width: '100%' }} onClick={() => {}}>
          차량 예약
        </Button>
      </Grid>
      <Divider />
    </Box>
  );
};

const setTitle = (data) => {
  // data 객체의 status 값에 따라 title을 설정
  if (data === '1') {
    return '미처리';
  } else if (data === '2') {
    return '취소';
  } else if (data === '3') {
    return '운행 대기';
  } else if (data === '4') {
    return '운행중';
  } else {
    return '운행 완료';
  }
};

const setColor = (data) => {
  // data 객체의 status 값에 따라 color를 설정
  if (data === '1') {
    return '#9e9e9e';
  } else if (data === '2') {
    return '#d32f2f';
  } else if (data === '3') {
    return '#ffc107';
  } else if (data === '4') {
    return '#1769aa';
  } else {
    return '#2e7d32';
  }
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

// 실제 차량 예약 리스트 페이지
const CarRezPage = () => {
  // Drawer안에 들어갈 컴포넌트 내용

  // 예약 정보
  const [rezData, setRezData] = useState([]);
  const [events, setEvents] = useState([]);

  // 모달
  const [modalOpen, setModalOpen] = useState(false);

  // 리스트 객체
  const [listData, setListData] = useState([]);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  //리스트 or 캘린더
  const [isList, setIsList] = useState(false);

  const handleListBtn = () => {
    setIsList((prev) => !prev);
    axiosInstance.axiosInstance
      .get('/manager/car/rezListGetAll')
      .then((res) => {
        console.log(res.data);
        // const newRezData = res.data.map((data) => {
        //   return {
        //     ...data,
        //     start_at: format(new Date(data.start_at), 'yyyy-MM-dd HH:mm:ss')
        //   };
        // });
        setRezData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   axiosInstance.axiosInstance
  //     .get('/manager/car/rezListGetAll')
  //     .then((res) => {
  //       console.log(res.data);
  //       const newRezData = res.data.map((data) => {
  //         return {
  //           ...data,
  //           start_at: format(new Date(data.start_at), 'yyyy-MM-dd HH:mm:ss')
  //         };
  //       });

  //       setRezData(newRezData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    // start_at과 count를 키로 가지는 객체를 저장할 배열 초기화
    const startAtCounts = [];

    // rezData 배열을 순회
    rezData.forEach((data) => {
      // 현재 data의 start_at 값을 가져오기
      const currentStartAt = data.start_at.substr(0, 10);
      const currentStatus = data.rez_status;

      // start_at을 키로 가지는 객체가 이미 배열에 있는지 확인
      const existingObjectIndex = startAtCounts.findIndex(
        (obj) => obj.start_at === currentStartAt && obj.status === currentStatus
      );

      if (existingObjectIndex !== -1) {
        // 이미 해당 start_at을 키로 가지는 객체가 배열에 있을 경우, count 증가
        startAtCounts[existingObjectIndex].count += 1;
      } else {
        // 해당 start_at을 키로 가지는 객체가 배열에 없을 경우, 새로운 객체 추가
        startAtCounts.push({
          start_at: currentStartAt,
          count: 1,
          status: currentStatus
        });
      }
    });

    const newData = startAtCounts.map((data) => {
      return {
        start: data.start_at,
        title: `${setTitle(data.status)} - ${data.count}`,
        color: setColor(data.status)
      };
    });

    setEvents(newData);
  }, [rezData]);

  const handleEventClick = (e) => {
    setListData(
      rezData.filter(
        (data) =>
          data.start_at.substr(0, 10) === format(e.event.start, 'yyyy-MM-dd')
      )
    );
    handleModalOpen();
  };

  const handleDateSet = (arg) => {
    axiosInstance.axiosInstance
      .get('/manager/car/rezListGetAll', {
        params: { sdate: arg.start, edate: arg.end }
      })
      .then((res) => {
        console.log(res.data);
        const newRezData = res.data.map((data) => {
          return {
            ...data,
            start_at: format(new Date(data.start_at), 'yyyy-MM-dd HH:mm:ss')
          };
        });

        setRezData(newRezData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [tabData, setTabData] = useState([]);
  const dispatch = useDispatch();

  const handleClickRow = (car_rez_code) => {
    setTabData([
      {
        title: '예약 정보',
        content: (
          <CarRezDetail
            car_rez_code={car_rez_code}
            rezData={rezData}
            setRezData={setRezData}
          />
        )
      }
    ]);
    dispatch(openDrawer());
  };

  return (
    <>
      <SubHeader title={'차량 예약 조회'} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '770px',
          overflow: 'auto'
        }}
      >
        <Modal open={modalOpen} onClose={handleModalClose}>
          <CarRezListModal
            listData={listData}
            style={style}
            handleClickRow={handleClickRow}
          />
        </Modal>
        <Drawer width={900} tabData={tabData} sx={{ zIndex: 1300 }} />
        <SubSidebar content={<SubSidebarContent />} widthP={15} />
        <StyledMain>
          <Box
            sx={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
          >
            <StyledContainer>
              <Box display="flex" justifyContent="end" margin="10px 10px">
                <Button
                  variant="outlined"
                  startIcon={isList ? <EventIcon /> : <ReorderIcon />}
                  onClick={handleListBtn}
                >
                  {isList ? '캘린더' : '리스트'}
                </Button>
              </Box>
              <Divider />
              {isList ? (
                <CarRezList carRezData={rezData} />
              ) : (
                <Calendar
                  events={events}
                  handleEventClick={(e) => {
                    handleEventClick(e);
                  }}
                  handleDateSet={handleDateSet}
                />
              )}
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
  height: '100%',
  maxWidth: '1400px'
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  padding: '20px',
  borderRadius: 10
}));
