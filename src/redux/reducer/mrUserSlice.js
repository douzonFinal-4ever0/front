import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mType: 'esther1', // 회의 종류
  rezDate: 'esther2', // 예약 날짜
  rezStartTime: 'esther3', // 예약 시작 시간
  rezEndTime: 'esther4', // 예약 종료 시간
  totPtCtn: 'esther5' // 총 인원수
};

const mrUserSlice = createSlice({
  name: 'mrUser',
  initialState,
  reducers: {
    setRezData(state, action) {
      const { data } = action.payload;
      return { ...state, ...data };
    }
  }
});

export const { setRezData } = mrUserSlice.actions;
export default mrUserSlice.reducer;
