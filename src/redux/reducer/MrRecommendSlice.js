import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [] // 추천 회의실 리스트
};

const mrRecommendSlice = createSlice({
  name: 'mrRecommend',
  initialState,
  reducers: {
    setMrRecommendData(state, action) {
      const { data } = action.payload;
      return { ...state, list: data };
    }
  }
});

export const { setMrRecommendData } = mrRecommendSlice.actions;
export default mrRecommendSlice.reducer;
