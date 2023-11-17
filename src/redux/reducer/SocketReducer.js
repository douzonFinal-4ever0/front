import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const socketSlice = createSlice({
  name: 'mySocket',
  initialState,
  reducers: {
    setSocket(state, action) {
      const { data } = action.payload;
      return { ...state, ...data };
    }
  }
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
