import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
// import DataGrid from '../common/DataGrid';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../../redux/reducer/DrawerSlice';
import { handleMrListUpdate } from '../../redux/reducer/MrListSlice.js';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import { palette } from '../../theme/palette';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../common/RectangleBtn';

function ExcelImport() {
  const [tableData, setTableData] = useState([]); //엑셀 데이터
  const [SpList, setSpList] = useState([]);

  /*-------------------------------------알림-----------------------------------------------*/
  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };
  /**스낵바 컨텐츠 설정 */
  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };
  /**오프캔버스 닫기 */
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
    dispatch(handleMrListUpdate());
  };
  /*----------------------------------------------------------------------------------------*/
  /**엑셀 파일 업로드 */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const validExtensions = ['.xlsx', '.xls'];
      const fileExtension = file.name.slice(
        ((file.name.lastIndexOf('.') - 1) >>> 0) + 2
      );

      if (!validExtensions.includes(`.${fileExtension}`)) {
        handleSetSnackbarContent('엑셀 파일만 업로드 가능합니다.');
        handleOpenSnackbar();
        return;
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0]; // 첫 번째 시트를 선택
        const sheet = workbook.Sheets[sheetName];

        /**시트 데이터를 배열로 변환 */
        const excelData = XLSX.utils.sheet_to_json(sheet);

        // ID를 추가하고 tableData에 할당
        const dataWithIds = excelData.map((row, index) => ({
          id: index, // ID를 각 행의 인덱스로 생성
          ...row // 기존 열 데이터 유지
        }));

        // 테이블 데이터 설정
        setTableData(dataWithIds);
      };
      reader.readAsArrayBuffer(file);
    }
    axiosInstance.axiosInstance
      .get('/sp/spList')
      .then((res) => {
        const processedData = res.data.map((item) => ({
          ...item,
          id: item.supplies_code
        }));
        setSpList(processedData);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };
  /*----------------------------체크박스 누른 데이터--------------------------------------------*/
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  // 선택된 행의 데이터를 가져오는 함수
  const getSelectedRowsData = () => {
    const selectedRowsData = rowSelectionModel.map((rowId) => {
      const row = tableData.find((row) => row.id === rowId);
      return row;
    });
    return selectedRowsData;
  };
  const selectedArray = getSelectedRowsData();
  /*--------------------------------------------------------------------------------*/

  /**회의실 등록 버튼 클릭 이벤트 */
  const handleSubmit = () => {
    selectedArray.forEach((selectedItem) => {
      const excelName = selectedItem?.회의실명;
      const excelType = selectedItem?.분류;
      const excelMax_capacity = selectedItem?.인원;
      const excelDays = selectedItem?.요일?.split(',');
      const excelLocation = selectedItem?.위치;

      /** 요일을 0 또는 1로 매핑하여 초기 데이터 생성*/
      const mr_op_day = weekDays?.map((day) => ({
        day: weekDays.indexOf(day), // 요일 자체를 유지
        status: excelDays?.includes(day) ? 0 : 1 // 엑셀 데이터에 해당 요일이 있으면 0, 없으면 1로 설정
      }));

      const excelMr_keyword = selectedItem?.태그?.split(',');
      /**회의실 태그 */
      const mr_keyword = excelMr_keyword
        ? excelMr_keyword.map((keyword) => ({
            keyword_name: keyword
          }))
        : [];

      const excelSupplies = selectedItem?.비품?.split(',');
      // supplies_code 배열 초기화
      const suppliesCodeArray = [];
      // supplies_name 배열을 순회하면서 supplies_code를 찾음
      excelSupplies?.forEach((name) => {
        const matchingItem = SpList.find((item) => item.supplies_name === name);
        if (matchingItem) {
          suppliesCodeArray.push(matchingItem.supplies_code);
        }
      });

      const supplies = suppliesCodeArray
        ? suppliesCodeArray.map((supply) => ({
            supplies_code: supply
          }))
        : [];

      // const supplies = excelSupplies
      //   ?.map((name) => {
      //     const matchingItem = SpList.find(
      //       (item) => item.supplies_name === name
      //     );
      //     return matchingItem
      //       ? { supplies_code: matchingItem.supplies_code }
      //       : {};
      //   })
      //   .filter((item) => item !== null);
      console.log(supplies);

      /** 등록시 필요한 데이터*/
      const FormToData = {
        mr_name: excelName,
        maximum_capacity: excelMax_capacity,
        location: excelLocation,
        mr_type: excelType,
        mr_op_day,
        mr_keyword,
        mr_supplies: supplies
      };

      console.log(FormToData);

      axiosInstance.axiosInstance
        .post('/mr/mrRegister', FormToData)
        .then((res) => {
          handleSetSnackbarContent('회의실 등록이 완료되었습니다.');
          handleOpenSnackbar();
          handleCloseDrawer();
        })
        .catch((error) => {
          console.error('데이터 가져오기 오류:', error);
        });
    });
  };
  /*-----------------------------------------------------------------------------------*/

  return (
    <div>
      <input
        type="file"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="excel-upload-button"
      />

      <label htmlFor="excel-upload-button">
        <Button
          component="span"
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: '#227447', // 원하는 색상으로 변경
            '&:hover': {
              backgroundColor: '#145634' // 마우스 호버 시의 색상 변경
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: 'normal' }}
            >
              <g transform="scale(5.12,5.12)">
                <path d="M28.8125,0.03125l-28,5.3125c-0.47266,0.08984 -0.8125,0.51953 -0.8125,1v37.3125c0,0.48047 0.33984,0.91016 0.8125,1l28,5.3125c0.0625,0.01172 0.125,0.03125 0.1875,0.03125c0.23047,0 0.44531,-0.07031 0.625,-0.21875c0.23047,-0.19141 0.375,-0.48437 0.375,-0.78125v-48c0,-0.29687 -0.14453,-0.58984 -0.375,-0.78125c-0.23047,-0.19141 -0.51953,-0.24219 -0.8125,-0.1875zM32,6v7h2v2h-2v5h2v2h-2v5h2v2h-2v6h2v2h-2v7h15c1.10156,0 2,-0.89844 2,-2v-34c0,-1.10156 -0.89844,-2 -2,-2zM36,13h8v2h-8zM6.6875,15.6875h5.125l2.6875,5.59375c0.21094,0.44141 0.39844,0.98438 0.5625,1.59375h0.03125c0.10547,-0.36328 0.30859,-0.93359 0.59375,-1.65625l2.96875,-5.53125h4.6875l-5.59375,9.25l5.75,9.4375h-4.96875l-3.25,-6.09375c-0.12109,-0.22656 -0.24609,-0.64453 -0.375,-1.25h-0.03125c-0.0625,0.28516 -0.21094,0.73047 -0.4375,1.3125l-3.25,6.03125h-5l5.96875,-9.34375zM36,20h8v2h-8zM36,27h8v2h-8zM36,35h8v2h-8z"></path>
              </g>
            </g>
          </svg>
          엑셀 파일 업로드
        </Button>
      </label>
      <Box
        sx={{
          width: '100%',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0'
          },
          border: '1px solid'
        }}
      >
        <DataGrid
          sx={{
            border: palette.grey['500'],
            borderRadius: '2px',
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important'
            },
            width: 'auto'
          }}
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
      {/* 등록 버튼 */}
      <RectangleBtn
        category={'register'}
        text={'회의실 등록'}
        sx={{
          padding: '14px 12px',
          margin: '1px',
          width: '100%'
        }}
        handlebtn={handleSubmit}
      />
    </div>
  );
}

export default ExcelImport;

const weekDays = ['월', '화', '수', '목', '금'];

const columns = [
  {
    field: '회의실명',
    headerName: '회의실명',
    width: 120,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center'
  },
  {
    field: '분류',
    headerName: '분류',
    width: 80,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center'
  },
  {
    field: '인원',
    headerName: '인원',
    width: 30,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center'
  },
  {
    field: '요일',
    headerName: '요일',
    width: 110,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center'
  },
  {
    field: '위치',
    headerName: '위치',
    width: 140,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center'
  },
  {
    field: '태그',
    headerName: '태그',
    width: 120,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center'
  },
  {
    field: '비품',
    headerName: '비품',
    width: 80,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header',
    align: 'center'
  }
];
