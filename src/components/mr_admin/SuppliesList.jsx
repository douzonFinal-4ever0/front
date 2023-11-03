import React from 'react';
import DataGrid from '../../components/common/DataGrid';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import axiosInstance from '../../utils/axios.js';
const SuppliesList = () => {
  const [SpList, setSpList] = useState([]);
  useEffect(() => {
    axiosInstance.axiosInstance.get('/sp/spList').then((res) => {
      const processedData = res.data.map((item) => ({
        ...item,
        id: item.supplies_code
      }));
      setSpList(processedData);
    });
  }, []);
  const handleDbClick = (params) => {
    // params 객체를 통해 선택된 행의 데이터에 접근
    const selectedRowData = params.row;
    console.log('selectedRowData: ', selectedRowData);
  };
  return (
    <DataGrid
      columns={columns}
      rows={SpList}
      pageSize={10}
      pageSizeOptions={[5, 10]}
      dbclickEvent={handleDbClick}
      sx={{ width: 'auto' }}
      checkbox={true}
    />
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
