import axios from 'axios';
import React, { useEffect, useState } from 'react';

const KakaoMap3 = ({ locations, titles, contents }) => {
  var map;
  //   // 인포윈도우 열림 상태를 저장하는 state
  //   const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  let isInfoWindowOpen = false;
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.5563, 126.79581),
      level: 7
    };
    map = new window.kakao.maps.Map(mapContainer, mapOption);

    addMarkers();
  }, [locations]);

  const addMarkers = async () => {
    if (locations.length === 0) return; // 만약 locations가 비어있다면 종료

    // 타일 데이터가 모두 로딩될 때까지 대기
    await new Promise((resolve) => {
      new window.kakao.maps.event.addListener(map, 'tilesloaded', () => {
        resolve();
      });
    });

    // 마커 이미지의 이미지 주소
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    var markers = [];
    const overlays = [];
    const infowindow = [];
    for (let i = 0; i < locations.length; i++) {
      const position = locations[i];
      const latlng2 = new window.kakao.maps.LatLng(
        position.latitude,
        position.longitude
      );
      //const latlng = new window.kakao.maps.LatLng(33.55635, 126.795841);
      //console.log(latlng);
      console.log(latlng2);
      const imageSize = new window.kakao.maps.Size(24, 35);
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize
      );

      // 마커를 생성하여 지도에 표시
      markers[i] = new window.kakao.maps.Marker({
        map: map,
        position: latlng2,
        title: titles[i], // 마커의 타이틀
        image: markerImage // 마커 이미지
      });
      // 인포윈도우를 생성하는 코드
      infowindow[i] = new window.kakao.maps.InfoWindow({
        // content: `<div style="padding:5px;">${markers[
        //   i
        // ].getTitle()}<br/>주소 : <br/>
        // ${contents[i]}
        // </div>`
        content:
          '<div style={infoStyle} class="wrap">' +
          '    <div style={wrapStyle} class="info">' +
          '        <div style={titleStyle} class="title">' +
          '            카카오 스페이스닷원' +
          '            <div style={closeStyle} class="close" onclick="closeOverlay()" title="닫기"></div>' +
          '        </div>' +
          '        <div style={bodyStyle} class="body">' +
          '            <div style={descStyle} class="desc">' +
          '                <div style={ellipsisStyle} class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
          '                <div style={jibunStyle} class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
          '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
          '            </div>' +
          '        </div>' +
          '    </div>' +
          '</div>',
        removable: true
      });
    }

    for (let i = 0; i < markers.length; i++) {
      window.kakao.maps.event.addListener(markers[i], 'click', function () {
        // infowindow[i].open(map, markers[i]);
        console.log(isInfoWindowOpen);
        if (isInfoWindowOpen) {
          // 이미 열려있으면 닫음
          infowindow[i].close();
        } else {
          // 열려있지 않으면 엶
          infowindow[i].open(map, markers[i]);
        }
        // 상태 업데이트
        isInfoWindowOpen = !isInfoWindowOpen;
        console.log(isInfoWindowOpen);
      });
    }

    map.setCenter(
      new window.kakao.maps.LatLng(
        locations[2].latitude,
        locations[2].longitude
      )
    );
  };

  return (
    <div id="map" style={{ width: '100%', height: '100%' }}>
      {/* Kakao 지도가 표시될 div */}
    </div>
  );
};

export default KakaoMap3;
