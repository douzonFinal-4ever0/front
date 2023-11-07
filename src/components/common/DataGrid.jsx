import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

// pageSize=한페이지에 보여줄 개수
// pageSizeOptions=한페이지에 보여줄 개수 선택을 드롭다운으로 선택 가능 pageSize의 배수로만 했을때보임
// checkbox=체크박스가 유무
// disableRow= true : row를 선택해도 아무것도 없음, false: row를 선택하면 자동으로 checkbox가 클릭됨

//컬럼 생성 header
// const colums =[
//   {
//     field:"id",                                              row값과 맵핑
//     headerName:"",                                           header에 나올 이름
//     width:100,                                               colums의 너비
//     editable:true/false,                                     수정 가능 여부
//     type:number,                                             타입(선택) dateTime 등
//     description:"설명",                                      colum에 마우스를 가져다 댔을때 나오는 설명(선택)
//     valueGetter:(params)=>
//       `${params.row.mem_name} / ${params.row.dept_name}`,    value값 커스텀(선택)
//     renderCell :                                             셀의 모양 변경
//   },
// ];
//컬럼 예시
// const colums=[
//     {
//       field:"status",
//       headerName:"상태",
//       width:100,
//       description:"예약 상태",
//       editable:false,
//       renderCell: (params) =>(
//         createChip(params)
//       ),
//     },
//     {
//       field:"start_at",
//       headerName:"일자",
//       width:150,
//       description:"예약 기간",
//       editable:false,
//     },
//     {
//       field:"mem/dept",
//       headerName:"이름/부서",
//       width:200,
//       description:"예약자 이름, 부서",
//       editable:false,
//       valueGetter:(params)=>
//        `${params.row.mem_name} / ${params.row.dept_name}`,
//     },
//     {
//       field:"car_name/code",
//       headerName:"차종/차번호",
//       width:200,
//       description:"예약 차량 이름, 번호",
//       editable:false,
//       valueGetter:(params)=>
//        `${params.row.car_name} / ${params.row.car_code}`,
//     },
//     {
//       field:"detail",
//       headerName:"목적",
//       width:100,
//       description:"사량 사용 목적",
//       editable:false,
//     },
//   ]

import { styled } from '@mui/material/styles';
import { palette } from '../../theme/palette';

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626'
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959'
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343'
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c'
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff'
  }
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}
const DataGrid = ({
  rows,
  columns,
  height,
  width,
  pageSize,
  pageSizeOptions,
  checkbox,
  disableRow,
  clickEvent,
  dbclickEvent,
  onRowSelectionModelChange,
  selectedRows,
  onSelectionChange
}) => {
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  // onRowSelectionModelChange 이벤트 핸들러
  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    const selectedRowsData = getSelectedRowsData(newRowSelectionModel);
    if (onSelectionChange) {
      onSelectionChange(selectedRowsData);
    }
  };

  // 선택된 행의 데이터를 가져오는 함수
  const getSelectedRowsData = () => {
    const selectedRowsData = rowSelectionModel.map((rowId) => {
      const row = rows.find((row) => row.id === rowId);
      return row;
    });
    return selectedRowsData;
  };
  return (
    <Box
      sx={{
        height: height,
        width: width
      }}
    >
      <MuiDataGrid
        sx={{
          border: palette.grey['500'],
          borderRadius: '2px',
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important'
          }
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize
            }
          }
        }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkbox}
        disableRowSelectionOnClick={disableRow}
        onRowClick={clickEvent}
        onRowDoubleClick={dbclickEvent}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        {...rows}
        getSelectedRowsData={getSelectedRowsData}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
    </Box>
  );
};
export default DataGrid;
