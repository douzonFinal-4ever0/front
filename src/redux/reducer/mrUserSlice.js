import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { getFormattedDate } from '../../utils/formatDate';

const initialState = {
  mType: '', // 회의 종류,
  mPurpose: '', // 회의 목적
  rezDate: '', // 예약 날짜
  rezStartTime: '', // 예약 시작 시간
  rezEndTime: '', // 예약 종료 시간
  totPtCtn: '' // 총 인원수
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
