import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataGrid from '../../components/common/DataGrid';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../common/RectangleBtn.jsx';

const SuppliesList = () => {
  const [SpList, setSpList] = useState([]);
  const [spType, setSpType] = useState('');
  const [selectedSpList, setSelectedSpList] = useState([]);
  const [filteredSpList, setFilteredSpList] = useState([]); // 추가: 필터링된 목록 상태

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
  console.log(selectedSpList);

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
            <DataGrid
              columns={columns}
              rows={filteredSpList}
              pageSize={10}
              pageSizeOptions={[5, 10]}
              clickEvent={handleClick}
              sx={{ width: 'auto' }}
              checkbox={true}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SuppliesList;

const columns = [
  { field: 'supplies_code', headerName: '번호', width: 80 },
  { field: 'supplies_name', headerName: '비품 이름', width: 140 },
  { field: 'stock_amount', headerName: '재고', width: 80 },
  {
    field: 'type',
    headerName: '유형',
    width: 140
  }
];
