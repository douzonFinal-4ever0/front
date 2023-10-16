import axios from 'axios';
import { useEffect, useState } from 'react';
import DataGrid from '../common/DataGrid';
import CarAlert from './CarAlert';
import { Alert, AlertTitle, Box } from '@mui/material';

const CarList = ({ setSelectedRows }) => {
  const [carList, setCarList] = useState([]);
  //const [alertOpen, setAlertOpen] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8081/car_rez/availableCars').then((res) => {
      setCarList(
        res.data.map((car) => ({
          id: car.carVO.car_code,
          car_name: car.carVO.car_name,
          car_address: car.car_address
        }))
      );
    });
  }, []);
  const handleRowClick = (params) => {
    // 클릭한 행의 정보를 params로 받을 수 있음
    //console.log('클릭한 행 정보:', params.row);
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
    },
    {
      field: 'car_address',
      headerName: '차량 위치',
      width: 300,
      description: '현재 차량 위치',
      editable: false
    }
  ];
  return (
    <Box>
      <DataGrid
        rows={carList}
        columns={colums}
        height={400}
        width={600}
        pageSize={5}
        pageSizeOptions={[5]}
        checkbox={false}
        disableRow={false}
        clickEvent={handleRowClick}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default CarList;
