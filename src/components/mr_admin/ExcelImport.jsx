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
  //   const [mr_op_day, setMr_op_day] = useState([]);
  const [mr_name, setMr_name] = useState('');
  const [location, setLocation] = useState('');
  const [maximum_capacity, setMaximum_capacity] = useState(0);
  const [mr_type, setMr_type] = useState('');
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

        /**회의실명 추출 */
        const mrName = excelData.map((row) => row['회의실명']);
        // setMr_name(mrName);

        /**회의실 위치 추출 */
        const mrLocation = excelData.map((row) => row['위치']);
        // setLocation(mrLocation);

        /**최대 수용 인원 추출 */
        const maxCapacity = excelData.map((row) => row['최대 수용 인원']);
        // setMaximum_capacity(maxCapacity);

        /**운영 요일 추출 */
        const days = excelData.map((row) => row['요일'].split(','));
        // setMr_op_day(mr_op_day);

        /**회의실 유형 추출 */
        const mrType = excelData.map((row) => row['회의실 분류']);

        // 추출된 데이터를 처리하거나 표시
        // console.log(dataWithIds);

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

  const excelName = selectedRow?.row?.회의실명;
  const excelType = selectedRow?.row?.분류;
  const excelMax_capacity = selectedRow?.row?.인원;
  const excelDays = selectedRow?.row?.요일.split(',');

  /** 요일을 0 또는 1로 매핑하여 초기 데이터 생성*/
  const mr_op_day = weekDays?.map((day) => ({
    day: weekDays.indexOf(day), // 요일 자체를 유지
    status: excelDays?.includes(day) ? 0 : 1 // 엑셀 데이터에 해당 요일이 있으면 0, 없으면 1로 설정
  }));

  const excelLocation = selectedRow?.row?.위치;

  const excelMr_keyword = selectedRow?.row?.태그?.split(',');
  /**회의실 태그 */
  const mr_keyword = excelMr_keyword
    ? excelMr_keyword.map((keyword) => ({
        keyword_name: keyword
      }))
    : [];
  //   console.log(excelMax_capacity);

  console.log('선택된 행 데이터: ', selectedRow);
  /**회의실 등록 버튼 클릭 이벤트 */
  const handleSubmit = () => {
    // console.log(FormToData);
    axiosInstance.axiosInstance
      .post('/mr/mrRegister', FormToData)
      .then((res) => {
        handleSetSnackbarContent('회의실 등록이 완료되었습니다.');
        handleOpenSnackbar();
        handleCloseDrawer();
      });
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
