import * as React from 'react';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../../redux/reducer/DrawerSlice';
import CarDetail from './CarDetail';
import { Chip, Tooltip, Typography } from '@mui/material';
import CarMaint from './CarMaint';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { Circle } from '@mui/icons-material';
import { formatNumber } from '../../utils/formatNumber';

const CarInfo = ({
  rows,
  setTabData,
  filter,
  searchType,
  searchValue,
  setCarListInfo
}) => {
  const dispatch = useDispatch();

  const handleClickRow = (value, mileage, status) => {
    console.log('value : ' + value + 'mileage : ' + mileage);

    setTabData([
      {
        title: '차량 정보',
        content: (
          <CarDetail
            carCode={value}
            carListInfo={rows}
            setCarListInfo={setCarListInfo}
          />
        )
      },
      {
        title: '정비 및 지출',
        content: (
          <CarMaint carCode={value} accum_mileage={mileage} status={status} />
        )
      }
    ]);
    dispatch(openDrawer());
  };

  const columns = [
    {
      field: 'type',
      headerName: '종류',
      width: 100,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) =>
        params.value === '승용차' ? (
          <Chip
            label="승용차"
            size="small"
            sx={{ backgroundColor: '#90caf9' }}
          />
        ) : (
          <Chip
            label="화물차"
            size="small"
            sx={{ backgroundColor: '#a5d6a7' }}
          />
        )
    },
    {
      field: 'car_code',
      headerName: '차량 번호',
      width: 100,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Typography
          variant="subtitle2"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '140px' // 원하는 최대 너비 설정
          }}
        >
          {params.value}
        </Typography>
      )
    },
    {
      field: 'car_name',
      headerName: '차량명',
      type: '',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) => (
        <Tooltip title={params.value} placement="top-start">
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '128px' // 원하는 최대 너비 설정
            }}
          >
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: 'created_at',
      headerName: '최근 운행',
      type: 'number',
      width: 128,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) =>
        params.value !== null ? (
          new Date(params.value).toLocaleDateString()
        ) : (
          <Typography variant="caption">최근 운행 없음</Typography>
        )
    },
    {
      field: 'accum_mileage',
      headerName: '누적 주행 거리',
      width: 128,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box display="flex">
          <Typography variant="button" marginRight="5px">
            {formatNumber(params.value)}
          </Typography>
          <Typography>km</Typography>
        </Box>
      )
    },
    {
      field: 'memo',
      headerName: '메모',
      width: 128,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'car_status', // 추후 수정 필요
      headerName: '차량 상태',
      width: 128,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) =>
        params.value === '사용가능' ? (
          <Box display="flex">
            <Circle
              color="primary"
              sx={{ width: '10px !important', marginRight: '10px' }}
            />
            {params.value}
          </Box>
        ) : (
          <Box display="flex">
            <Circle
              color="error"
              sx={{ width: '10px !important', marginRight: '10px' }}
            />
            {params.value}
          </Box>
        )
    },
    {
      field: 'authority', // 추후 수정 필요
      headerName: '권한',
      sortable: false,
      width: 100,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) =>
        params.value === '지정' ? (
          <Box>
            <Typography variant="subtitle2" textAlign="center">
              {params.row.name}
            </Typography>
            <Typography variant="caption">{`${params.row.dept_name} · ${params.row.position_name}`}</Typography>
          </Box>
        ) : (
          <Box display="flex">{params.value}</Box>
        )
    },
    {
      field: 'overMaintCount',
      headerName: '초과 정비 개수',
      width: 100,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      renderCell: (params) =>
        params.value !== 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-circle"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ff2825"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            <Typography variant="button" color="#ff2825" marginLeft="5px">
              {`${params.value}건`}
            </Typography>
          </Box>
        )
    }
  ];

  const filteredRows = rows.filter((item) => {
    const lowerSearchValue = searchValue.toLowerCase();
    if (searchType === 0) {
      // 차량 코드로 검색
      return item.car_code.includes(searchValue);
    } else {
      // 다른 경우 (차량명 또는 사용자 이름으로 검색)
      console.log(item);
      return item.authority === '지정'
        ? item.car_name.toLowerCase().includes(lowerSearchValue) ||
            item.name.includes(searchValue)
        : item.car_name.toLowerCase().includes(lowerSearchValue);
    }
  });

  const displayedRows =
    filter !== '삭제됨'
      ? filteredRows
          .filter((item) => item.car_status !== '삭제됨')
          .filter((item) => filter === '전체' || item.type === filter)
      : filteredRows.filter((item) => item.car_status === filter);

  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f0f0f0'
        }
      }}
    >
      <DataGrid
        rows={displayedRows}
        columns={columns}
        getRowId={(row) => row.car_code}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          },
          sorting: {
            sortModel: [
              { field: 'created_at', sort: 'desc' },
              { field: 'accum_mileage', sort: 'desc' },
              { field: 'car_status', sort: 'desc' }
            ]
          }
        }}
        localeText={{
          noRowsLabel: '등록된 차량이 없습니다.'
        }}
        pageSizeOptions={[10, 15]}
        sx={{
          borderRadius: '2px',
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important'
          },
          '& .MuiDataGrid-row': { cursor: 'pointer' }
        }}
        onRowClick={(row) => {
          handleClickRow(
            row.row.car_code,
            row.row.accum_mileage,
            row.row.car_status
          );
        }}
      />
    </Box>
  );
};

export default CarInfo;

CarInfo.defaultProps = {
  searchValue: ''
};
