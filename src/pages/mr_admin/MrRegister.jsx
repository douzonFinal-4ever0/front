import React, { useEffect } from 'react';
import { useState } from 'react';
import { Paper, styled, Box, Button, Grid, Divider } from '@mui/material';
import Calendar from '../../components/common/Calendar';
import SubSidebar from '../../components/common/SubSidebar';
import SubHeader from '../../components/common/SubHeader';
import MrRegistForm from '../../components/mr_admin/MrRegistForm';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import Drawer from '../../components/common/Drawer';
import { openDrawer, closeDrawer } from '../../redux/reducer/DrawerSlice';
import { useDispatch, useSelector } from 'react-redux';
import DataGrid from '../../components/common/DataGrid';
import axios from 'axios';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../../components/common/RectangleBtn';
const MrRegister = () => {
  // const token = localStorage.getItem('jwtToken'); // localStorage에서 토큰을 가져옴

  // axios.defaults.headers.common['Authorization'] = token;
  // const [jwtToken, setJwtToken] = useState('');
  // // JWT 토큰을 localStorage에서 가져오기
  // useEffect(() => {
  //   const storedJwtToken = localStorage.getItem('jwtToken');
  //   if (storedJwtToken) {
  //     setJwtToken(storedJwtToken);
  //   }
  // }, []);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  /**탭에 들어가는 데이터 */
  const tabData = [
    {
      title: isEditMode ? '회의실 수정' : '회의실 등록',
      content: (
        <MrRegistForm
          selectedRowData={selectedRowData}
          isEditMode={isEditMode}
        />
      )
    }
  ];
  const dispatch = useDispatch();

  /**오프캔버스 열기 */
  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };
  /**오프캔버스 닫기 */
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };
  const SubContent = () => {
    return (
      <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
        <RectangleBtn
          category={'register'}
          text={'회의실 등록'}
          sx={{
            padding: '14px 12px',
            margin: '1px',
            width: '100%'
          }}
          handlebtn={handleMrRegistClick}
        />
      </Grid>
    );
  };
  const handleMrRegistClick = () => {
    setSelectedRowData(null);
    setIsEditMode(false);
    handleOpenDrawer();
  };
  /*------------------------------데이터 그리드에 전달할 정보------------------------------------------*/
  const [mrList, setMrList] = useState([]);
  const handleMrListUpdate = () => {
    axiosInstance
      .get('/mr/mrList')
      .then((res) => {
        const processedData = res.data.map((item) => ({
          ...item,
          id: item.mr_code,
          is_opened: item.is_opened === 0 ? '활성' : '비활성',
          is_used: item.is_used === 0 ? '사용중' : '대기중'
        }));
        setMrList(processedData);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  // useEffect를 사용하여 초기 데이터 가져오기
  useEffect(() => {
    handleMrListUpdate();
  }, []);
  /*---------------------------------------------------------------------------------------------------------*/
  /**데이터 그리드 더블 클릭이벤트 */
  const handleDbClick = (params) => {
    // params 객체를 통해 선택된 행의 데이터에 접근
    const selectedRowData = params.row;
    setSelectedRowData(selectedRowData);
    setIsEditMode(true);
    // 이제 selectedRowData를 사용할 수 있음
    // console.log('선택된 행의 데이터:', selectedRowData);
    handleOpenDrawer();
  };
  return (
    <>
      <SubHeader title={'회의실'} />
      <Box sx={{ display: 'flex', height: '95%' }}>
        <SubSidebar widthP={20} content={<SubContent />} />
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Box sx={{ display: 'flex', width: 'auto' }}></Box>
            <DataGrid
              columns={columns}
              rows={mrList}
              pageSize={10}
              pageSizeOptions={[5, 10]}
              dbclickEvent={handleDbClick}
              sx={{ width: 'auto' }}
            />
          </WrapContainer>
        </MainContainer>
      </Box>
      <Drawer width={600} tabData={tabData} />
    </>
  );
};

export default MrRegister;

/**서브 사이드바에 들어가는 컨텐츠 */

/**데이터 그리드에 들어가는 헤더(열) 부분 */
const columns = [
  { field: 'mr_code', headerName: '번호', width: 120 },
  { field: 'mr_name', headerName: '회의실 이름', width: 160 },
  { field: 'mr_type', headerName: '분류', width: 160 },
  {
    field: 'location',
    headerName: '위치',
    width: 160
  },
  { field: 'maximum_capacity', headerName: '최대 인원', width: 160 },
  { field: 'is_opened', headerName: '개방 여부', width: 160 },
  { field: 'is_used', headerName: '사용중', width: 160 }
];
