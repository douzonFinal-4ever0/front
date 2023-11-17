import { configureStore } from '@reduxjs/toolkit';
import bmReducer from './reducer/BmSlice';
import DrawerReducer from './reducer/DrawerSlice';
import mrListReducer from './reducer/MrListSlice';
import mrRecommendReducer from './reducer/MrRecommendSlice';
import SnackbarReducer from './reducer/SnackbarSlice';
import mrUserReducer from './reducer/mrUserSlice';
import userReducer from './reducer/userSlice';
import SocketReducer from './reducer/SocketReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    mrUser: mrUserReducer,
    drawer: DrawerReducer,
    snackbar: SnackbarReducer,
    mrRecommend: mrRecommendReducer,
    bm: bmReducer,
    mrList: mrListReducer,
    socket: SocketReducer
  }
});

export default store;
