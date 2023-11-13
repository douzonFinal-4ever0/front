import {
  Box,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import SubHeader from '../../components/common/SubHeader';
import MrContrastChart from '../../components/mr_admin/chart/MrContrastChart.jsx';
import MrFavoriteType from '../../components/mr_admin/chart/MrFavoriteType';
import MrMostTimeChart from '../../components/mr_admin/chart/MrMostTimeChart';
import MrRezTimeChart from '../../components/mr_admin/chart/MrRezTimeChart';
import MrUsageChart from '../../components/mr_admin/chart/MrUsageChart';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import axiosInstance from '../../utils/axios.js';
import MrInfoSection from '../mr_user/rez/section/MrInfoSection';

const MrStatistics = () => {
  const [modalContent, setModalContent] = useState();
  const [mrResources, setMrResources] = useState({});
  const [mrRezRank, setMrRezRank] = useState({});
  const [mrRez, setMrRez] = useState();
  // const [mr_code, setMr_code] = useState('');
  console.log(mrResources);
  console.log();
  useEffect(() => {
    axiosInstance.axiosInstance
      .get(`mr/mrRezRank`)
      .then((res) => {
        setMrRezRank(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
    axiosInstance.axiosInstance
      .get('mr/mrRez')
      .then((res) => {
        setMrRez(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);
  useEffect(() => {
    const mr_code = mrRezRank[0]?.mr_code;

    axiosInstance.axiosInstance
      .get(`mr/${mr_code}`)
      // .get(`mr/R022`)
      .then((res) => {
        setMrResources(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, [mrRezRank]);
  console.log(mrRez);
  const handleClickAvgRezTime = () => {
    setModalContent(<MrRezTimeChart height={'500px'} width={'500px'} />);
    handleModal();
  };

  const handleClickMostTime = () => {
    setModalContent(<MrMostTimeChart height={'500px'} width={'500px'} />);
    handleModal();
  };

  const [open, setOpen] = useState(false);

  /** 모달창 열림닫힘 이벤트*/
  const handleModal = () => setOpen(!open);

  const ModalContentExample = () => {
    return <Box sx={{ width: '100%' }}>{modalContent}</Box>;
  };

  const cardContent1 = (
    <CardContent>
      <MrRezTimeChart height={300} width={'auto'} />
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
      <MrUsageChart height={300} width={'auto'} />
      <Typography gutterBottom variant="h5" component="div">
        회의실 사용률
      </Typography>
      <Typography variant="body2" color="text.secondary">
        총 31개의 회의실중 24개 회의실이 운영되었습니다.
      </Typography>
    </CardContent>
  );
  const cardContent3 = (
    <CardContent>
      <MrMostTimeChart width={'auto'} height={300} />
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
      <MrFavoriteType width={'auto'} height={300} />
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
      <MrInfoSection data={mrResources} />
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
      <MrContrastChart width={'auto'} height={300} />
      <Typography gutterBottom variant="h5" component="div">
        총 예약 건수
      </Typography>
      <Typography variant="body2" color="text.secondary">
        지난주에 비해 n건의 회의실 예약이 (증가/감소) 되었습니다.
      </Typography>
    </CardContent>
  );
  return (
    <>
      <SubHeader title={'회의실 통계'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <Grid container spacing={4}>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>
                <Grid>
                  <CardActionArea onClick={handleClickAvgRezTime}>
                    {cardContent1}
                  </CardActionArea>
                </Grid>
              </WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>{cardContent2}</WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>
                <CardActionArea onClick={handleClickMostTime}>
                  {cardContent3}
                </CardActionArea>
              </WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>{cardContent4}</WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>{cardContent5}</WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>{cardContent6}</WrapContainer>
            </Grid>
          </Grid>
        </MainContainer>
        <Modal
          open={open}
          modalTitle={'빈도 통계'}
          handleModal={handleModal}
          content={<ModalContentExample />}
        />
      </Box>
    </>
  );
};

export default MrStatistics;
