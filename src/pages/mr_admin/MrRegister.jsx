import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon
} from '@mui/material';
import SubSidebar from '../../components/common/SubSidebar';
import SubHeader from '../../components/common/SubHeader';
import MrRegistForm from '../../components/mr_admin/MrRegistForm';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import Drawer from '../../components/common/Drawer';
import { openDrawer } from '../../redux/reducer/DrawerSlice';
import { useDispatch } from 'react-redux';
import DataGrid from '../../components/common/DataGrid';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../../components/common/RectangleBtn';
import ExcelImport from '../../components/mr_admin/ExcelImport.jsx';
import { Circle } from '@mui/icons-material';

const MrRegister = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const dispatch = useDispatch();
  // const meetingRooms = useSelector((state) => state.mrList.meetingRooms);

  /**오프캔버스 열기 */
  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };
  const SubContent = ({ mrList, setMrList }) => {
    const handleFilterClick = (type) => {
      const filteredList = mrList.filter((item) => item.mr_type === type);
      setFilteredMrList(filteredList);
    };
    const handleClick = () => {
      setFilteredMrList(mrList);
      console.log('전체 회의실');
      console.log(filteredMrList);
    };
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
        <Divider />
        <Box sx={{ width: '100%' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemText primary={`전체 회의실(${mrList.length})`} />
              </ListItemButton>
            </ListItem>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleFilterClick('미팅룸');
                    console.log('미팅룸');
                  }}
                >
                  <ListItemIcon>
                    <Circle sx={{ width: '15px !important' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`미팅룸 (${
                      mrList.filter((obj) => obj.mr_type === '미팅룸').length
                    })`}
                    primaryTypographyProps={{ fontSize: '13px' }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleFilterClick('소회의실');
                    console.log('소회의실');
                  }}
                >
                  <ListItemIcon>
                    <Circle color="primary" sx={{ width: '15px !important' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`소회의실 (${
                      mrList.filter((obj) => obj.mr_type === '소회의실').length
                    })`}
                    primaryTypographyProps={{ fontSize: '13px' }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleFilterClick('중회의실');
                    console.log('중회의실');
                  }}
                >
                  <ListItemIcon>
                    <Circle color="error" sx={{ width: '15px !important' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`중회의실 (${
                      mrList.filter((obj) => obj.mr_type === '중회의실').length
                    })`}
                    primaryTypographyProps={{ fontSize: '13px' }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleFilterClick('대회의실');
                    console.log('대회의실');
                  }}
                >
                  <ListItemIcon>
                    <Circle color="success" sx={{ width: '15px !important' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`대회의실 (${
                      mrList.filter((obj) => obj.mr_type === '대회의실').length
                    })`}
                    primaryTypographyProps={{ fontSize: '13px' }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
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
  const [filteredMrList, setFilteredMrList] = useState([]);

  const handleMrListUpdate = () => {
    axiosInstance.axiosInstance
      .get('/mr/mrList')
      .then((res) => {
        const processedData = res.data.map((item) => ({
          ...item,
          id: item.mr_code,
          is_opened: item.is_opened === 0 ? '활성' : '비활성',
          is_used: item.is_used === 0 ? '사용중' : '비어있음'
        }));
        setMrList(processedData);
        setFilteredMrList(processedData);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  // useEffect를 사용하여 초기 데이터 가져오기
  useEffect(() => {
    handleMrListUpdate();
  }, []);

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
    },
    !isEditMode
      ? {
          title: '엑셀 등록',
          content: <ExcelImport />
        }
      : ''
  ];
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
        <SubSidebar
          widthP={20}
          content={<SubContent mrList={mrList} setMrList={setMrList} />}
        />
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <DataGrid
              columns={columns}
              rows={filteredMrList}
              pageSize={10}
              pageSizeOptions={[5, 10]}
              clickEvent={handleDbClick}
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
