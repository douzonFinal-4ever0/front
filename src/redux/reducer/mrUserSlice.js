import { createSlice } from '@reduxjs/toolkit';
import { getFormattedDate } from '../../utils/formatDate';

const initialState = {
  m_name: '', // 회의명
  m_type: '프로젝트 회의', // 회의 종류,
  rez_date: getFormattedDate(), // 예약 날짜
  rez_start_time: '9:00', // 예약 시작 시간
  rez_end_time: '9:30', // 예약 종료 시간
  tot_pt_ctn: '2' // 총 인원수
};

const mrUserSlice = createSlice({
  name: 'mrUser',
  initialState,
  reducers: {
    setRezData(state, action) {
      const { data } = action.payload;
      console.log({ ...state, ...data });
      return { ...state, ...data };
    }
  }
});

export const { setRezData } = mrUserSlice.actions;
export default mrUserSlice.reducer;
