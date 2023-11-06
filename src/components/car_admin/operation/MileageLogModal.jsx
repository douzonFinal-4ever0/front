import { Button } from '@mui/material';
import { Box } from '@mui/system';
import axiosInstance from '../../../utils/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const MileageLogModal = ({ style, handleModalClose }) => {
  // const [operationData, setOperationData] = useState([]);
  // useEffect(() => {
  //   axiosInstance.axiosInstance
  //     .get('/manager/car/operationListOne', {
  //       params: {
  //         car_code: '222가2222'
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setOperationData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const templateFilePath = '/mileagelog.xlsx';

  fetch('/carmileagelog.xlsx') // 파일 경로를 확인하고 수정하세요
    .then((response) => response.blob())
    .then((blob) => {
      // Blob을 ArrayBuffer로 변환 (선택 사항)
      return blob.arrayBuffer();
    })
    .then((arrayBuffer) => {
      const dataView = new DataView(arrayBuffer);
      const text = new TextDecoder('utf-16le').decode(dataView);
      console.log(text);
      // const displayElement = document.getElementById('excelDisplay'); // HTML 요소 ID를 확인하고 수정하세요
      // displayElement.textContent = text; // 데이터를 HTML 요소에 표시
    })
    .catch((error) => {
      console.error('Error loading the Excel file:', error);
    });

  // fetch(templateFilePath)
  //   .then((res) => res.arrayBuffer())
  //   .then((data) => {
  //     const maintExcel = XLSX.read(data, { type: 'array' });

  //     const sheetName = '차량 1';
  //     const sheet = maintExcel.Sheets[sheetName];
  //     // ... 데이터 삽입 및 수정 ...
  //     operationData.map((item, index) => {
  //       const num = 15;
  //       sheet[`A${num + index}`].v = item.created_at;
  //       sheet[`F${num + index}`].v = item.dept_name;
  //       sheet[`J${num + index}`].v = item.name;
  //       sheet[`N${num + index}`].v = item.bef_mileage;
  //       sheet[`T${num + index}`].v = item.aft_mileage;
  //       sheet[`Z${num + index}`].v = item.distance;
  //       sheet[`AF${num + index}`].v = item.commute_mileage;
  //       sheet[`AL${num + index}`].v = item.nomal_biz_mileage;
  //     });

  //     const modifiedArrayBuffer = XLSX.write(maintExcel, {
  //       bookType: 'xlsx',
  //       type: 'arraybuffer'
  //     });
  //     const modifiedBlob = new Blob([modifiedArrayBuffer], {
  //       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //     });

  //     saveAs(modifiedBlob, 'modified_data.xlsx');
  //   })
  //   .catch((error) => {
  //     console.error('Error loading the Excel file:', error);
  //   });

  return (
    <Box id="excelDisplay" sx={{ ...style, width: 500 }}>
      {/* <h2 id="child-modal-title">Text in a child modal</h2>
      <p id="child-modal-description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p> */}
      <Button onClick={handleModalClose}>Close Child Modal</Button>
    </Box>
  );
};

export default MileageLogModal;
