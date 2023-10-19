import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    open: false,
    content: '완료되었습니다.'
  },
  reducers: {
    openSanckbar: (state) => {
      state.open = true;
    },
    closeSanckbar: (state) => {
      state.open = false;
    },
    setSnackbarContent: (state, action) => {
      state.content = action.payload;
    }
  }
});

export const { openSanckbar, closeSanckbar, setSnackbarContent } =
  snackbarSlice.actions;
export default snackbarSlice.reducer;
