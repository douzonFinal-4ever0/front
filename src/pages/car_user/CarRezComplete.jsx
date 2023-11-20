import {
  Button,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
  styled
} from '@mui/material';
import MainContainer from '../../components/mr_user/MainContainer';
//import WrapContainer from '../../components/mr_user/WrapContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { PAGE_INNER_PADDING, BORDER_RADIUS } from '../../config';

import { useState, useEffect } from 'react';

import KakaoMap3 from '../../components/car_user/KakaoMap3';

const CarRezComplete = () => {
  const location = useLocation();
  const carRez = location.state;
  const navigate = useNavigate();

  // const dateFormat = (date) => {
  //   const preDate = new Date(date);
  //   const options = {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   };
  //   return preDate.toLocaleString('ko-KR', options);
  // };
  // carRez.start_at = dateFormat(carRez.start_at);
  // carRez.return_at = dateFormat(carRez.return_at);
  console.log(carRez);
  console.log(carRez.carLoc);
  const goList = () => {
    navigate('../dashboard');
  };

  return (
    <MainContainer>
      <StyledContainer bgcolor={'#fff'} height={'245px'}>
        <Stack
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h1" color="text.secondary" align="center">
            {carRez.isUp === true ? '예약 수정' : '예약'} 완료
          </Typography>
          <Typography variant="h6" align="center">
            {carRez.memDTO.name} 님의{' '}
            {carRez.isUp === true ? '예약 수정이' : '예약이'} 완료되었습니다.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '10px', width: '15%' }}
            onClick={goList}
          >
            예약 관리
          </Button>
        </Stack>
      </StyledContainer>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={6}>
          <StyledContainer bgcolor={'#fff'} height={'500px'}>
            <Stack>
              <Typography variant="h3" color="text.secondary" align="left">
                예약 정보
              </Typography>
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
                    <ListItemText primary={carRez.car_rez_code} />
                  </ListItem>
                </Grid>
                <Grid item sx={{ display: 'flex' }} xs={12}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="예약자 이름" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={carRez.memDTO.name} />
                  </ListItem>
                </Grid>
                <Grid item sx={{ display: 'flex' }} xs={12}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="목적" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={carRez.detail} />
                  </ListItem>
                </Grid>
                <Grid item sx={{ display: 'flex' }} xs={12}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="목적지" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={carRez.carLoc[2].address} />
                  </ListItem>
                </Grid>
                <Grid item sx={{ display: 'flex' }} xs={12}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="대여" />
                  </ListItem>
                  <ListItem className="infoTitle">
                    <ListItemText primary={'반납'} />
                  </ListItem>
                </Grid>
                <Grid item sx={{ display: 'flex' }} xs={6}>
                  <Grid
                    item
                    sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
                    xs={12}
                  >
                    <Grid item sx={{ display: 'flex' }} xs={4}>
                      <ListItem className="infoTitle">
                        <ListItemText primary="인수지" />
                      </ListItem>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }} xs={8}>
                      <ListItem>
                        <ListItemText primary={carRez.carLoc[0].address} />
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex' }} xs={6}>
                  <Grid
                    item
                    sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
                    xs={12}
                  >
                    <Grid item sx={{ display: 'flex' }} xs={4}>
                      <ListItem className="infoTitle">
                        <ListItemText primary="반납지" />
                      </ListItem>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }} xs={8}>
                      <ListItem>
                        <ListItemText primary={carRez.carLoc[1].address} />
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex' }} xs={6}>
                  <Grid
                    item
                    sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
                    xs={12}
                  >
                    <Grid item sx={{ display: 'flex' }} xs={4}>
                      <ListItem className="infoTitle">
                        <ListItemText primary="대여일자" />
                      </ListItem>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }} xs={8}>
                      <ListItem>
                        <ListItemText primary={carRez.start_at} />
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex' }} xs={6}>
                  <Grid
                    item
                    sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
                    xs={12}
                  >
                    <Grid item sx={{ display: 'flex' }} xs={4}>
                      <ListItem className="infoTitle">
                        <ListItemText primary="반납일자" />
                      </ListItem>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }} xs={8}>
                      <ListItem>
                        <ListItemText primary={carRez.return_at} />
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/*
            <table>
              <tr>
                <td>예약번호 : {carRez.car_rez_code}</td>
              </tr>
              <tr>
                <td>예약자 이름 : {carRez.memDTO.name}</td>
              </tr>
              <tr>
                <td>목적 : {carRez.detail}</td>
              </tr>
              <tr>
                <td>목적지 : {carRez.carLoc[2].address}</td>
              </tr>
              <tr border>
                <td style={{ borderTop: '1px solid #000' }}>
                  대여
                  <span style={{ display: 'block', textAlign: 'left' }}>
                    {carRez.carLoc[0].address}
                  </span>
                  <span style={{ display: 'block', textAlign: 'left' }}>
                    {carRez.start_at}
                  </span>
                </td>
                <td style={{ borderTop: '1px solid #000' }}>
                  <span style={{ display: 'block', textAlign: 'right' }}>
                    반납
                  </span>
                  <span style={{ display: 'block', textAlign: 'right' }}>
                    {carRez.carLoc[1].address}
                  </span>
                  <span style={{ display: 'block', textAlign: 'right' }}>
                    {carRez.return_at}
                  </span>
                </td>
              </tr>
            </table>
            <KakaoMap3
              locations={carRez.carLoc}
              titles={[
                carRez.carLoc[0].loc_type,
                carRez.carLoc[1].loc_type,
                carRez.carLoc[2].loc_type
              ]}
              contents={[
                carRez.carLoc[0].address,
                carRez.carLoc[1].address,
                carRez.carLoc[2].address
              ]}
            />*/}
            </Stack>
          </StyledContainer>
        </Grid>
        <Grid item xs={6}>
          <StyledContainer bgcolor={'#fff'} height={'500px'}>
            <KakaoMap3
              locations={carRez.carLoc}
              titles={[
                carRez.carLoc[0].loc_type,
                carRez.carLoc[1].loc_type,
                carRez.carLoc[2].loc_type
              ]}
              contents={[
                carRez.carLoc[0].address,
                carRez.carLoc[1].address,
                carRez.carLoc[2].address
              ]}
            />
          </StyledContainer>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default CarRezComplete;
const StyledContainer = styled(Container)(({ theme, bgcolor, height }) => ({
  padding: PAGE_INNER_PADDING,
  borderRadius: BORDER_RADIUS,
  marginTop: '1%',

  height: height,
  backgroundColor: bgcolor,
  [theme.breakpoints.up('md')]: {
    minWidth: '100%'
  }
}));
