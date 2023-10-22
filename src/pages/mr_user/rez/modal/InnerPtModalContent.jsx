import { Grid } from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import Toggle from '../../../../components/common/Toggle';
import { useState } from 'react';

const InnerPtModalContent = () => {
  // 선택된 토글 버튼 값
  const [selectBtn, setSeletBtn] = useState('calender');
  // 토글 버튼 이벤트
  const handleToggleBtn = (event) => {
    setSeletBtn(event.currentTarget.value);
  };
  // 토글버튼 데이터
  const data = [
    {
      index: 0,
      value: 'all',
      name: '전체'
    },
    {
      index: 1,
      value: 'bookmark',
      name: '즐겨찾기'
    }
  ];
  return (
    <WrapContainer bgcolor={'#fff'}>
      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={6}>
          <Toggle
            data={data}
            selectBtn={selectBtn}
            handleToggleBtn={handleToggleBtn}
          />
        </Grid>
        <Grid item xs={6}>
          엄마
        </Grid>
      </Grid>
    </WrapContainer>
  );
};

export default InnerPtModalContent;
