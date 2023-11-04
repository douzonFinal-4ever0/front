import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mr_List: [] // 즐겨찾기 회의실 리스트
};

const bmSlice = createSlice({
  name: 'bm',
  initialState,
  reducers: {
    setBmData(state, action) {
      const { data } = action.payload;
      return { ...state, data };
    }
  }
});

export const { setBmData } = bmSlice.actions;
export default bmSlice.reducer;
