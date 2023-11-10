import { Chip, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import format from 'date-fns/format';
import RectangleIcon from '@mui/icons-material/Rectangle';
import { useState } from 'react';

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
    return '#9e9e9e';
  } else if (data === '2') {
    return '#d32f2f';
  } else if (data === '3') {
    return '#ffc107';
  } else if (data === '4') {
    return '#1769aa';
  } else {
    return '#2e7d32';
  }
};

const CarRezListModal = ({ listData, style, handleClickRow }) => {
  const columns = [
    {
      field: 'rez_status',
      headerName: '상태',
      width: 120,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
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
      width: 130,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ width: '100%' }}>
          <Typography variant="subtitle2">{params.row.car_code}</Typography>
          <Tooltip title={params.value} placement="bottom-start">
            <Typography
              variant="caption"
              display="block"
              sx={{
                '& .MuiTypography-caption': {
                  display: 'block'
                },
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
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="caption" sx={{ marginRight: '3px' }}>
            {params.row.dept_name}
          </Typography>
          <Typography variant="subtitle2">{params.row.name}</Typography>
        </Box>
      )
    },
    {
      field: 'start_at',
      headerName: '예약 일시',
      type: 'number',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box width="100%">
          <Typography textAlign="center" variant="button" display="block">
            {params.row.start_at}
          </Typography>
          <Typography textAlign="center" variant="button" display="block">
            {format(new Date(params.row.return_at), 'yyyy-MM-dd HH:mm:ss')}
          </Typography>
        </Box>
      )
    },
    {
      field: 'detail',
      headerName: '목적',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    }
  ];

  return (
    <Box sx={{ ...style, width: 830 }}>
      <Box
        sx={{
          pt: 2,
          px: 4,
          pb: 3,
          bgcolor: 'background.paper',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0'
          }
        }}
      >
        <Box
          display="flex"
          marginTop="15px"
          sx={{
            width: '100%',
            borderBottom: '3px solid black',
            padding: '5px 0px'
          }}
        >
          <RectangleIcon
            sx={{
              color: 'black',
              marginTop: 'auto',
              marginBottom: 'auto',
              width: '6px',
              height: '6px'
            }}
          />
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
            예약 내역
          </Typography>
        </Box>
        <DataGrid
          rows={listData}
          columns={columns}
          getRowId={(row) => row.car_rez_code}
          autoHeight
          localeText={{
            noRowsLabel: '예약 정보가 존재하지 않습니다.'
          }}
          sx={{
            borderRadius: '2px',
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important'
            },
            '& .MuiDataGrid-footerContainer': {
              display: 'none'
            },
            '& .MuiDataGrid-row': { cursor: 'pointer' }
          }}
          onRowClick={(row) => {
            handleClickRow(row.row.car_rez_code);
          }}
        />
      </Box>
    </Box>
  );
};

export default CarRezListModal;
