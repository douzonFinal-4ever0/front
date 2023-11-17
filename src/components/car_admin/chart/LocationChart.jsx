import RoomIcon from '@mui/icons-material/Room';
import { Paper, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import axiosInstance from '../../../utils/axios';

const LocationChart = () => {
  // Ref 생성
  const mapContainerRef = useRef(null);

  const [markerData, setMarkerData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [mostAddress, setMostAddress] = useState('');

  const getLocation = () => {
    axiosInstance.axiosInstance
      .get('/manager/car/getLocationStatistics')
      .then((res) => {
        console.log(res.data);
        const newMakerData = res.data.map((item) => {
          return {
            title: item.car_rez_code, // 변경하고 싶은 key 이름으로 수정
            lat: item.latitude,
            lng: item.longitude
          };
        });
        setAddressData(
          res.data.map((item) => {
            return {
              address: item.address
            };
          })
        );
        setMarkerData(newMakerData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findMostCommonString = () => {
    // 빈칸이 두 번째로 나오는 지점 찾기
    const newAddress = addressData.map((item) => {
      const secondSpaceIndex = item.address.indexOf(
        ' ',
        item.address.indexOf(' ') + 1
      );

      // 빈칸이 두 번째로 나오는 부분까지의 부분 문자열 얻기
      const resultSubstring =
        secondSpaceIndex !== -1
          ? item.address.substring(0, secondSpaceIndex)
          : item.address;
      return resultSubstring;
    });

    console.log(newAddress);

    // 각 문자열의 카운트를 저장할 객체를 생성합니다.
    const countMap = {};

    // 문자열 배열을 순회하면서 카운트를 증가시킵니다.
    newAddress.forEach((item) => {
      countMap[item] = (countMap[item] || 0) + 1;
    });

    // 가장 많은 문자열을 찾습니다.
    let mostCommonString = '';
    let maxCount = 0;

    for (const key in countMap) {
      if (countMap[key] > maxCount) {
        mostCommonString = key;
        maxCount = countMap[key];
      }
    }

    setMostAddress(mostCommonString);
  };

  useEffect(() => {
    getLocation();
  }, []); // 비어있는 의존성 배열을 전달하여 한 번만 실행되도록 설정

  useEffect(() => {
    if (markerData.length > 0) {
      mapscript();
      findMostCommonString();
    }
  }, [markerData]); // markerData가 업데이트될 때마다 실행

  const mapscript = () => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 12
    };

    //map
    const map = new window.kakao.maps.Map(container, options);

    markerData.forEach((el) => {
      // 마커를 생성합니다
      new window.kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new window.kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title
      });
    });
  };

  return (
    <>
      <StyledBox>
        <Typography
          height="48px"
          display="flex"
          color="#ffd233"
          marginRight="6px"
          alignItems="center"
        >
          <RoomIcon fontSize="large" />
        </Typography>
        <Typography variant="h6">목적지 패턴</Typography>
      </StyledBox>
      <div
        id="map"
        style={{
          width: '95%',
          height: '100%',
          margin: 'auto'
        }}
      ></div>
      <StyledSubBox>
        <Typography variant="h4">💡</Typography>
        <Typography variant="subtitle2">{`이번주의 가장 많이 간 목적지 : ${mostAddress}`}</Typography>
      </StyledSubBox>
    </>
  );
};

export default LocationChart;

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  margin: '20px 20px 5px 20px',
  alignItems: 'center'
}));

const StyledSubBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  marginTop: 'auto',
  marginRight: '20px',
  marginLeft: '20px',
  paddingBottom: '20px',
  alignItems: 'center'
}));
