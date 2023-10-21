import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { getFormattedDate } from '../../utils/formatDate';

const initialState = {
  mPurpose: '', // 회의 목적
  mType: '프로젝트 회의', // 회의 종류,
  rezDate: dayjs(getFormattedDate()), // 예약 날짜
  rezStartTime: '9:00', // 예약 시작 시간
  rezEndTime: '9:00', // 예약 종료 시간
  totPtCtn: '2' // 총 인원수
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
