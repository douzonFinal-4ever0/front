import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const CarOperationTable = () => {
  const operationData = [{ id: 1 }, { id: 2 }];
  const columns = [
    {
      field: 'maint_name',
      headerName: '운행일시',
      width: 140,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_start_at',
      headerName: '차량',
      width: 140,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_end_at',
      headerName: '운전자',
      type: '',
      width: 140,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'maint_cost',
      headerName: '목적',
      type: 'number',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'pay_method',
      headerName: '거리',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'mc_name',
      headerName: '출•도착 정보',
      width: 170,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'mem_info', // 추후 수정 필요
      headerName: '메모',
      sortable: false,
      width: 140,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'memo',
      headerName: '운행 경로',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 140
    }
  ];
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
        rows={operationData}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        localeText={{
          noRowsLabel: '등록된 운행 내역이 없습니다.'
        }}
        pageSizeOptions={[5, 10]}
        sx={{ borderRadius: '2px' }}
      />
    </Box>
  );
};

export default CarOperationTable;
