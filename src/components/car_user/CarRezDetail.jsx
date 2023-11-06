import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  InputAdornment,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateChip from './CreateChip';
import RectangleIcon from '@mui/icons-material/Rectangle';
import Modal from '../common/Modal';
import ModifyRez from './ModifyRez';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../../redux/reducer/DrawerSlice';
import axiosInstance from '../../utils/axios';

const CarRezDetail = ({ rezCode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rezData, setRezData] = useState(null);
  const [rezLoc, setRezLoc] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const [addressObj, setAddressObj] = useState({
    areaAddress: '',
    townAddress: ''
  });
  const dateFormat = (date) => {
    const preDate = new Date(date);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return preDate.toLocaleString('ko-KR', options);
  };
  // var rezMerge = {};
  useEffect(() => {
    axiosInstance.axiosInstance
      .get(`http://localhost:8081/car_rez/carRezDetail/${rezCode}`)
      .then((res) => {
        // console.log(res.data);
        setRezData(res.data);
        // setRezMerge(res.data);
        // console.log(rezMerge);
        //console.log(res.data.memResponseVO.name);
      });
    axiosInstance.axiosInstance
      .get(`http://localhost:8081/car_rez/locations/${rezCode}`)
      .then((res) => {
        // console.log(res.data);
        setRezLoc(res.data);
        // setRezMerge({ ...rezMerge, locations: res.data });
        // console.log(rezMerge);
      });
  }, []);

  const cancelRez = () => {
    axios
      .delete(`http://localhost:8081/car_rez/carRezDetail/${rezCode}`)
      .then((res) => {
        if (res.status === 204) {
          //삭제 성공
          alert('취소 성공.');

          // setData(1);
        } else {
          alert('취소 실패.');
          //삭제 실패
        }
      })
      .catch((e) => {
        //오류
        alert('오류발생', e);
      })
      .finally(() => {
        dispatch(closeDrawer());
        window.location.href = '/carRez/dashboard';
      });
  };
  //modal여는 함수
  const handleOpenModal = () => {
    setOpen(true);
  };
  //modal 닫는 함수
  const handleCloseModal = (reason) => {
    if (reason === 'buttonClick') {
      // 특정 버튼을 클릭한 경우의 처리
      console.log('사용자가 버튼을 클릭하여 모달이 닫힘');
    }
    setOpen(false);
  };

  // 예약 정보 수정
  const updateRez = () => {
    axiosInstance.axiosInstance
      .patch('http://localhost:8081/car_rez/carRezDetail', formData)
      .then((res) => {
        console.log('수정완료', res.data);
        alert('수정완료.');
        window.location.href = '/carRez/dashboard';
      });
  };
  //예약 수정 버튼 클릭
  const updateRez2 = () => {
    const merge = { rez: rezData, loc: rezLoc };
    navigate('../reservation', { state: merge });
  };

  return (
    <Container>
      {(rezLoc !== null) & (rezData !== null) && (
        <>
          <Modal
            open={open}
            handleModal={(e, reason) => handleCloseModal(reason)}
            modalTitle={'예약 수정'}
            content={
              <ModifyRez
                rezData={rezData}
                setRezData={setRezData}
                rezLoc={rezLoc}
                // setRezLoc={setRezLoc}
                setFormData={setFormData}
                formData={formData}
                addressObj={addressObj}
                setAddressObj={setAddressObj}
              />
            }
            buttons={
              <Grid
                container
                xs={12}
                sx={{ m: '10px 0px' }}
                justifyContent="center"
                spacing={2}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#BEBEBE',
                    backgroundColor: '#ffffff',
                    ':hover': {
                      backgroundColor: '#ffffff',
                      borderColor: '#BEBEBE'
                    },
                    margin: '0px 4px'
                  }}
                  onClick={handleCloseModal}
                >
                  취소
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderColor: '#BEBEBE',
                    ':hover': {
                      backgroundColor: '#2065D1',
                      borderColor: '#BEBEBE'
                    },
                    margin: '0px 4px'
                  }}
                  onClick={(e) => {
                    // setFormData({
                    //   ...formData,
                    //   des_loc: addressObj.areaAddress + addressObj.townAddress
                    // });

                    console.log(formData);
                    updateRez();
                  }}
                >
                  수정
                </Button>
              </Grid>
            }
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              p: 0
            }}
          >
            <Box
              display="flex"
              // marginTop="15px"
              sx={{
                width: '100%',
                borderBottom: '3px solid black',
                padding: '5px 0px'
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
              <Typography
                variant="subtitle1"
                sx={{ marginLeft: '10px', minWidth: '100px', pt: '2%' }}
              >
                기본 정보
              </Typography>
              {(rezData.rez_status !== null) & (rezData.rez_status !== '3') ? (
                <Grid
                  container
                  xs={12}
                  sx={{ m: '10px 0px' }}
                  justifyContent="right"
                  spacing={2}
                >
                  {rezData.rez_status !== '1' ? (
                    <Button
                      sx={{
                        backgroundColor: '#607d8b',
                        ':hover': { backgroundColor: '#455a64' },
                        margin: '0px 4px'
                      }}
                      variant="contained"
                      onClick={updateRez2}
                    >
                      예약 수정
                    </Button>
                  ) : (
                    ''
                  )}

                  <Button
                    sx={{
                      backgroundColor: '#607d8b',
                      ':hover': { backgroundColor: '#455a64' },
                      margin: '0px 4px'
                    }}
                    variant="contained"
                    onClick={cancelRez}
                  >
                    예약 취소
                  </Button>
                  {/* <Button
                    sx={{
                      backgroundColor: '#607d8b',
                      ':hover': { backgroundColor: '#455a64' },
                      margin: '0px 4px'
                    }}
                    variant="contained"
                  >
                    운행 완료
                  </Button> */}
                </Grid>
              ) : (
                ''
              )}
            </Box>
          </Box>
          {/* {rezData !== null && ( */}
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
              xs={12}
            >
              <ListItem className="infoTitle">
                <ListItemText primary="예약 번호" />
              </ListItem>
              <ListItem>
                <ListItemText primary={rezData.car_rez_code} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle">
                <ListItemText primary="예약 날짜" />
              </ListItem>
              <ListItem>
                <ListItemText primary={dateFormat(rezData.rez_at)} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle">
                <ListItemText primary="대여 날짜" />
              </ListItem>
              <ListItem>
                <ListItemText primary={dateFormat(rezData.start_at)} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle">
                <ListItemText primary="반납 날짜" />
              </ListItem>
              <ListItem>
                <ListItemText primary={dateFormat(rezData.return_at)} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle">
                <ListItemText primary="인수지" />
              </ListItem>
              <ListItem>
                <ListItemText primary={rezLoc[0].address} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle">
                <ListItemText primary="반납지" />
              </ListItem>
              <ListItem>
                <ListItemText primary={rezLoc[1].address} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle">
                <ListItemText primary="목적지" />
              </ListItem>
              <ListItem>
                <ListItemText primary={rezLoc[2].address} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle">
                <ListItemText primary="예상 주행 거리" />
              </ListItem>
              <ListItem>
                <ListItemText primary={rezData.est_mileage + '㎞'} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle">
                <ListItemText primary="예약 상태" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<CreateChip params={rezData.rez_status} />}
                />
              </ListItem>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                mt: '2%',
                mb: '2%'
              }}
            >
              <Box
                display="flex"
                marginTop="15px"
                sx={{
                  width: '100%',
                  borderBottom: '3px solid black',
                  padding: '5px 0px'
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
                <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
                  기본 정보
                </Typography>
              </Box>
            </Box>

            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="예약자" />
              </ListItem>
              <ListItem>
                <ListItemText primary={rezData.memResponseVO.name} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="부서" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={rezData.memResponseVO.deptVO.dept_name}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="목적" />
              </ListItem>
              <ListItem>
                <ListItemText primary={rezData.detail} />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="차량 번호" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={rezData.carDetailResponseVO.carVO.car_code}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="차량명" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={rezData.carDetailResponseVO.carVO.car_name}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="유종" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={rezData.carDetailResponseVO.carVO.fuel_type}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="연비" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={rezData.carDetailResponseVO.fuel_effciency + '㎞/ℓ'}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={6}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="누적 주행거리" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={rezData.carDetailResponseVO.accum_mileage + '㎞'}
                />
              </ListItem>
            </Grid>
            <Grid item sx={{ display: 'flex' }} xs={12}>
              <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                <ListItemText primary="차량 위치" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={rezData.carDetailResponseVO.car_address}
                />
              </ListItem>
            </Grid>
          </Grid>
          {/* )} */}
        </>
      )}
    </Container>
  );
};
export default CarRezDetail;
