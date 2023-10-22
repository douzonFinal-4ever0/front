import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mem_code: 'MEM001', // 사번
  name: '이기원' // 성명
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      const { data } = action.payload;
      return { ...state, ...data };
    }
  }
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
