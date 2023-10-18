import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    isDrawerOpen: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
