import styled from '@emotion/styled';
import { Chip, Tooltip, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import format from 'date-fns/format';
import { formatNumber } from '../../../utils/formatNumber';

const setTitle = (data) => {
  // data 객체의 status 값에 따라 title을 설정
  if (data === '1') {
    return '미처리';
  } else if (data === '2') {
    return '취소';
  } else if (data === '3') {
    return '운행 대기';
  } else if (data === '4') {
    return '운행중';
  } else {
    return '운행 완료';
  }
};

const setColor = (data) => {
  // data 객체의 status 값에 따라 color를 설정
  if (data === '1') {
    return '#a7b6ce';
  } else if (data === '2') {
    return '#d32f2f';
  } else if (data === '3') {
    return '#ffc107';
  } else if (data === '4') {
    return '#3884C7';
  } else {
    return '#9cb287';
  }
};

const CarRezList = ({
  carRezData,
  handleClickRow,
  searchValue,
  searchType
}) => {
  const columns = [
    {
      field: 'rez_status',
      headerName: '상태',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={setTitle(params.value)}
          sx={{
            borderColor: setColor(params.value),
            color: setColor(params.value)
          }}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'car_name',
      headerName: '차량',
      width: 160,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="subtitle2">{params.row.car_code}</Typography>
          <Tooltip title={params.value} placement="bottom-start">
            <Typography
              variant="caption"
              display="block"
              sx={{
                '& .MuiTypography-caption': {
                  display: 'block'
                },
                margin: 'auto',
                textOverflow: 'ellipsis',
                width: '120px',
                overflow: 'hidden'
              }}
            >
              {params.value}
            </Typography>
          </Tooltip>
        </Box>
      )
    },
    {
      field: 'name',
      headerName: '예약자',
      type: '',
      width: 110,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Box
          display="flex"
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" sx={{ marginRight: '15px' }}>
            {params.row.dept_name}
          </Typography>
          <Typography variant="subtitle2">{params.row.name}</Typography>
        </Box>
      )
    },
    {
      field: 'rez_at',
      headerName: '등록일자',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography textAlign="center" variant="button" display="block">
          {format(new Date(params.value), 'yyyy-MM-dd')}
        </Typography>
      )
    },
    {
      field: 'start_at',
      headerName: '예약 기간',
      type: 'number',
      width: 220,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box width="100%">
          <Typography textAlign="center" variant="button" display="block">
            {format(new Date(params.row.start_at), 'yyyy-MM-dd HH:mm:ss')}
          </Typography>
          <Typography textAlign="center" variant="button" display="block">
            {format(new Date(params.row.return_at), 'yyyy-MM-dd HH:mm:ss')}
          </Typography>
        </Box>
      )
    },
    {
      field: 'est_mileage',
      headerName: '예상 주행 거리',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography textAlign="center" variant="subtitle2" display="block">
          {`${formatNumber(params.value)}km`}
        </Typography>
      )
    },
    {
      field: 'detail',
      headerName: '목적',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    }
  ];

  const filteredRows = carRezData.filter((item) => {
    const lowerSearchValue = searchValue.toLowerCase();
    if (searchType === 0) {
      // 차량 코드로 검색
      return item.car_code.includes(searchValue);
    } else {
      // 다른 경우 (차량명 또는 사용자 이름으로 검색)
      console.log(item);
      return (
        item.car_name.toLowerCase().includes(lowerSearchValue) ||
        item.name.includes(searchValue)
      );
    }
  });

  return (
    <StyledContainer>
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
          getRowId={(row) => row.car_rez_code}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }
            },
            sorting: {
              sortModel: [
                { field: 'rez_status', sort: 'asc' },
                { field: 'rez_at', sort: 'desc' },
                { field: 'start_at', sort: 'desc' }
              ]
            }
          }}
          localeText={{
            noRowsLabel: '등록된 예약 내역이 없습니다.'
          }}
          pageSizeOptions={[5, 10, 15]}
          sx={{
            minHeight: '300px',
            maxHeight: '580px',
            borderRadius: '2px',
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important'
            },
            '& .MuiDataGrid-row': { cursor: 'pointer' }
          }}
          rowHeight={70}
          onRowClick={(row) => {
            handleClickRow(row.row.car_rez_code);
          }}
        />
      </Box>
    </StyledContainer>
  );
};

export default CarRezList;

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  overflow: 'auto',
  padding: '20px',
  borderRadius: 10
}));
