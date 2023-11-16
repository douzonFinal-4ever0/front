import { Box, Container, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RectangleBtn from '../../components/common/RectangleBtn';
import axiosInstance from '../../utils/axios';
import MrInfoSection from '../mr_user/rez/section/MrInfoSection';

const QRPage = () => {
  const { mr_code } = useParams();
  const [mr, setMr] = useState();
  useEffect(() => {
    axiosInstance.axiosInstance
      .get(`mr/${mr_code}`)
      .then((res) => {
        setMr(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);
  console.log(mr);
  const handleCheckIn = () => {
    axiosInstance.axiosInstance
      .patch(`/mr/mrCheckIn/${mr_code}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        justifyItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '10px',
        height: '100%',
        width: '500px'
      }}
    >
      <Paper elevation={3} sx={{ padding: '15px', height: 'auto' }}>
        <Box sx={{ width: 400 }}>
          {mr && <MrInfoSection data={mr} />}
          <RectangleBtn
            category={'register'}
            text={'입실'}
            sx={{
              padding: '14px 12px'
            }}
            handlebtn={handleCheckIn}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default QRPage;
