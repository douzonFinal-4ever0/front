import React from 'react';
import DataGrid from '../../components/common/DataGrid';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import axiosInstance from '../../utils/axios.js';
import { MenuItem, Select } from '@mui/material';
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
  return (
    <>
      <Select
        value={spType}
        placeholder="회의실 분류를 선택하세요"
        onChange={handleChange}
        sx={{ width: 'auto' }}
      >
        <MenuItem value="편의시설">편의시설</MenuItem>
        <MenuItem value="음향장비">음향장비</MenuItem>
        <MenuItem value="영상장비">영상장비</MenuItem>
      </Select>
      <DataGrid
        columns={columns}
        rows={SpList}
        pageSize={10}
        pageSizeOptions={[5, 10]}
        clickEvent={handleClick}
        sx={{ width: 'auto' }}
        checkbox={true}
      />
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
