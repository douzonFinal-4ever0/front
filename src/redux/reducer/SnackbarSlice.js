import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    open: false,
    content: '완료되었습니다.',
    status: 'success'
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
    },
    setSnackbarStatus: (state, action) => {
      state.status = action.payload;
    }
  }
});

export const {
  openSanckbar,
  closeSanckbar,
  setSnackbarContent,
  setSnackbarStatus
} = snackbarSlice.actions;
export default snackbarSlice.reducer;
