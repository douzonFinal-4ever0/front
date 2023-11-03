import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import RectangleBtn from '../common/RectangleBtn';
import { useDispatch, useSelector } from 'react-redux';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import axiosInstance from '../../utils/axios.js';

const ImageUpload = () => {
  const mr_code = 'R108';

  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  const [images, setImages] = useState([]); // 이미지 배열
  const [uploadFiles, setUploadFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  // const handleImageDelete = (index) => {
  //   const newImages = [...images];
  //   newImages.splice(index, 1);
  //   setImages(newImages);
  //   console.log(images);
  // };
  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    const newUploadFiles = [...uploadFiles];
    newUploadFiles.splice(index, 1);
    setUploadFiles(newUploadFiles);
  };
  // const handleImageChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files); // 파일선택창에서 선택한 파일들
  //   // 선택한 파일들을 기존 파일 배열에 추가
  //   setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  //   console.log(selectedFiles);
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const newImage = { src: e.target.result, title: file.name };
  //       setImages([...images, newImage]);
  //       console.log(newImage);
  //     };
  //     console.log(file);
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    selectedFiles.forEach((file) => {
      // 중복 파일 여부를 확인합니다.
      if (uploadFiles.some((uploadedFile) => uploadedFile.name === file.name)) {
        // 중복 파일인 경우 알림을 표시하거나 다른 조치를 취할 수 있습니다.
        handleSetSnackbarContent('이미 선택된 파일입니다.');
        handleOpenSnackbar();
        setDuplicateFiles((prevDuplicates) => [...prevDuplicates, true]);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = { src: e.target.result, title: file.name };
          setImages((prevImages) => [...prevImages, newImage]);
        };
        reader.readAsDataURL(file);

        setUploadFiles((prevFiles) => [...prevFiles, file]);
        setDuplicateFiles((prevDuplicates) => [...prevDuplicates, false]);
      }
    });
  };

  const formData = new FormData();
  uploadFiles.forEach((file) => {
    // 파일 데이터 저장
    formData.append('images', file);
  });

  const handleImgUpload = () => {
    axiosInstance.Img.post('/mr/mrImg', formData)
      .then((res) => {
        console.log(res.data);
        // handleSetSnackbarContent('이미지가 업로드 완료되었습니다!');
        // handleOpenSnackbar();
      })
      .catch(console.error);
  };

  console.log(uploadFiles);

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload-button"
        type="file"
        multiple
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload-button">
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          color="info"
        >
          회의실 사진 업로드
        </Button>
      </label>
      {/* {image && (
        <img
          src={image}
          alt="Preview"
          style={{ maxWidth: '100%', marginTop: '10px' }}
        />
      )} */}
      <ImageList sx={2} cols={3} rowHeight={'auto'}>
        {images.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item.src} alt={item.title} loading="lazy" />
            <ImageListItemBar
              title={item.title}
              actionPosition="right"
              actionIcon={
                <RectangleBtn
                  category={'delete'}
                  text={'삭제'}
                  sx={{
                    padding: '14px 12px',
                    margin: '1px'
                  }}
                  handlebtn={() => handleImageDelete(index)}
                />
              }
            />
          </ImageListItem>
        ))}
        {/* {initialMr_Img.map((url, index) => (
          <ImageListItem key={index}>
            <img src={url} alt={`Image ${index}`} loading="lazy" />
          </ImageListItem>
        ))} */}
      </ImageList>
      <Button onClick={handleImgUpload}>테스트</Button>
    </div>
  );
};

export default ImageUpload;
