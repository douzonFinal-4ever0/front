import { configureStore } from '@reduxjs/toolkit';
import mrUserReducer from './reducer/mrUserSlice';
import DrawerReducer from './reducer/DrawerSlice';
import SnackbarReducer from './reducer/SnackbarSlice';
import userReducer from './reducer/userSlice';
import mrRecommendReducer from './reducer/MrRecommendSlice';
import bmReducer from './reducer/BmSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    mrUser: mrUserReducer,
    drawer: DrawerReducer,
    snackbar: SnackbarReducer,
    mrRecommend: mrRecommendReducer,
    bm: bmReducer
  }
});

export default store;
