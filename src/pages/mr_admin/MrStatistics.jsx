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
  const [mrRez, setMrRez] = useState();
  const [mrRezRank, setMrRezRank] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [mrRezRow, setMrRezRow] = useState({});
  const [mrRezTime, setMrRezTime] = useState({});
  const [mrRezType, setMrRezType] = useState([]);
  const [mrRezDate, setMrRezDate] = useState({});
  const [mrRezFavTime, setMrRezFavTime] = useState({});

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
    axiosInstance.axiosInstance
      .get('mr/mrRezDate')
      .then((res) => {
        setMrRezDate(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
    axiosInstance.axiosInstance
      .get('mr/mrRezFavTime')
      .then((res) => {
        setMrRezFavTime(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);

  const groupedData = Array.isArray(mrRezRank)
    ? mrRezRank.reduce((acc, item) => {
        const { mr_code, img_url, mr_name, rez_cnt } = item;
        acc[mr_code] = acc[mr_code] || {
          mr_code,
          mr_name,
          rez_cnt,
          img_url: []
        };
        acc[mr_code].img_url.push(img_url);
        return acc;
      }, {})
    : {};

  // Convert the grouped data into an array
  const result = Object.values(groupedData);

  // 현재 날짜를 얻기 위해 새로운 Date 객체를 생성
  const currentDate = new Date();

  // 현재 주의 월요일 날짜를 계산
  const currentMonday = new Date(currentDate);
  currentMonday.setDate(
    currentDate.getDate() -
      currentDate.getDay() +
      (currentDate.getDay() === 0 ? -6 : 1)
  );

  // 저번주 월요일을 계산
  const lastMonday = new Date(currentMonday);
  lastMonday.setDate(currentMonday.getDate() - 7);

  // 함수를 통해 필요한 날짜 배열을 추출
  const getWeekDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const weekDates = [];

    while (startDate <= endDate) {
      weekDates.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }

    return weekDates;
  };

  // 저번주 월요일부터 금요일까지의 날짜 배열
  const lastWeekDates = getWeekDates(
    lastMonday,
    new Date(lastMonday.getTime() + 4 * 24 * 60 * 60 * 1000)
  );

  // 이번주 월요일부터 금요일까지의 날짜 배열
  const currentWeekDates = getWeekDates(
    currentMonday,
    new Date(currentMonday.getTime() + 4 * 24 * 60 * 60 * 1000)
  );

  const lastWeekCntData = lastWeekDates.map((date) => {
    if (Array.isArray(mrRezDate)) {
      // currentWeekDates 배열의 날짜와 일치하는 mrRezData의 데이터를 찾음
      const matchingData = mrRezDate.find((data) =>
        data.rez_date.includes(date)
      );

      // 일치하는 데이터가 있으면 해당 데이터의 cnt 값을 반환, 없으면 0을 반환
      return matchingData ? matchingData.cnt : 0;
    } else {
      // data가 배열이 아닌 경우에 대한 처리 (예: 기본값 설정 또는 오류 처리)
      return 0; // 또는 다른 적절한 값을 반환
    }
  });
  const currentWeekCntData = currentWeekDates.map((date) => {
    if (Array.isArray(mrRezDate)) {
      // currentWeekDates 배열의 날짜와 일치하는 mrRezData의 데이터를 찾음
      const matchingData = mrRezDate.find((data) =>
        data.rez_date.includes(date)
      );

      // 일치하는 데이터가 있으면 해당 데이터의 cnt 값을 반환, 없으면 0을 반환
      return matchingData ? matchingData.cnt : 0;
    } else {
      // data가 배열이 아닌 경우에 대한 처리 (예: 기본값 설정 또는 오류 처리)
      return 0; // 또는 다른 적절한 값을 반환
    }
  });

  const lastWeekSum = lastWeekCntData.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // reduce 메서드를 사용하여 배열의 합을 계산
  const currentWeekSum = currentWeekCntData.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // 모든 시간대를 포함한 배열 생성
  const allTimeSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '12:00',
    '12:30',
    '13:00',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00'
  ];

  // mrRezFavTime의 시간대를 기준으로 데이터 매핑
  const FavTime = Array.isArray(mrRezFavTime)
    ? allTimeSlots.map((time) => {
        const correspondingObject = mrRezFavTime.find(
          (obj) => obj.rez_time === time
        );
        return correspondingObject ? correspondingObject.rez_cnt : 0;
      })
    : [];

  const mrRezFavTimeArray = Object.values(mrRezFavTime);
  const maxRezCntItem = mrRezFavTimeArray.reduce(
    (maxItem, currentItem) => {
      return currentItem.rez_cnt > maxItem.rez_cnt ? currentItem : maxItem;
    },
    { rez_cnt: -1 }
  );

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
  // 30분 간격으로 배열을 생성합니다.
  const resultArray = new Array(18).fill(0); // 30분 간격으로 총 18개의 데이터가 있음

  Object.keys(mrRezTime).forEach((key) => {
    const data = mrRezTime[key];
    const index = data.minutes / 30 - 1; // 배열 인덱스 계산
    resultArray[index] = data.rez_cnt;
  });

  // Object.values()를 사용하여 배열로 변환
  const mrRezTimeArray = Object.values(mrRezTime);
  // reduce 함수를 사용하여 계산
  const sumOfProducts = mrRezTimeArray.reduce(
    (sum, item) => sum + item.minutes * item.rez_cnt,
    0
  );
  const sumOfRezCnt = mrRezTimeArray.reduce(
    (sum, item) => sum + item.rez_cnt,
    0
  );
  // 평균 계산
  const average = sumOfProducts / sumOfRezCnt;
  const totalTime = average / 60;
  const hours = Math.floor(average / 60); // 정수 부분
  const minutes = Math.round((totalTime - hours) * 60);

  const handleClickAvgRezTime = () => {
    setModalContent(
      <MrRezTimeChart height={'500px'} width={'500px'} data={resultArray} />
    );
    setModalTitle('회의시간 통계');
    handleModal();
  };

  const handleClickMostTime = () => {
    setModalContent(
      <MrMostTimeChart height={'500px'} width={'500px'} data={FavTime} />
    );
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
        ⏰평균 회의 시간
      </Typography>
      <CardActionArea onClick={handleClickAvgRezTime}>
        <MrRezTimeChart height={300} width={'auto'} data={resultArray} />
      </CardActionArea>
      <Typography variant="body1">
        💡평균 {hours}시간 {minutes}분 사용합니다.
      </Typography>
    </CardContent>
  );

  const cardContent2 = (
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        ⚙️회의실 사용률
      </Typography>
      <MrUsageChart
        height={300}
        // width={'auto'}
        width={'auto'}
        data={[
          { value: mrRezRow.rez_row_count, name: '사용 ' },
          { value: mrRezRow.total - mrRezRow.rez_row_count, name: '미사용 ' }
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
        🕘사용 시간대
      </Typography>
      <CardActionArea onClick={handleClickMostTime}>
        <MrMostTimeChart width={'auto'} height={300} data={FavTime} />
      </CardActionArea>
      <Typography variant="body1">
        💡가장 붐비는 시간대는 {maxRezCntItem.rez_time} 입니다.
      </Typography>
    </CardContent>
  );
  // 변환할 데이터 구조
  // const data = mrRezType.map((item) => ({
  //   value: item.rez_cnt,
  //   name: item.mr_type
  // }));
  const mrType =
    Array.isArray(mrRezType) &&
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
      <Grid container spacing={3} mb={1} mt={1}>
        {[0, 1, 2].map((index) => (
          <Grid item xs={4} key={index}>
            <CardActionArea
              onClick={() => {
                handleMrInfo(result[index]?.mr_code);
              }}
            >
              <CardMedia
                component="img"
                image={result[index]?.img_url[0]}
                style={{ borderRadius: '15px' }}
              />
            </CardActionArea>

            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: 'center' }}
            >
              {result[index]?.mr_name}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              {result[index]?.rez_cnt}회
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1">
        💡{result[0]?.mr_name}호가 가장 인기가 많습니다.
      </Typography>
    </CardContent>
  );
  const cardContent6 = (
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        📈주간 예약 현황
      </Typography>
      <MrContrastChart
        width={'auto'}
        height={300}
        currentWeekDates={currentWeekDates}
        lastWeekDates={lastWeekDates}
        lastWeekCntData={lastWeekCntData}
        currentWeekCntData={currentWeekCntData}
      />
      <Typography variant="body1">
        💡지난주에 비해 {Math.abs(currentWeekSum - lastWeekSum)}건의 회의실
        예약이 {currentWeekSum - lastWeekSum >= 0 ? '증가' : '감소'}되었습니다.
      </Typography>
    </CardContent>
  );
  return (
    <>
      <SubHeader title={'회의실 통계'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <Grid container spacing={3}>
            {/* <Grid xs={12}>
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
            </Grid> */}
            <Grid item container xs={5}>
              <WrapContainer bgcolor={'#fff'}>{cardContent2}</WrapContainer>
            </Grid>
            <Grid item container xs={7}>
              <WrapContainer bgcolor={'#fff'}>{cardContent1}</WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>{cardContent3}</WrapContainer>
            </Grid>
            <Grid item container xs={6}>
              <WrapContainer bgcolor={'#fff'}>{cardContent6}</WrapContainer>
            </Grid>
            <Grid item container xs={7}>
              <WrapContainer bgcolor={'#fff'}>{cardContent5}</WrapContainer>
            </Grid>
            <Grid item container xs={5}>
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
