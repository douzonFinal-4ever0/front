import { Tooltip, Typography, makeStyles } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

const CarMaintTable = ({ maintData, setMaintData, carCode, setCheckedRow }) => {
  const columns = [
    {
      field: 'maint_name',
      headerName: '정비내역',
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
      type: '',
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
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'pay_method',
      headerName: '지불 방법',
      width: 128,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'mc_name',
      headerName: '정비 회사',
      width: 128,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'mem_info', // 추후 수정 필요
      headerName: '등록 사원',
      sortable: false,
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Tooltip title={params.value[1]} placement="bottom-start">
          <Typography>{params.value[0]}</Typography>
        </Tooltip>
      )
    },
    {
      field: 'memo',
      headerName: '메모',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 128
    }
  ];

  // const [rows, setRows] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/manager/car/maintOneCarRecordList', {
        params: {
          car_code: carCode
        }
      })
      .then((res) => {
        console.log(res.data);
        const newData = res.data.map((item, index) => {
          return {
            maint_name: item.carMaintResponseVO.maint_name,
            // created_at: item.created_at,
            maint_start_at: new Date(item.maint_start_at).toLocaleDateString(),
            maint_end_at:
              item.maint_end_at !== null
                ? new Date(item.maint_end_at).toLocaleDateString()
                : '-',
            maint_cost: item.maint_cost,
            pay_method: item.pay_method,
            mc_name: item.maintComResponseVO.mc_name,
            mem_info: [
              item.memResponseVO.name,
              item.memResponseVO.deptVO.dept_name +
                ' ' +
                item.memResponseVO.position_name
            ],
            memo: item.memo,
            maint_code: item.maint_code
          };
        });
        setMaintData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        getRowId={(row) => row.maint_code}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        localeText={{
          noRowsLabel: '등록된 정비 내역이 없습니다.'
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ borderRadius: '2px' }}
        onRowSelectionModelChange={(selectionModel) => {
          // 선택된 행의 ID 및 maint_start_at 속성을 추출해서 배열로 저장
          const selectedRowsData = selectionModel.map((selectedId) => {
            const selectedRow = maintData.find(
              (row) => row.maint_code === selectedId
            );
            return {
              id: selectedId,
              maint_start_at: selectedRow ? selectedRow.maint_start_at : null
            };
          });

          // 선택된 행의 데이터 배열을 출력
          console.log(selectedRowsData);

          // 선택된 행의 데이터 배열을 상태로 설정
          setCheckedRow(selectedRowsData);
        }}
      />
    </Box>
  );
};

export default CarMaintTable;
