import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import React from 'react';
import * as XLSX from 'xlsx';

const ExcelDownloadButton = () => {
  const handleDownload = () => {
    // 데이터를 포함한 원하는 형태로 엑셀 파일을 생성
    const data = [['회의실명', '분류', '위치', '인원', '요일', '태그', '비품']];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '회의실 정보');

    // 엑셀 파일 저장 및 다운로드
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, '회의실 등록 템플릿.xlsx');
  };

  return (
    <Button
      component="span"
      variant="contained"
      onClick={handleDownload}
      sx={{
        backgroundColor: '#227447', // 원하는 색상으로 변경
        '&:hover': {
          backgroundColor: '#145634' // 마우스 호버 시의 색상 변경
        }
      }}
    >
      <DownloadIcon />
      {/* <svg
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
      </svg> */}
      템플릿 다운로드
    </Button>
  );
};

export default ExcelDownloadButton;
