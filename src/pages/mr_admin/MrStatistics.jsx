import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import SubHeader from '../../components/common/SubHeader';
import MainContainer2 from '../../components/mr_admin/MainContainer2';
import MrRezTimeChart from '../../components/mr_admin/chart/MrRezTimeChart';

const MrStatistics = () => {
  const handleClick = () => {
    handleModal();
  };
  const [open, setOpen] = useState(false);
  /** 모달창 열림닫힘 이벤트*/
  const handleModal = () => setOpen(!open);

  const ModalContentExample = () => {
    return (
      <Box sx={{ minWidth: '500px', width: 'auto' }}>
        <MrRezTimeChart height={'500px'} width={'500px'} />
      </Box>
    );
  };
  return (
    <>
      <SubHeader title={'회의실 통계'} />
      <MainContainer2>
        <Grid container spacing={1} sx={{ display: 'flex' }}>
          <Grid item container spacing={2}>
            <Card>
              <CardActionArea onClick={handleClick}>
                {cardContent1}
              </CardActionArea>
            </Card>
            <Card>{cardContent2}</Card>
            <Card>
              <CardActionArea onClick={handleClick}>
                {cardContent3}
              </CardActionArea>
            </Card>
            <Card>{cardContent4}</Card>
            <Card>{cardContent5}</Card>
            <Card>{cardContent6}</Card>
          </Grid>
        </Grid>
      </MainContainer2>
      <Modal
        open={open}
        modalTitle={'빈도 통계'}
        handleModal={handleModal}
        content={<ModalContentExample />}
      />
    </>
  );
};

export default MrStatistics;

const cardContent1 = (
  <CardContent>
    {/* <MrRezTimeChart height={220} width={300} /> */}
    <Typography gutterBottom variant="h5" component="div">
      평균 예약 시간
    </Typography>
    <Typography variant="body2" color="text.secondary">
      평균 1시간 30분 사용합니다.
    </Typography>
  </CardContent>
);
const cardContent2 = (
  <CardContent>
    26 / 31
    <Typography gutterBottom variant="h5" component="div">
      회의실 이용률
    </Typography>
    <Typography variant="body2" color="text.secondary">
      총 n개의 회의실중 x개 회의실이 운영되었습니다.
    </Typography>
  </CardContent>
);
const cardContent3 = (
  <CardContent>
    {/* <MrMostTimeChart width={220} height={300} /> */}
    <Typography gutterBottom variant="h5" component="div">
      예약 시간대
    </Typography>
    <Typography variant="body2" color="text.secondary">
      가장 붐비는 시간대는 09:00 입니다.
    </Typography>
  </CardContent>
);
const cardContent4 = (
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      인기 있는 회의실 유형
    </Typography>
    <Typography variant="body2" color="text.secondary">
      소회의실이 가장 인기가 많습니다.
    </Typography>
  </CardContent>
);
const cardContent5 = (
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      인기 있는 회의실
    </Typography>
    <Typography variant="body2" color="text.secondary">
      소회의실 A-201호가 가장 인기가 많습니다.
    </Typography>
  </CardContent>
);
const cardContent6 = (
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      총 예약 건수
    </Typography>
    <Typography variant="body2" color="text.secondary">
      지난주에 비해 n건의 회의실 예약이 (증가/감소) 되었습니다.
    </Typography>
  </CardContent>
);
