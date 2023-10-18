import { configureStore } from '@reduxjs/toolkit';
import mrUserReducer from './reducer/mrUserSlice';
import DrawerReducer from './reducer/DrawerSlice';

const store = configureStore({
  reducer: {
    mrUser: mrUserReducer,
    drawer : DrawerReducer
  }
});

export default store;
