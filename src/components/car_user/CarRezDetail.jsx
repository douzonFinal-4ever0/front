import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateChip from './CreateChip';

const CarRezDetail = ({ rezCode }) => {
  const [rezData, setRezData] = useState(null);
  const [rezLoc, setRezLoc] = useState(null);

  const dateFormat = (date) => {
    const preDate = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return preDate.toLocaleString('ko-KR', options).slice(0, -1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/car_rez/carRezDetail/${rezCode}`)
      .then((res) => {
        console.log(res.data);
        setRezData(res.data);
        //console.log(res.data.memResponseVO.name);
      });
    axios
      .get(`http://localhost:8081/car_rez/locations/${rezCode}`)
      .then((res) => {
        console.log(res.data);
        setRezLoc(res.data);
      });
  }, []);

  const cancelRez = () => {
    axios
      .delete(`http://localhost:8081/car_rez/carRezDetail/${rezCode}`)
      .then((res) => {
        if (res.status === 204) {
          //삭제 성공
          alert('취소 성공.');
          window.location.href = '/carRez/dashboard';
        } else {
          alert('취소 실패.');
          //삭제 실패
        }
      })
      .catch((e) => {
        //오류
        alert('오류발생', e);
      });
  };
  return (
    <Container>
      {rezLoc !== null && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mt: '2%'
            }}
          >
            <Typography variant="h6">예약 정보</Typography>
            <ButtonGroup sx={{ justifyContent: 'flex-end' }}>
              <Button
                sx={{
                  backgroundColor: '#607d8b',
                  ':hover': { backgroundColor: '#455a64' }
                }}
                variant="contained"
              >
                예약 수정
              </Button>
              <Button
                sx={{
                  backgroundColor: '#607d8b',
                  ':hover': { backgroundColor: '#455a64' }
                }}
                variant="contained"
                onClick={cancelRez}
              >
                예약 취소
              </Button>
              <Button
                sx={{
                  backgroundColor: '#607d8b',
                  ':hover': { backgroundColor: '#455a64' }
                }}
                variant="contained"
              >
                운행 완료
              </Button>
            </ButtonGroup>
          </Box>
          {rezData !== null && (
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
                  <ListItemText primary={rezData.est_mileage} />
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
                  mt: '2%'
                }}
              >
                <Typography variant="h6">예약자/차량 정보</Typography>
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
                    primary={rezData.carDetailResponseVO.fuel_effciency}
                  />
                </ListItem>
              </Grid>
              <Grid item sx={{ display: 'flex' }} xs={6}>
                <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
                  <ListItemText primary="누적 주행거리" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={rezData.carDetailResponseVO.accum_mileage}
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
          )}
        </>
      )}
    </Container>
  );
};
export default CarRezDetail;
