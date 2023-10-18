import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const KakaoMap2 = ({ carRezCode }) => {
  const container = useRef(null);
  const [initialKakao, setInitialKaKao] = useState(null);
  const [reactMap, setReactMap] = useState(null);
  const [locations, setLocations] = useState([]);
  /**
   * 지도 클릭시 마커를 이동하고 위도, 경도를 표시한다.
//    * @param mouseEvent : 이벤트
//    * @param marker : 마커객체
   */
  //   const handleMapClick = (mouseEvent, marker) => {
  //     const latlng = mouseEvent.latLng;
  //     const newMessage = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;
  //     console.log(newMessage);

  //     marker.setPosition(latlng);
  //   };
  console.log(locations);
  //시작 : kakao map 글로벌객체를 state에 담는다.(나중에 쓰기편하게)
  useEffect(() => {
    if (!container.current) return;
    const kakao = window.kakao.maps;
    setInitialKaKao(kakao);
  }, [container]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/car_rez/locations/${carRezCode}`)
      .then((res) => {
        console.log(res.data);
        setLocations(res.data);
        // res.data.map((location) => {
        //   setLocations(...locations, {
        //     loc_type: location.loc_type,
        //     lat: location.latitude,
        //     lng: location.longitude,
        //     address: location.address
        //   });
        //   console.log(locations);
        //   console.log('asdasdasd');
        // });
        // setLocations(res.data);
        console.log(locations);
      });
  }, []);
  //카카오맵을 그리고, 마커도 그리고, 지도클릭시에 마커이동
  useEffect(() => {
    console.log(locations);
    if (locations.length > 0) {
      console.log(locations);
      if (!initialKakao) return;
      if (!container.current) return;
      const options = {
        center: new initialKakao.LatLng(
          locations[2].latitude,
          locations[2].longitude
        ),
        level: 3
      };
      //지도와 마커를 셋팅함
      const map = new initialKakao.Map(container.current, options);

      setReactMap(map);
      const marker = new initialKakao.Marker({
        position: map.getCenter()
      });

      //클릭 이벤트
      //   initialKakao.event.addListener(map, 'click', (mouseEvent) =>
      //     handleMapClick(mouseEvent, marker)
      //   );

      //   return () =>
      //     initialKakao.event.removeListener(map, 'click', handleMapClick);
    }
  }, [initialKakao, container]);

  //컨트롤바
  useEffect(() => {
    if (!reactMap) return;
    if (!initialKakao) return;

    const mapTypeControl = new initialKakao.MapTypeControl();
    reactMap.addControl(mapTypeControl, initialKakao.ControlPosition.TOPRIGHT);

    const zoomControl = new initialKakao.ZoomControl();
    reactMap.addControl(zoomControl, initialKakao.ControlPosition.RIGHT);
  }, [reactMap, initialKakao]);

  return (
    <>
      <div
        className="map"
        ref={container}
        style={{ width: 800, height: '90vh' }}
      ></div>
    </>
  );
};

export default KakaoMap2;
