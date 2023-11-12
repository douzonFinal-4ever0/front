import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { Box, Chip, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import DataGrid from '../../components/common/DataGrid';
import { DataGrid } from '@mui/x-data-grid';
import { palette } from '../../theme/palette';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../common/RectangleBtn.jsx';

const SuppliesList = () => {
  const [SpList, setSpList] = useState([]);
  const [spType, setSpType] = useState('');
  const [selectedSpList, setSelectedSpList] = useState([]);
  const [filteredSpList, setFilteredSpList] = useState([]); // 추가: 필터링된 목록 상태

  /*------------------------------선택된 데이터---------------------------------------- */
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };
  // 선택된 행의 데이터를 가져오는 함수
  const getSelectedRowsData = () => {
    const selectedRowsData = rowSelectionModel.map((rowId) => {
      const row = SpList.find((row) => row.id === rowId);
      return row;
    });
    return selectedRowsData;
  };
  const selectedArray = getSelectedRowsData();
  console.log(selectedArray);
  /*-------------------------------------------------------------------------------------- */
  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/sp/spList')
      .then((res) => {
        const processedData = res.data.map((item) => ({
          ...item,
          id: item.supplies_code
        }));
        setSpList(processedData);
        setFilteredSpList(processedData); // 처음에는 전체 목록을 표시
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);
  const handleClick = (params) => {
    // params 객체를 통해 선택된 행의 데이터에 접근
    const selectedRowData = params.row;

    // 이미 선택된 행인지 확인
    const isSelected = selectedSpList.some(
      (item) => item.id === selectedRowData.id
    );

    if (isSelected) {
      // 이미 선택된 항목이면 선택 해제
      setSelectedSpList((prevSelected) =>
        prevSelected.filter((item) => item.id !== selectedRowData.id)
      );
    } else {
      // 선택되지 않은 항목이면 선택 추가
      setSelectedSpList((prevSelected) => [...prevSelected, selectedRowData]);
    }
  };
  // console.log(selectedSpList);
  // onSelectionChange(selectedSpList);
  // console.log(SpList);
  const allList = () => {
    setFilteredSpList(SpList);
  };
  const handleFilterByType = (type) => {
    // 선택한 유형에 따라 SpList 필터링
    const filteredList = SpList.filter((item) => item.type === type);
    setFilteredSpList(filteredList);
  };
  return (
    <>
      <Grid spacing={1}>
        <Grid item container spacing={2}>
          <Grid item xs={3}>
            <RectangleBtn
              startIcon={<ArticleOutlinedIcon />}
              text={'전체'}
              sx={{
                padding: '14px 12px',
                width: '100%'
              }}
              handlebtn={allList}
            />
          </Grid>
          <Grid item xs={3}>
            <RectangleBtn
              startIcon={<VolumeUpOutlinedIcon />}
              category={'delete'}
              text={'음향장비'}
              sx={{
                padding: '14px 12px',
                width: '100%'
              }}
              handlebtn={() => handleFilterByType('음향장비')}
            />
          </Grid>

          <Grid item xs={3}>
            <RectangleBtn
              startIcon={<VideocamOutlinedIcon />}
              category={'register'}
              text={'영상장비'}
              sx={{
                padding: '14px 12px',
                width: '100%'
              }}
              handlebtn={() => handleFilterByType('영상장비')}
            />
          </Grid>

          <Grid item xs={3}>
            <RectangleBtn
              startIcon={<ArticleOutlinedIcon />}
              text={'편의시설'}
              sx={{
                padding: '14px 12px',
                width: '100%',
                backgroundColor: '#8bc34a', // 원하는 색상으로 변경
                '&:hover': {
                  backgroundColor: '#689f38' // 마우스 호버 시의 색상 변경
                }
              }}
              handlebtn={() => handleFilterByType('편의시설')}
            />
          </Grid>
          <Grid item xs={12}>
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
                sx={{
                  border: palette.grey['500'],
                  borderRadius: '2px',
                  '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important'
                  },
                  width: 'auto'
                }}
                rows={filteredSpList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10
                    }
                  }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={handleRowSelectionModelChange}
                rowSelectionModel={rowSelectionModel}
              />

              {/* <DataGrid
                columns={columns}
                rows={filteredSpList}
                pageSize={10}
                pageSizeOptions={[5, 10]}
                clickEvent={handleClick}
                sx={{ width: 'auto' }}
                checkbox={true}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SuppliesList;

const columns = [
  {
    field: 'type',
    headerName: '유형',
    width: 100,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        <Box display="flex" alignItems="center">
          {params.row.type === '음향장비' && (
            <Chip
              label={params.row.type}
              size="small"
              sx={{
                backgroundColor: '#ffcdd2',
                color: '#000000'
              }}
            />
          )}
          {params.row.type === '영상장비' && (
            <Chip
              label={params.row.type}
              size="small"
              sx={{
                backgroundColor: '#bbdefb',
                color: '#000000'
              }}
            />
          )}
          {params.row.type === '편의시설' && (
            <Chip
              label={params.row.type}
              size="small"
              sx={{
                backgroundColor: '#dcedc8',
                color: '#000000'
              }}
            />
          )}
        </Box>
      </Box>
    )
  },
  {
    field: 'supplies_code',
    headerName: '번호',
    width: 80,
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
    field: 'supplies_name',
    headerName: '비품 이름',
    width: 180,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        <Typography variant="body1">{params.row.supplies_name}</Typography>
      </Box>
    )
  },
  {
    field: 'stock_amount',
    headerName: '재고',
    width: 100,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center',
    renderCell: (params) => (
      <Box alignItems="center" display="flex">
        <Typography variant="body1">
          {params.row.stock_amount}
          {params.row.unit}
        </Typography>
      </Box>
    )
  }
];
