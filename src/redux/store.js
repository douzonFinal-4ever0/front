import { configureStore } from '@reduxjs/toolkit';
import mrUserReducer from './reducer/mrUserSlice';

const store = configureStore({
  reducer: {
    mrUser: mrUserReducer
  }
});

export default store;
