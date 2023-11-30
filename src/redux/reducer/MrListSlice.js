// 첫 번째 코드
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios.js';

const mrListSlice = createSlice({
  name: 'mrList',
  initialState: {
    mrList: [],
    filteredMrList: []
  },
  reducers: {
    setMrList: (state, action) => {
      state.mrList = action.payload;
      state.filteredMrList = action.payload;
    },
    setFilteredMrList: (state, action) => {
      state.filteredMrList = action.payload;
    },
    updateMrList: (state, action) => {
      state.mrList = action.payload;
      state.filteredMrList = action.payload;
    }
  }
});
export const { setMrList, setFilteredMrList } = mrListSlice.actions;
export default mrListSlice.reducer;

export const handleMrListUpdate = () => (dispatch) => {
  axiosInstance.axiosInstance
    .get('/mr/mrList')
    .then((res) => {
      const processedData = res.data.map((item) => ({
        ...item,
        id: item.mr_code,
        is_opened: item.is_opened === 0 ? '활성' : '비활성',
        is_used: item.is_used === 0 ? '사용중' : '비어있음'
      }));

      // 액션 디스패치
      dispatch(setMrList(processedData));
      dispatch(setFilteredMrList(processedData));
    })
    .catch((error) => {
      console.error('데이터 가져오기 오류:', error);
    });
};
