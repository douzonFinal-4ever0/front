import { configureStore } from '@reduxjs/toolkit';
import mrUserReducer from './reducer/mrUserSlice';
import DrawerReducer from './reducer/DrawerSlice';
import SnackbarReducer from './reducer/SnackbarSlice';
import userReducer from './reducer/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    mrUser: mrUserReducer,
    drawer: DrawerReducer,
    snackbar: SnackbarReducer
  }
});

export default store;
