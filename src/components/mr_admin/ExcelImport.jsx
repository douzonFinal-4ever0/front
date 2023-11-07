import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DataGrid from '../common/DataGrid';
import RectangleBtn from '../common/RectangleBtn';
import axiosInstance from '../../utils/axios.js';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../../redux/reducer/DrawerSlice';

function ExcelImport() {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowsArray, setSelectedRowsArray] = useState([]);
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
  };
  /*----------------------------------------------------------------------------------------*/
  /**엑셀 파일 업로드 */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
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
  };
  /**테이블의 row를 클릭하면 생기는 이벤트 */
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };
  /*----------------------------체크박스 누른 데이터--------------------------------------------*/
  const handleDataGridSelectionChange = (selectedRowsData) => {
    console.log(selectedRowsData);
    setSelectedRowsArray(selectedRowsData);
  };
  console.log('엑셀 import에서 받아온 데이터 : ', selectedRowsArray);

  /*--------------------------------------------------------------------------------*/
  //   console.log(selectedRowsArray[0]?.회의실명);
  //   const excelName = selectedRow?.row?.회의실명;
  //   const excelType = selectedRow?.row?.분류;
  //   const excelMax_capacity = selectedRow?.row?.인원;
  //   const excelDays = selectedRow?.row?.요일.split(',');
  //   const excelLocation = selectedRow?.row?.위치;
  //   const excelMr_keyword = selectedRow?.row?.태그?.split(',');
  const excelName = selectedRowsArray[0]?.회의실명;
  const excelType = selectedRowsArray[0]?.분류;
  const excelMax_capacity = selectedRowsArray[0]?.인원;
  const excelDays = selectedRowsArray[0]?.요일.split(',');
  const excelLocation = selectedRowsArray[0]?.위치;
  /** 요일을 0 또는 1로 매핑하여 초기 데이터 생성*/
  const mr_op_day = weekDays?.map((day) => ({
    day: weekDays.indexOf(day), // 요일 자체를 유지
    status: excelDays?.includes(day) ? 0 : 1 // 엑셀 데이터에 해당 요일이 있으면 0, 없으면 1로 설정
  }));

  const excelMr_keyword = selectedRowsArray[0]?.태그?.split(',');
  /**회의실 태그 */
  const mr_keyword = excelMr_keyword
    ? excelMr_keyword.map((keyword) => ({
        keyword_name: keyword
      }))
    : [];
  //   console.log(excelMax_capacity);

  /**회의실 등록 버튼 클릭 이벤트 */
  const handleSubmit = () => {
    console.log(FormToData);
    // axiosInstance.axiosInstance
    //   .post('/mr/mrRegister', FormToData)
    //   .then((res) => {
    //     handleSetSnackbarContent('회의실 등록이 완료되었습니다.');
    //     handleOpenSnackbar();
    //     handleCloseDrawer();
    //   });
  };
  /**등록시 필요한 데이터 */
  const FormToData = {
    mr_name: excelName,
    maximum_capacity: excelMax_capacity,
    location: excelLocation,
    mr_type: excelType,
    mr_op_day,
    mr_keyword
  };

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
          startIcon={<ArticleOutlinedIcon />}
          sx={{
            width: '100%',
            backgroundColor: '#227447', // 원하는 색상으로 변경
            '&:hover': {
              backgroundColor: '#145634' // 마우스 호버 시의 색상 변경
            }
          }}
        >
          엑셀 파일 업로드
        </Button>
      </label>
      <DataGrid
        columns={columns}
        rows={tableData}
        pageSize={10}
        pageSizeOptions={[5, 10]}
        clickEvent={handleRowClick}
        sx={{ width: 'auto' }}
        checkbox={true}
        onSelectionChange={handleDataGridSelectionChange}
      />
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
  { field: '회의실명', headerName: '회의실명', width: 120 },
  { field: '분류', headerName: '분류', width: 80 },
  { field: '인원', headerName: '인원', width: 30 },
  { field: '요일', headerName: '요일', width: 110 },
  { field: '위치', headerName: '위치', width: 140 },
  { field: '태그', headerName: '태그', width: 120 },
  { field: '비품', headerName: '비품', width: 80 }
];
