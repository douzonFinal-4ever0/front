import { Button } from '@mui/material';
import iconv from 'iconv-lite';
import JSZip from 'jszip';
import React, { useState } from 'react';

const ZipFileImport = () => {
  const [zipFiles, setZipFiles] = useState([]);

  const handleZipFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const zip = new JSZip();

      try {
        const zipInstance = await zip.loadAsync(file, {
          decodeFileName: function (bytes) {
            return iconv.decode(bytes, 'euc-kr');
          }
        });

        const filePromises = [];

        zipInstance.forEach((relativePath, zipObject) => {
          filePromises.push(
            zipObject.async('blob').then((content) => ({
              name: decodeURIComponent(relativePath),
              content: content
            }))
          );
        });

        const result = await Promise.all(filePromises);
        setZipFiles(result);

        // 업로드를 서버로 전송
        const formData = new FormData();
        result.forEach((file) => {
          const convertedFile = new File([file.content], file.name, {
            type: file.content.type
          });
          formData.append('images', convertedFile);
        });
        console.log(formData);
        // // 아래의 URL은 서버의 업로드 엔드포인트로 수정해야 합니다.
        // fetch('YOUR_SERVER_UPLOAD_ENDPOINT', {
        //   method: 'POST',
        //   body: formData
        // })
        //   .then((response) => response.json())
        //   .then((data) => console.log(data))
        //   .catch((error) => console.error('Error:', error));
      } catch (error) {
        console.error('Error loading zip file:', error);
      }
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
