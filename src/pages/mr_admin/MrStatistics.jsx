import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
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
  const [modalTitle, setModalTitle] = useState('');
  const [mrRezRow, setMrRezRow] = useState({});
  const [mrRezTime, setMrRezTime] = useState({});
  const [mrRezType, setMrRezType] = useState([]);
  // const [mr_code, setMr_code] = useState('');
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
    axiosInstance.axiosInstance
      .get('mr/mrRezTime')
      .then((res) => {
        setMrRezTime(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
    axiosInstance.axiosInstance
      .get('mr/mrRezRow')
      .then((res) => {
        setMrRezRow(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
    axiosInstance.axiosInstance
      .get('mr/mrTypeRow')
      .then((res) => {
        setMrRezType(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);

  const handleMrInfo = (mr_code) => {
    axiosInstance.axiosInstance
      .get(`mr/${mr_code}`)
      .then((res) => {
        setMrResources(res.data);
        setModalContent(
          <Box sx={{ width: '500px' }}>
            <MrInfoSection data={res.data} />
          </Box>
        );
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
    setModalTitle('회의실 세부 정보');
    handleModal();
  };

  const handleClickAvgRezTime = () => {
    setModalContent(<MrRezTimeChart height={'500px'} width={'500px'} />);
    setModalTitle('회의시간 통계');
    handleModal();
  };

  const handleClickMostTime = () => {
    setModalContent(<MrMostTimeChart height={'500px'} width={'500px'} />);
    setModalTitle('가장 많이 사용하는 시간 통계');
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
      <Typography gutterBottom variant="h4" component="div">
        ⏰평균 예약 시간
      </Typography>
      <CardActionArea onClick={handleClickAvgRezTime}>
        <MrRezTimeChart height={300} width={'auto'} />
      </CardActionArea>
      <Typography variant="body1">💡평균 1시간 30분 사용합니다.</Typography>
    </CardContent>
  );

  const cardContent2 = (
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        ⚙️회의실 사용률
      </Typography>
      <MrUsageChart
        height={300}
        width={'auto'}
        data={[
          { value: mrRezRow.total - mrRezRow.rez_row_count, name: '사용 ' },
          { value: mrRezRow.rez_row_count, name: '미사용 ' }
        ]}
      />
      <Typography variant="body1">
        💡총 {mrRezRow.total}개의 회의실중 {mrRezRow.rez_row_count}개 회의실이
        운영되었습니다.
      </Typography>
    </CardContent>
  );
  const cardContent3 = (
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        🕘예약 시간대
      </Typography>
      <CardActionArea onClick={handleClickMostTime}>
        <MrMostTimeChart width={'auto'} height={300} />
      </CardActionArea>
      <Typography variant="body1">
        💡가장 붐비는 시간대는 09:00 입니다.
      </Typography>
    </CardContent>
  );
  console.log(mrRezType);
  // 변환할 데이터 구조
  // const data = mrRezType.map((item) => ({
  //   value: item.rez_cnt,
  //   name: item.mr_type
  // }));
  const mrType =
    mrRezType &&
    mrRezType.map((item) => ({
      value: item.rez_cnt,
      name: item.mr_type
    }));
  const cardContent4 = (
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        ⭐인기 있는 회의실 유형
      </Typography>
      <MrFavoriteType width={'auto'} height={300} data={mrType} />
      <Typography variant="body1">
        💡{mrRezType[0]?.mr_type}이 가장 인기가 많습니다.
      </Typography>
    </CardContent>
  );
  const cardContent5 = (
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        ⭐인기 있는 회의실
      </Typography>
      <Grid container spacing={3} mb={3} mt={3}>
        {[0, 1, 2].map((index) => (
          <Grid item xs={4} key={index}>
            <CardActionArea
              onClick={() => {
                handleMrInfo(mrRezRank[index]?.mr_code);
              }}
            >
              <CardMedia
                component="img"
                image="https://heejinawsbucket1.s3.ap-northeast-2.amazonaws.com/b5b95fa1-9e4d-4860-b160-200d136e722d-mr-room7.png"
                style={{ borderRadius: '15px' }}
              />
            </CardActionArea>

            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: 'center' }}
            >
              {mrRezRank[index]?.mr_name}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              {mrRezRank[index]?.rez_cnt}회
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1">
        💡{mrRezRank[0]?.mr_name}호가 가장 인기가 많습니다.
      </Typography>
    </CardContent>
  );
  const cardContent6 = (
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        📈총 예약 건수
      </Typography>
      <MrContrastChart width={'auto'} height={300} />
      <Typography variant="body1">
        💡지난주에 비해 n건의 회의실 예약이 증가되었습니다.
      </Typography>
    </CardContent>
  );
  return (
    <>
      <SubHeader title={'회의실 통계'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <Box
                marginTop="30px"
                width="100px"
                borderLeft="5px solid #666666"
                display="flex"
                justifyContent="center"
                marginLeft="30px"
              >
                <Typography variant="h6" color="#666666">
                  회의실 통계
                </Typography>
              </Box>
            </Grid>
            <Grid item container xs={4}>
              <WrapContainer bgcolor={'#fff'}>{cardContent1}</WrapContainer>
            </Grid>
            <Grid item container xs={8}>
              <WrapContainer bgcolor={'#fff'}>{cardContent2}</WrapContainer>
            </Grid>
            <Grid item container xs={5}>
              <WrapContainer bgcolor={'#fff'}>{cardContent3}</WrapContainer>
            </Grid>
            <Grid item container xs={7}>
              <WrapContainer bgcolor={'#fff'}>{cardContent6}</WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>{cardContent5}</WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>{cardContent4}</WrapContainer>
            </Grid>
          </Grid>
        </MainContainer>
        <Modal
          open={open}
          modalTitle={modalTitle}
          handleModal={handleModal}
          content={<ModalContentExample />}
        />
      </Box>
    </>
  );
};

export default MrStatistics;
