import axios from 'axios';
import { useEffect, useState } from 'react';
import DataGrid from '../common/DataGrid';
import CarAlert from './CarAlert';
import { Alert, AlertTitle, Box } from '@mui/material';

const CarList = ({ setSelectedRows }) => {
  const [carList, setCarList] = useState([]);
  //const [alertOpen, setAlertOpen] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/carNameCode').then((res) => {
      setCarList(res.data);
      console.log('asdasd');
    });
  }, []);
  const handleRowClick = (params) => {
    // 클릭한 행의 정보를 params로 받을 수 있음
    console.log('클릭한 행 정보:', params.row);
    setSelectedRows(params.row);
    // 여기에서 원하는 동작을 수행
  };

  const colums = [
    {
      field: 'id',
      headerName: '차번호',
      width: 150,
      description: '차량 번호',
      editable: false
    },
    {
      field: 'car_name',
      headerName: '차종',
      width: 100,
      description: '차량 종류',
      editable: false
    }
  ];
  return (
    <Box>
      <DataGrid
        rows={carList}
        columns={colums}
        height={400}
        width={300}
        pageSize={5}
        pageSizeOptions={[5]}
        checkbox={true}
        disableRow={false}
        clickEvent={handleRowClick}
      />
    </Box>
  );
};

export default CarList;
