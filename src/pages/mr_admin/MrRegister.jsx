import { Circle } from '@mui/icons-material';
import {
  Box,
  Chip,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataGrid from '../../components/common/DataGrid';
import Drawer from '../../components/common/Drawer';
import RectangleBtn from '../../components/common/RectangleBtn';
import Spinner from '../../components/common/Spinner.jsx';
import SubHeader from '../../components/common/SubHeader';
import SubSidebar from '../../components/common/SubSidebar';
import ExcelDownloadButton from '../../components/mr_admin/ExcelDownloadButton.jsx';
import ExcelImport from '../../components/mr_admin/ExcelImport.jsx';
import MrRegistForm from '../../components/mr_admin/MrRegistForm';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { openDrawer } from '../../redux/reducer/DrawerSlice';
import axiosInstance from '../../utils/axios.js';

const MrRegister = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          px: 2,
          '& .MuiPaper-rounded2': {
            mt: 1,
            backgroundColor: '#f5f5f5',
            height: '64.5vh'
          }
        }}
      >
        <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
          <RectangleBtn
            category={'register'}
            text={'회의실 등록'}
            sx={{
              padding: '14px 12px',
              width: '100%'
            }}
            handlebtn={handleMrRegistClick}
          />
        </Grid>
        <Divider />
        <Box sx={{ width: '100%' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <Circle sx={{ width: '15px !important', color: '#bdbdbd' }} />
                </ListItemIcon>
                <ListItemText primary={`전체 회의실(${mrList.length})`} />
              </ListItemButton>
            </ListItem>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleFilterClick('미팅룸');
                  }}
                >
                  <ListItemIcon>
                    <Circle
                      sx={{ width: '15px !important', color: '#ffecb3' }}
                    />
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
                  }}
                >
                  <ListItemIcon>
                    <Circle
                      sx={{ width: '15px !important', color: '#bbdefb' }}
                    />
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
                  }}
                >
                  <ListItemIcon>
                    <Circle
                      sx={{ width: '15px !important', color: '#dcedc8' }}
                    />
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
                  }}
                >
                  <ListItemIcon>
                    <Circle
                      sx={{ width: '15px !important', color: '#f3e5f5' }}
                    />
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
      </Box>
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  const updatemrList = useSelector((state) => state.mrList);
  // useEffect를 사용하여 초기 데이터 가져오기
  useEffect(() => {
    handleMrListUpdate();
  }, [updatemrList]);

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
      : '',
    !isEditMode
      ? {
          title: <ExcelDownloadButton />
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
      <Spinner isLoading={isLoading} />
      <SubHeader title={'회의실'}></SubHeader>
      <Box sx={{ display: 'flex', height: '95%' }}>
        <SubSidebar
          widthP={20}
          content={<SubContent mrList={mrList} setMrList={setMrList} />}
        />
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Box
              sx={{
                width: '100%',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f0f0f0'
                },
                border: '1px solid'
              }}
            >
              <DataGrid
                columns={columns}
                rows={filteredMrList}
                pageSize={10}
                pageSizeOptions={[5, 10]}
                clickEvent={handleDbClick}
                sx={{ width: 'auto' }}
              />
            </Box>
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
  {
    field: 'mr_type',
    headerName: '분류',
    width: 120,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box display="flex" alignItems="center">
        {params.row.mr_type === '미팅룸' && (
          <Chip
            label={params.row.mr_type}
            size="small"
            sx={{
              backgroundColor: '#ffecb3',
              color: '#000000'
            }}
          />
          // <Circle sx={{ width: '15px !important' }} />
        )}
        {params.row.mr_type === '소회의실' && (
          <Chip
            label={params.row.mr_type}
            size="small"
            sx={{
              backgroundColor: '#bbdefb',
              color: '#000000'
            }}
          />
          // <Circle color="primary" sx={{ width: '15px !important' }} />
        )}
        {params.row.mr_type === '중회의실' && (
          <Chip
            label={params.row.mr_type}
            size="small"
            sx={{
              backgroundColor: '#dcedc8',
              color: '#000000'
            }}
          />
          // <Circle color="error" sx={{ width: '15px !important' }} />
        )}
        {params.row.mr_type === '대회의실' && (
          <Chip
            label={params.row.mr_type}
            size="small"
            sx={{
              backgroundColor: '#f3e5f5',
              color: '#000000'
            }}
          />
          // <Circle color="success" sx={{ width: '15px !important' }} />
        )}
      </Box>
    )
  },
  {
    field: 'mr_code',
    headerName: '회의실 번호',
    width: 120,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        <Typography variant="body1">{params.id}</Typography>
      </Box>
    )
  },
  {
    field: 'mr_name',
    headerName: '회의실 이름',
    width: 180,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        <Typography variant="body1">{params.row.mr_name}</Typography>
      </Box>
    )
  },

  {
    field: 'location',
    headerName: '위치',
    width: 200,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        <Typography variant="body1">{params.row.location}</Typography>
      </Box>
    )
  },
  {
    field: 'maximum_capacity',
    headerName: '최대 인원',
    width: 160,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        <Typography variant="body1">{params.row.maximum_capacity}</Typography>
      </Box>
    )
  },
  {
    field: 'is_opened',
    headerName: '개방 여부',
    width: 160,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        {params.row.is_opened === '활성' && (
          <Circle sx={{ width: '15px !important', color: '#76ff03' }} />
        )}
        {params.row.is_opened === '비활성' && (
          <Circle sx={{ width: '15px !important', color: '#ff1744' }} />
        )}
        <Typography variant="body1" sx={{ pl: '10px' }}>
          {params.row.is_opened}
        </Typography>
      </Box>
    )
  },
  {
    field: 'is_used',
    headerName: '사용중',
    width: 160,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        {params.row.is_used === '사용중' && (
          <Circle sx={{ width: '15px !important', color: '#76ff03' }} />
        )}
        {params.row.is_used === '비어있음' && (
          <Circle sx={{ width: '15px !important', color: '#bdbdbd' }} />
        )}
        <Typography variant="body1" sx={{ pl: '10px' }}>
          {params.row.is_used}
        </Typography>
      </Box>
    )
  }
];
