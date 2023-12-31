import { Button } from '@mui/material';
import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import RectangleBtn from '../common/RectangleBtn';
import { palette } from '../../theme/palette';
//import { useDaumPostcodePopup } from './useDaumPostcodePopup'; // useDaumPostcodePopup 함수를 가져옵니다

// Daum Postcode 스크립트 URL
const postcodeScriptUrl =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

function DaumPost({ setAddressObj, setFormData, formData }) {
  // 클릭 시 수행될 팝업 생성 함수
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; // 추가될 주소
    let localAddress = data.sido + ' ' + data.sigungu; // 지역 주소 (시, 도 + 시, 군, 구)
    if (data.addressType === 'R') {
      // 주소 타입이 도로명 주소일 경우
      if (data.bname !== '') {
        extraAddress += data.bname; // 법정동, 법정리
      }
      if (data.buildingName !== '') {
        // 건물명
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      // 지역 주소 제외 전체 주소 치환
      fullAddress = fullAddress.replace(localAddress, '');
      // 조건 판단 완료 후 지역 주소 및 상세 주소 state 수정

      setAddressObj({
        areaAddress: localAddress,
        townAddress: (fullAddress +=
          extraAddress !== '' ? `(${extraAddress})` : '')
      });

      // 주소 검색이 완료된 후 결과를 매개변수로 전달
      // 다음에 수행할 작업을 명시
      if (setFormData) {
        setFormData({
          ...formData,
          dest_loc:
            localAddress +
            (fullAddress += extraAddress !== '' ? `(${extraAddress})` : '')
        });
      }
    }
  };

  // 클릭 시 발생할 이벤트
  const handleClick = () => {
    // 주소 검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행

    open({ onComplete: handleComplete });
  };

  return (
    // <Button type="button" onClick={handleClick}>
    //   주소찾기
    // </Button>
    <RectangleBtn
      type={'button'}
      text={'목적지 검색'}
      sx={{
        padding: '14px 12px',
        backgroundColor: palette.grey['500']
      }}
      handlebtn={handleClick}
    />
  );
}

export default DaumPost;
