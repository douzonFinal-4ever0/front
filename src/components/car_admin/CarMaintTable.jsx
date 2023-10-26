import { makeStyles } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CarMaintTable = ({ carCode }) => {
  const columns = [
    {
      field: 'maint_item_code',
      headerName: '정비내역',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'created_at',
      headerName: '등록일자',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_start_at',
      headerName: '정비 시작일',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_end_at',
      headerName: '정비 종료일',
      type: 'number',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_cost',
      headerName: '금액',
      type: 'number',
      width: 128,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'mem_code', // 추후 수정 필요
      headerName: '담당자',
      //   description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
    {
      field: 'memo',
      headerName: 'memo',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 128
    }
  ];

  const [maintData, setMaintData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/admin/car/maintOneCarRecordList', {
        params: {
          car_code: carCode
        }
      })
      .then((res) => {
        console.log(res.data);
        setMaintData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [maintData]);

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f0f0f0'
        }
      }}
    >
      <DataGrid
        rows={maintData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ borderRadius: '2px' }}
      />
    </Box>
  );
};

export default CarMaintTable;
