import React from 'react';
import CommonSpinner from '../../components/common/Spinner';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../components/common/Spinner';

const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // 여기에서 데이터를 가져오거나 비동기 작업을 수행
    // 데이터 로딩이 완료되면 setIsLoading(false)를 호출하여 스피너를 숨김
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3초 후에 로딩 완료로 설정 (예제용)
  }, []);
  return (
    <div>
      {/* 여기에 로딩이 완료된 후 표시할 내용을 추가 */}
      <p>11111111111111111111111</p>
      <Spinner isLoading={isLoading} />
    </div>
  );
};

export default DashBoard;
