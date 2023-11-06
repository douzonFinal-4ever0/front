import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { Chip, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CarOperationTable = ({
  operationData,
  searchValue,
  searchType,
  setOperationData
}) => {
  const columns = [
    {
      field: 'start_at',
      headerName: '운행일시',
      width: 140,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      field: 'car_info',
      headerName: '차량',
      width: 180,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Box display="flex" width="100%" alignItems="center">
          <Chip
            label={params.value.type}
            size="small"
            sx={{ backgroundColor: '#90caf9', marginRight: '20px' }}
          />
          <Box>
            <Typography variant="subtitle1">{params.value.car_code}</Typography>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '90px' // 원하는 최대 너비 설정
              }}
            >
              {params.value.car_name}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'mem_info',
      headerName: '운전자',
      type: '',
      width: 140,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Box width="100%">
          <Typography variant="subtitle1">{params.value.name}</Typography>
          <Typography variant="body2">{`${params.value.dept_name} • ${params.value.position_name}`}</Typography>
        </Box>
      )
    },
    {
      field: 'purpose',
      headerName: '목적 • 거리',
      type: 'number',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box width="100%">
          {params.value.map((item) => {
            return (
              <Box display="flex">
                <Typography variant="body2" marginRight="5px">
                  {item.reason}용
                </Typography>
                <Typography variant="subtitle2">{item.distance}km</Typography>
              </Box>
            );
          })}
        </Box>
      )
    },
    {
      field: 'loc',
      headerName: '출•도착 정보',
      width: 250,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box width="100%">
          {params.value.map((item) => {
            return (
              <Box sx={{ backgroundColor: '#f5f5f5' }} padding="0px 4px">
                <Box display="flex" justifyContent="center" paddingTop="2px">
                  <Typography variant="subtitle2" marginRight="15px">
                    {item.loc_type}
                  </Typography>
                  <Tooltip title={item.address} placement="top-start">
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '140px' // 원하는 최대 너비 설정
                      }}
                    >
                      {item.address}
                    </Typography>
                  </Tooltip>
                </Box>
                <Divider sx={{ backgroundColor: '#616161' }} />
              </Box>
            );
          })}
        </Box>
      )
    },
    {
      field: 'memo',
      headerName: '메모',
      sortable: false,
      width: 140,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center'
    },
    {
      headerName: '운행 경로',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 140,
      renderCell: (params) => (
        <IconButton color="primary" aria-label="add to shopping cart">
          <LocationOnIcon />
        </IconButton>
      )
    }
  ];

  const filteredRows = operationData.filter((item) => {
    const lowerSearchValue = searchValue.toLowerCase();
    if (searchType === 0) {
      // 차량 코드로 검색
      return item.car_info.car_code.includes(searchValue);
    } else {
      // 다른 경우 (차량명 또는 사용자 이름으로 검색)
      console.log(item);
      return (
        item.car_info.car_name.toLowerCase().includes(lowerSearchValue) ||
        item.mem_info.name.includes(searchValue)
      );
    }
  });

  return (
    <Box
      sx={{
        width: '100%',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f0f0f0'
        }
      }}
    >
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.operation_code}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        localeText={{
          noRowsLabel: '등록된 운행 내역이 없습니다.'
        }}
        pageSizeOptions={[10, 15]}
        sx={{
          borderRadius: '2px',
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important'
          },
          overflowX: 'auto'
        }}
        rowHeight={90}
      />
    </Box>
  );
};

export default CarOperationTable;
