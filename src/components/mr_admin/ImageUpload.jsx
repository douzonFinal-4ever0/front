import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 이미지 데이터 URL을 state에 저장
      };
      reader.readAsDataURL(file); // 파일을 읽어 데이터 URL로 변환
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload-button"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload-button">
        <Button
          component="span"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          color="info"
        >
          회의실 사진 업로드
        </Button>
      </label>
      {image && (
        <img
          src={image}
          alt="Preview"
          style={{ maxWidth: '100%', marginTop: '10px' }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
