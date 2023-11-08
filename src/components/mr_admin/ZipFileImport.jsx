import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import JSZip from 'jszip';

const ZipFileImport = () => {
  const [zipFiles, setZipFiles] = useState([]); //zip 파일 데이터

  const handleZipFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const zip = new JSZip();

      zip.loadAsync(file).then((zipFiles) => {
        const filePromises = [];

        zipFiles.forEach((relativePath, zipObject) => {
          filePromises.push(
            zipObject.async('blob').then((content) => ({
              name: decodeURIComponent(relativePath),
              content: content
            }))
          );
        });

        Promise.all(filePromises).then((result) => {
          setZipFiles(result);
        });
      });
    }
  };
  console.log(zipFiles);
  return (
    <>
      <input
        type="file"
        onChange={handleZipFileUpload}
        style={{ display: 'none' }}
        id="zipFile-upload-button"
      />
      <label htmlFor="zipFile-upload-button">
        <Button
          component="span"
          variant="contained"
          sx={{
            backgroundColor: '#227447', // 원하는 색상으로 변경
            '&:hover': {
              backgroundColor: '#145634' // 마우스 호버 시의 색상 변경
            }
          }}
        >
          zip 파일 업로드
        </Button>
      </label>
      <div>
        {zipFiles.map((file, index) => (
          <div key={index}>
            <h3>{file.name}</h3>
            <img src={URL.createObjectURL(file.content)} alt={file.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ZipFileImport;
