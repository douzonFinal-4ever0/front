import {
  Button,
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
import KakaoMap from '../../components/car_user/KakaoMap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import KakaoMap2 from '../../components/car_user/KakaoMap2';
import KakaoMap3 from '../../components/car_user/KakaoMap3';

const CarRezComplete = () => {
  const location = useLocation();
  const carRez = location.state;
  const navigate = useNavigate();

  const dateFormat = (date) => {
    const preDate = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return preDate.toLocaleString('ko-KR', options);
  };
  carRez.start_at = dateFormat(carRez.start_at);
  carRez.return_at = dateFormat(carRez.return_at);
  console.log(carRez);
  console.log(carRez.carLoc);
  const goList = () => {
    navigate('../dashboard');
  };

  return (
    <MainContainer>
      <StyledContainer bgColor={'#fff'} height={'245px'}>
        <Stack
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h1" color="text.secondary" align="center">
            예약 완료
          </Typography>
          <Typography variant="h6" align="center">
            사용자 이름 님의 예약이 완료되었습니다.
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

      <StyledContainer bgColor={'#fff'} height={'500px'}>
        <Stack>
          <Typography variant="h3" color="text.secondary" align="left">
            예약 정보
          </Typography>
          <table>
            <tr>
              <td>예약정보 : {carRez.car_rez_code}</td>
            </tr>
            <tr>
              <td>예약자 이름 : </td>
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
          />
        </Stack>
      </StyledContainer>
    </MainContainer>
  );
};

export default CarRezComplete;
const StyledContainer = styled(Container)(({ theme, bgColor, height }) => ({
  padding: PAGE_INNER_PADDING,
  borderRadius: BORDER_RADIUS,
  marginTop: '1%',

  height: height,
  backgroundColor: bgColor,
  [theme.breakpoints.up('md')]: {
    minWidth: '100%'
  }
}));
