import {
  Box,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Modal,
  Typography
} from '@mui/material';
import RectangleIcon from '@mui/icons-material/Rectangle';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axios';
import { format } from 'date-fns';
import RectangleBtn from '../../common/RectangleBtn';
import { palette } from '../../../theme/palette';
import CarDeleteModal from '../CarDeleteModal';

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
  width: 400,
  bgcolor: palette.grey['50'],
  // border: '2px solid #000',
  boxShadow: 24
};

const CarRezDetail = ({ car_rez_code, rezData, setRezData }) => {
  const [carRezData, setCarRezData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/manager/car/rezGetOne', { params: { car_rez_code: car_rez_code } })
      .then((res) => {
        console.log(res.data);
        setCarRezData(res.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 삭제 모달 관련 변수 및 함수
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleRezCancelBtn = () => {
    // 해당 예약을 취소시킴. 예약 상태를 취소로 업데이트
    axiosInstance.axiosInstance
      .put(`/manager/car/rezCancel/${car_rez_code}`)
      .then((res) => {
        setCarRezData({
          ...carRezData,
          carRezResponseVO: { ...carRezData.carRezResponseVO, rez_status: '4' }
        });
        const updatedRezData = rezData.map((data) => {
          if (data.car_rez_code === car_rez_code) {
            return { ...data, rez_status: '4' };
          }
          return data;
        });
        setRezData(updatedRezData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      {isLoading ? (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mt: '2%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center'
              }}
            >
              <RectangleIcon
                sx={{
                  color: 'black',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  width: '6px',
                  height: '6px'
                }}
              />
              <Typography variant="h6" sx={{ marginLeft: '10px' }}>
                예약 정보
              </Typography>
            </Box>
            {carRezData.carRezResponseVO.rez_status === '2' ? (
              <Box width="15%">
                <Box>
                  <RectangleBtn
                    text={'예약 취소'}
                    category={'delete'}
                    sx={{
                      height: '30px',
                      '& .MuiTypography-root': { fontSize: '15px' }
                    }}
                    handlebtn={() => {
                      handleDeleteModalOpen();
                    }}
                  />
                </Box>
                <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
                  <CarDeleteModal
                    style={style}
                    handleDeleteModalClose={handleDeleteModalClose}
                    handleDeleteBtn={handleRezCancelBtn}
                    title={'예약 취소'}
                  >
                    정말로 해당 예약을 취소하시겠습니까?
                  </CarDeleteModal>
                </Modal>
              </Box>
            ) : (
              <></>
            )}
          </Box>

          <Grid
            container
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              mt: '2%',
              '& .infoTitle': {
                backgroundColor: '#eeeeee'
              },
              '& .MuiListItem-gutters': {
                borderBottom: '1px solid #bdbdbd'
              }
            }}
          >
            <Grid
              item
              sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
              xs={6}
            >
              <ListItem className="infoTitle">
                <ListItemText primary="예약 번호" />
              </ListItem>
              <ListItem>
                <ListItemText primary={car_rez_code} />
              </ListItem>
            </Grid>
            <Grid
              item
              sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
              xs={6}
            >
              <ListItem className="infoTitle">
                <ListItemText primary="예약 날짜" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={format(
                    new Date(carRezData.carRezResponseVO.rez_at),
                    'yyyy-MM-dd HH:mm:ss'
                  )}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle">
                <ListItemText primary="대여 날짜" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={format(
                    new Date(carRezData.carRezResponseVO.start_at),
                    'yyyy-MM-dd HH:mm:ss'
                  )}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle">
                <ListItemText primary="반남 날짜" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={format(
                    new Date(carRezData.carRezResponseVO.return_at),
                    'yyyy-MM-dd HH:mm:ss'
                  )}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle">
                <ListItemText primary="예상 주행거리" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${carRezData.carRezResponseVO.est_mileage}km`}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle">
                <ListItemText primary="예약 상태" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={setTitle(carRezData.carRezResponseVO.rez_status)}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="인수지" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    carRezData.carLocVOs.find(
                      (item) => item.loc_type === '인수지'
                    ).address
                  }
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="반납지" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    carRezData.carLocVOs.find(
                      (item) => item.loc_type === '반납지'
                    ).address
                  }
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="목적지" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    carRezData.carLocVOs.find(
                      (item) => item.loc_type === '목적지'
                    ).address
                  }
                />
              </ListItem>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              mt: '7%'
            }}
          >
            <RectangleIcon
              sx={{
                color: 'black',
                marginTop: 'auto',
                marginBottom: 'auto',
                width: '6px',
                height: '6px'
              }}
            />
            <Typography variant="h6" sx={{ marginLeft: '10px' }}>
              기본 정보
            </Typography>
          </Box>
          <Grid
            container
            marginTop="30px"
            sx={{
              mt: '2%',
              '& .infoTitle': {
                backgroundColor: '#eeeeee'
              },
              '& .MuiListItem-gutters': {
                borderBottom: '1px solid #bdbdbd'
              }
            }}
          >
            <Grid
              item
              sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
              xs={6}
            >
              <ListItem className="infoTitle">
                <ListItemText primary="예약자" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${carRezData.carRezResponseVO.memResponseVO.name} ${carRezData.carRezResponseVO.memResponseVO.position_name} ${carRezData.carRezResponseVO.memResponseVO.deptVO.dept_name}`}
                />
              </ListItem>
            </Grid>
            <Grid
              item
              sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
              xs={6}
            >
              <ListItem className="infoTitle">
                <ListItemText primary="운행 차량" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${carRezData.carRezResponseVO.carDetailResponseVO.carVO.car_code} ${carRezData.carRezResponseVO.carDetailResponseVO.carVO.car_name}`}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="목적" />
              </ListItem>
              <ListItem>
                <ListItemText primary={carRezData.carRezResponseVO.detail} />
              </ListItem>
            </Grid>
          </Grid>
        </>
      ) : (
        <>Loading...</>
      )}
    </Container>
  );
};

export default CarRezDetail;
