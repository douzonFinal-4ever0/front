import React from 'react';
import DataGrid from '../../components/common/DataGrid';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import axiosInstance from '../../utils/axios.js';
import { Button, Grid, MenuItem, Select } from '@mui/material';
import RectangleBtn from '../common/RectangleBtn.jsx';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';

const SuppliesList = () => {
  const [SpList, setSpList] = useState([]);
  const [spType, setSpType] = useState('');
  const [selectedSpList, setSelectedSpList] = useState([]);
  useEffect(() => {
    axiosInstance.axiosInstance.get('/sp/spList').then((res) => {
      const processedData = res.data.map((item) => ({
        ...item,
        id: item.supplies_code
      }));
      setSpList(processedData);
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
  const handleChange = (event) => {
    setSpType(event.target.value);
  };
  // console.log(SpList);
  return (
    <>
      <Grid container>
        <Grid item container spacing={2}>
          <Grid item xs={4}>
            <Button startIcon={<VideocamOutlinedIcon />} sx={{ width: '100%' }}>
              영상장비
            </Button>
            <RectangleBtn startIcon={<VideocamOutlinedIcon />} />
          </Grid>
          <Grid item xs={4}>
            <Button startIcon={<VolumeUpOutlinedIcon />} sx={{ width: '100%' }}>
              음향장비
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button startIcon={<ArticleOutlinedIcon />} sx={{ width: '100%' }}>
              편의시설
            </Button>
          </Grid>
          <Grid xs={12}>
            <DataGrid
              columns={columns}
              rows={SpList}
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
