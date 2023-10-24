import { createSlice } from '@reduxjs/toolkit';
import { getFormattedDate } from '../../utils/formatDate';

const initialState = {
  m_name: '', // 회의명
  m_type: '프로젝트 회의', // 회의 종류,
  rez_date: getFormattedDate(), // 예약 날짜
  rez_start_time: '09:00', // 예약 시작 시간
  rez_end_time: '09:30', // 예약 종료 시간
  tot_pt_ctn: '2', // 총 인원수,
  rez_type: '0', // 예약 구분 (0:일반/1:정기)
  mr_pt_list: [] // 회의 참석자 리스트
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
