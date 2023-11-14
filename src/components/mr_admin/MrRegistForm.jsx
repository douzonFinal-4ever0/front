import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import {
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  styled
} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import dayjs from 'dayjs';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TimeField from '../../components/common/TimeField';
import { closeDrawer } from '../../redux/reducer/DrawerSlice';
import { handleMrListUpdate } from '../../redux/reducer/MrListSlice.js';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import axiosInstance from '../../utils/axios.js';
import Label from '../common/Label';
import Modal from '../common/Modal';
import RectangleBtn from '../common/RectangleBtn';
import MrTag from './MrTag';
import SuppliesList from './SuppliesList';

const MrRegistForm = ({ selectedRowData, isEditMode }) => {
  /*--------------------------------------오프캔버스------------------------------------------ */
  // console.log(isEditMode);
  console.log(selectedRowData);
  /**오프캔버스 닫기 */
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };
  /*-------------------------------------알림-----------------------------------------------*/
  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };
  const updateBoard = () => {
    // handleMrListUpdate 함수 디스패치
    dispatch(handleMrListUpdate());
  };

  /*------------------------------------수정시 데이터--------------------------------------------*/
  const initialMrName = selectedRowData ? selectedRowData.mr_name : '';
  const initialLocation = selectedRowData ? selectedRowData.location : '';
  const initialMaximumCapacity = selectedRowData
    ? selectedRowData.maximum_capacity
    : '';
  const initialMr_type = selectedRowData ? selectedRowData.mr_type : '';
  // selectedTags와 같은 구조로 변환
  const initialSelectedTags =
    selectedRowData?.mr_keyword?.map((keywordItem) => ({
      keyword_name: keywordItem.keyword_name,
      keyword_code: keywordItem.keyword_code
    })) || []; // null 체크 추가
  /**기존에 가지고 있던 요일 데이터     */
  // const initialMr_op_day = selectedRowData?.mr_op_day?.map(
  //   (days) => days.day
  // ) || [0, 1, 2, 3, 4];
  const initialMr_op_day = selectedRowData?.mr_op_day || [
    { day: 0, status: 0 },
    { day: 1, status: 0 },
    { day: 2, status: 0 },
    { day: 3, status: 0 },
    { day: 4, status: 0 }
  ];
  initialMr_op_day.sort((a, b) => a.day - b.day);
  /** 기존에 가지고 있던 요일이 활성이었는지에 대한 여부   */
  const initialMr_op_day_status = selectedRowData?.mr_op_day?.map(
    (statuses) => statuses.status
  ) || [0, 0, 0, 0, 0];
  // console.log(initialMr_op_day);
  // console.log(initialMr_op_day_status);
  // console.log(initialSelectedTags);
  /** 기존에 가지고 있던 이미지 파일   */
  const [initialMr_Img, setInitialMr_Img] = useState(
    selectedRowData?.mr_img?.map((image) => ({
      url: image.url,
      img_code: image.img_code
    })) || []
  );
  /*-------------------------------입력폼 제어--------------------------------------------*/
  const [mr_name, setMr_name] = useState(initialMrName);
  const [location, setLocation] = useState(initialLocation);
  const [maximum_capacity, setMaximum_capacity] = useState(
    initialMaximumCapacity
  );
  const handleMrName = (event) => {
    setMr_name(event.target.value);
  };
  const handleLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleMaximum_capacity = (event) => {
    setMaximum_capacity(event.target.value);
  };
  /*------------------------------회의실 분류-----------------------------*/
  const [mrType, setMrType] = useState(initialMr_type);
  const handleSelectChange = (event) => {
    setMrType(event.target.value);
  };
  /*----------------------------회의실 키워드------------------------*/
  //회의실 키워드 선택 값
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);
  const [newselectedTags, setNewSelectedTags] = useState([]);
  /**회의실 키워드 선택된 값 */
  const handleTagSelect = (tags) => {
    setSelectedTags(tags);
    setNewSelectedTags(tags);
  };
  // console.log(selectedTags);
  // console.log(newselectedTags);
  /*---------------------------------이미지 저장---------------------------------- */
  const [images, setImages] = useState([]); // 이미지 배열
  const [uploadFiles, setUploadFiles] = useState([]); // 파일 업로드용
  const [duplicateFiles, setDuplicateFiles] = useState([]); // 중복 방지용

  /**이미지가 리스트에 추가가 되는 이벤트 */
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
  /**회의실 이미지 데이터 */
  const formData = new FormData();

  uploadFiles.forEach((file) => {
    // 파일 데이터 저장
    formData.append('images', file);
  });

  /**이미지 업로드 로직 */
  const handleImgUpload = () => {
    axiosInstance.Img.post('/mr/mrImg', formData)
      .then((res) => {
        console.log(res.data);
        // handleSetSnackbarContent('이미지가 업로드 완료되었습니다!');
        // handleOpenSnackbar();
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  // console.log(initialMr_Img);
  /**이미지 삭제 */
  const [deletedImgCodes, setDeletedImgCodes] = useState([]);
  const handleImageDelete = (item, index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newUploadFiles = [...uploadFiles];
    newUploadFiles.splice(index, 1);
    setUploadFiles(newUploadFiles);

    const newInitialMrImg = [...initialMr_Img];
    const removedImage = newInitialMrImg.splice(index, 1);
    setInitialMr_Img(newInitialMrImg);

    const imgCode = item.img_code;
    setDeletedImgCodes((prevImgCodes) => [...prevImgCodes, imgCode]);
  };
  const deleteImage = (imgCode) => {
    axiosInstance.axiosInstance
      .delete(`/mr/mrImg/${imgCode}`)
      .then((res) => {
        setDeletedImgCodes([]);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };
  /*----------------------------모달------------------------------------*/
  // 모달창 열림 여부 값*/
  const [open, setOpen] = useState(false);
  /** 모달창 열림닫힘 이벤트*/
  const handleModal = () => setOpen(!open);

  const ModalActionBtns = () => {
    const handleSaveBtn = () => {
      handleModal();
      console.log('save 누름');
    };
    const handleCancelBtn = () => {
      handleModal();
      console.log('cancel 누름');
    };

    return (
      <Grid
        container
        xs={12}
        sx={{ m: '10px 0px' }}
        justifyContent="center"
        spacing={2}
      >
        <Button
          variant="contained"
          sx={{
            borderColor: '#BEBEBE',
            ':hover': {
              backgroundColor: '#2065D1',
              borderColor: '#BEBEBE'
            },
            margin: '0px 4px'
          }}
          onClick={handleSaveBtn}
        >
          수정
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#BEBEBE',
            backgroundColor: '#ffffff',
            ':hover': {
              backgroundColor: '#ffffff',
              borderColor: '#BEBEBE'
            },
            margin: '0px 4px'
          }}
          onClick={handleCancelBtn}
        >
          취소
        </Button>
      </Grid>
    );
  };
  const ModalContentExample = () => {
    return <SuppliesList />;
  };
  /*-------------------------요일 컨트롤--------------------------------------- */
  /**요일 매핑 */
  const dayMappings = {
    0: '월',
    1: '화',
    2: '수',
    3: '목',
    4: '금'
    // 5: '토'
  };

  // const [selectedDays, setSelectedDays] = useState(initialDay); // 배열로 선택된 요일을 저장
  const [selectedDays, setSelectedDays] = useState(initialMr_op_day); // 배열로 선택된 요일을 저장
  // 요일을 기준으로 정렬
  selectedDays.sort(
    (a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day)
  );
  /** 배열로 선택된 요일을 저장*/
  const [showTimeField, setShowTimeField] = useState(false); // 기간 선택을 보여줄지 여부
  const [value, setValue] = useState('종일');
  const [checked, setChecked] = useState(false);
  /**선택된 요일 관리 */
  const handleDayToggle = (dayIndex) => {
    setSelectedDays((prevSelectedDays) => {
      const updatedDays = [...prevSelectedDays];
      updatedDays[dayIndex].status = updatedDays[dayIndex].status === 0 ? 1 : 0;
      updatedDays[dayIndex].day = updatedDays[dayIndex].day;
      return updatedDays;
    });
  };
  // console.log(selectedDays);
  /**상태를 토글하여 보이기/숨기기 */
  const toggleTimeField = () => {
    setShowTimeField(!showTimeField); // 상태를 토글하여 보이기/숨기기
  };
  /**기간 선택을 누를 시 뜨는 datepicker */
  const handleChange = (event) => {
    setValue(event.target.value);
    setChecked((prev) => !prev);
    if (event.target.value === '기간 선택') {
      setShowTimeField(true);
    } else {
      setShowTimeField(false);
    }
  };
  /*--------------------------------회의실 CRUD----------------------------------------- */
  /**회의실 등록 버튼 클릭 이벤트 */
  const handleSubmit = () => {
    axiosInstance.axiosInstance
      .post('/mr/mrRegister', FormToData)
      .then((res) => {
        handleSetSnackbarContent('회의실 등록이 완료되었습니다.');
        handleOpenSnackbar();
        handleCloseDrawer();
        handleImgUpload();
        updateBoard();
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };
  /**회의실 수정 버튼 클릭 이벤트 */
  const handleUpdate = () => {
    axiosInstance.axiosInstance
      .patch('/mr/mrUpdate', FormToData2)
      .then((res) => {
        handleSetSnackbarContent('회의실 수정이 완료되었습니다.');
        handleOpenSnackbar();
        handleCloseDrawer();
        deletedImgCodes.forEach((imgCode) => deleteImage(imgCode));
        handleImgUpload();
        updateBoard();
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };
  /**회의실 비활성화 버튼 클릭 이벤트 */
  const handleDeactive = () => {
    axiosInstance.axiosInstance
      .patch('/mr/mrDeactivate', FormToData3)
      .then((res) => {
        handleSetSnackbarContent('회의실 비활성화 처리가 완료되었습니다.');
        handleOpenSnackbar();
        handleCloseDrawer();
        updateBoard();
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  /*-------------------------------FormToData------------------------------------------- */
  /**등록시 필요한 데이터 */
  const FormToData = {
    mr_name,
    maximum_capacity,
    location,
    mr_type: mrType,
    mr_keyword: selectedTags,
    mr_op_day: selectedDays // 변환된 요일 배열 사용
  };
  /**수정시 필요한 데이터 */
  let FormToData2 = {};
  if (selectedRowData && selectedRowData.mr_code) {
    FormToData2 = {
      mr_code: selectedRowData.mr_code,
      mr_name,
      maximum_capacity,
      location,
      mr_type: mrType,
      mr_keyword: selectedTags,
      mr_op_day: selectedDays,
      is_opened: 0
    };
  }
  /**비활성시 필요한 데이터 */
  let FormToData3 = {};
  if (selectedRowData && selectedRowData.mr_code) {
    FormToData3 = {
      mr_code: selectedRowData.mr_code,
      mr_name,
      maximum_capacity,
      location,
      mr_type: mrType,
      is_opened: 1
    };
  }

  /*------------------------------------------------------------------------------ */
  return (
    <Grid container spacing={1}>
      <Grid item container spacing={2}>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'mPurpose'} text={'회의실명'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <TextField
            id="mPurpose"
            variant="outlined"
            value={mr_name}
            placeholder="회의실명을 입력하세요"
            onChange={handleMrName}
          />
        </Grid>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'location'} text={'위치'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <TextField
            id="location"
            variant="outlined"
            placeholder="위치를 입력하세요"
            value={location}
            onChange={handleLocation}
          />
        </Grid>
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'maximum_capacity'} text={'최대 수용 인원'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <TextField
            id="maximum_capacity"
            placeholder="최대 수용 인원을 입력하세요"
            variant="outlined"
            value={maximum_capacity}
            onChange={handleMaximum_capacity}
          />
        </Grid>
        {/* 요일 영역 */}
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'maximum_capacity'} text={'요일'} />
        </StyledLabelGrid>
        <Grid item container xs={9}>
          {selectedDays.map((day, index) => (
            <Grid key={day.day} xs item>
              <label>
                <Checkbox
                  // checked={selectedDays.includes(day)} // 요일이 선택되었는지 확인
                  // checked={selectedDaysStatus[index] === 0} // 상태(status)가 0인 경우에 체크
                  checked={day.status === 0} // 상태(status)가 0인 경우에 체크
                  onChange={() => handleDayToggle(index)} // 체크박스 토글 함수 호출
                  // style={{ visibility: 'hidden' }} // 체크박스는 숨김 처리
                  // color={selectedDays.includes(day) ? 'primary' : 'default'} // 스타일 색상 변경
                  color={
                    // selectedDaysStatus[index] === 0 ? 'primary' : 'default'
                    day.status === 0 ? 'primary' : 'default'
                  } // 스타일 색상 변경
                />
                <span>{dayMappings[day.day]}</span> {/* 텍스트 */}
              </label>
            </Grid>
          ))}
        </Grid>
        {/* 회의실 분류 영역 */}
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'mrType'} text={'회의실 분류'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <FormControl fullWidth>
            {/* <InputLabel>회의실 분류</InputLabel> */}
            <Select
              value={mrType}
              placeholder="회의실 분류를 선택하세요"
              onChange={handleSelectChange}
            >
              <MenuItem value="미팅룸">미팅룸</MenuItem>
              <MenuItem value="소회의실">소회의실</MenuItem>
              <MenuItem value="중회의실">중회의실</MenuItem>
              <MenuItem value="대회의실">대회의실</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* 기간 선택 영역 */}
        <Grid item container spacing={2}>
          <StyledLabelGrid item xs={3}>
            <Label htmlFor={'mrType'} text={'기간 선택'} />
          </StyledLabelGrid>
          <Grid item xs={9}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="종일"
                    control={<Radio />}
                    label="종일"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="기간 선택"
                    control={<Radio />}
                    label="기간 선택"
                    labelPlacement="end"
                    onClick={toggleTimeField}
                  />
                </Grid>
              </Grid>
            </RadioGroup>
            {/* 날짜 선택시 콜랩스 영역 */}
            <Collapse in={checked}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TimeField
                    withMonth={true}
                    label={'시작 시간'}
                    timeValue={dayjs().hour(9).minute(0)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TimeField
                    withMonth={true}
                    label={'종료 시간'}
                    timeValue={dayjs().hour(21).minute(0)}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        {/* 회의실 태그 영역 */}
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'mrTag'} text={'회의실 태그'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <MrTag
            onTagSelect={handleTagSelect}
            initailTagSelect={initialSelectedTags}
          />
        </Grid>
        {/* 기본 비품 버튼 영역 */}
        <StyledLabelGrid item xs={3}>
          <Label htmlFor={'supplies'} text={'기본 비품'} />
        </StyledLabelGrid>
        <Grid item xs={9}>
          <IconButton
            component="label"
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleModal}
          >
            <ControlPointOutlinedIcon />
          </IconButton>
          <Modal
            open={open}
            modalTitle={'비품 항목'}
            handleModal={handleModal}
            content={<ModalContentExample />}
            buttons={<ModalActionBtns />}
          />
        </Grid>
        {/* 회의실 사진 업로드 */}
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload-button"
            type="file"
            onChange={handleImageChange}
            multiple
          />
          <label htmlFor="image-upload-button">
            <Button
              component="span"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              color="info"
              sx={{ width: '100%' }}
            >
              회의실 사진 업로드
            </Button>
          </label>
        </Grid>

        {/* 회의실 사진들 */}
        <Grid item xs={12}>
          <ImageList sx={2} cols={3} rowHeight={190}>
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
                        padding: '14px 12px'
                      }}
                      handlebtn={() => handleImageDelete(index)}
                    />
                  }
                />
              </ImageListItem>
            ))}
            {initialMr_Img.map((item, index) => (
              <ImageListItem key={index}>
                <img src={item.url} alt={`Image ${index}`} loading="lazy" />
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 0%)'
                  }}
                  actionPosition="right"
                  actionIcon={
                    <RectangleBtn
                      category={'delete'}
                      text={'삭제'}
                      sx={{
                        padding: '14px 12px'
                      }}
                      handlebtn={() => {
                        handleImageDelete(item, index);
                        // console.log(item.img_code);
                      }}
                    />
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        {/* 회의실 등록 버튼 */}
        {isEditMode ? (
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
              <RectangleBtn
                category={'modify'}
                text={'회의실 수정'}
                sx={{
                  padding: '14px 12px',
                  margin: '1px',
                  width: '100%'
                }}
                handlebtn={handleUpdate}
              />
            </Grid>
            <Grid item xs={6}>
              <RectangleBtn
                category={'delete'}
                text={'회의실 비활성화'}
                sx={{
                  padding: '14px 12px',
                  margin: '1px',
                  width: '100%'
                }}
                handlebtn={handleDeactive}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid item container xs={12}>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default MrRegistForm;

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast'
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger'
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera'
//   }
// ];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%'
}));
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});
const daysOfWeek = ['월', '화', '수', '목', '금'];

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
