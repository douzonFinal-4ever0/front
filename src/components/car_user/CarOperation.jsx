import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  ImageList,
  ImageListItem,
  InputAdornment,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  List
} from '@mui/material';
import RectangleIcon from '@mui/icons-material/Rectangle';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { palette } from '../../theme/palette';
import Label from '../common/Label';
import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axiosInstance from '../../utils/axios';
import { useDispatch } from 'react-redux';
import {
  openSanckbar,
  setSnackbarContent,
  setSnackbarStatus
} from '../../redux/reducer/SnackbarSlice';
import dayjs from 'dayjs';

const CarOperation = ({ rezCode, open, handleClose }) => {
  function dateFormat(date) {
    const preDate = new Date(date);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return preDate.toLocaleString('ko-KR', options);
  }
  const [rezData, setRezData] = useState(null);
  const [rezLoc, setRezLoc] = useState(null);
  const [spend, setSpend] = useState(false);
  const [formData, setFormData] = useState(null);
  const [exp, setExp] = useState({
    exp_at: null,
    cost: '',
    exp_content: '',
    ac_detail: '',
    pay_method: '',
    imgName: ''
  });
  const [expList, setExpList] = useState([]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: palette.grey['50'],
    // border: '2px solid #000',
    boxShadow: 24
  };
  const [opModify, setOpModify] = useState(false);
  //선택된 exp번호
  const [selectedExpNum, setSelectedExpNum] = useState(null);
  var expList2 = [];
  const handleCloseEvent = () => {
    handleClose();
  };
  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };
  const handleSetSnackbarStatus = (status) => {
    dispatch(setSnackbarStatus(status));
  };
  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };
  useEffect(() => {
    setSpend(false);
    setExpList([]);
    if (open) {
      axiosInstance.axiosInstance
        .get(`http://localhost:8081/car_rez/carRezDetail/${rezCode}`)
        .then((res) => {
          console.log(res.data);
          setRezData(res.data);
          setFormData({
            ...formData,
            distance: res.data.est_mileage,
            bef_mileage: res.data.carDetailResponseVO.accum_mileage,
            aft_mileage:
              res.data.carDetailResponseVO.accum_mileage + res.data.est_mileage,
            car_rez_code: res.data.car_rez_code,
            mem_code: res.data.memResponseVO.mem_code,
            car_code: res.data.carDetailResponseVO.carVO.car_code
          });
        });
    } else {
      setRezData(null);
      setFormData(null);
      setRezLoc(null);
    }
  }, [open]);
  //formdata 설정
  const hanldeFormData = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };
  //지출 설정

  const handleExp = (e) => {
    const { name, value } = e.target;
    setExp({
      ...exp,
      [name]: value
    });
  };

  // var selectedFile;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // var selectedFiles = [];
  /**이미지가 리스트에 추가가 되는 이벤트 */
  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    // selectedFile = event.target.files[0];
    setExp({
      ...exp,
      imgName: event.target.files[0].name
    });
    // 파일 데이터 저장
  };
  //지출 리스트
  const handleExpList = (e) => {
    console.log(exp);
    // setExp({ ...exp, exp_at: dateFormat(exp.exp_at) });
    setExpList([...expList, exp]);
    // expList2 = [...expList2, exp];
    // console.log(expList2);
    resetExp();
    setFormData((preState) => {
      const newState = { ...preState };
      newState.expenditureDTO = [...expList, exp];
      // console.log(newState);
      return newState;
    });

    console.log(selectedFile);
    setSelectedFiles([...selectedFiles, selectedFile]);
    // selectedFiles = [...selectedFiles, selectedFile];
  };
  const resetExp = () => {
    setExp({
      exp_at: null,
      cost: '',
      exp_content: '',
      ac_detail: '',
      pay_method: '',
      imgName: ''
    });
  };
  //지출 수정 버튼
  const handleExpListModify = () => {
    let modExpList = expList;
    console.log(modExpList);
    modExpList[selectedExpNum] = exp;
    console.log(modExpList);
    setExpList(modExpList);
    setFormData((preState) => {
      const newState = { ...preState };
      newState.expenditureDTO = [...expList];
      // console.log(newState);
      return newState;
    });
    resetExp();
  };
  //submit 함수
  const hanldSubmit = (e) => {
    e.preventDefault();
    if (
      parseFloat(formData.distance) <
      parseFloat(formData.nomal_biz_mileage) +
        parseFloat(formData.commute_mileage)
    ) {
      // console.log(formData.distance);
      // console.log(formData.nomal_biz_mileage + formData.commute_mileage);
      //error snackbar
      handleSetSnackbarStatus('error');
      handleSetSnackbarContent('총주행거리가 업무용 거리보다 작습니다.');
      handleOpenSnackbar();
    } else {
      // console.log('asdasdasd');
      // console.log(expList2);
      console.log(formData);
      axiosInstance.axiosInstance
        .post(`http://localhost:8081/car_rez/operation`, formData)
        .then((res) => {
          console.log(res.data);
          // 콘솔에 FormData 내용 출력
          console.log(selectedFiles);
          if (selectedFiles.length !== 0) {
            const selectedFiles2 = Array.from(selectedFiles);
            console.log(selectedFiles2);
            var imgformData = new FormData();
            var cnt = 0;
            selectedFiles2.forEach((file) => {
              imgformData.append('images', file);
              cnt++;
            });
            if (cnt > 0) {
              axiosInstance.Img.post('car_rez/receiptImg', imgformData).then(
                (res) => {
                  console.log(res.data);
                }
              );
            }
          }
          setSelectedFile(null);
          setSelectedFiles([]);
          setExpList([]);
          handleClose();
          handleSetSnackbarStatus('success');
          handleSetSnackbarContent('운행 완료 처리가 완료되었습니다.');
          handleOpenSnackbar();
        });
    }
  };
  //지출 여부
  const handleSpend = (e) => {
    console.log(e.target.value);
    setSpend(!spend);
  };
  /*---------------------------------이미지 저장---------------------------------- */
  // const [images, setImages] = useState([]); // 이미지 배열
  // const [uploadFiles, setUploadFiles] = useState([]);
  // const [duplicateFiles, setDuplicateFiles] = useState([]);
  // // const [selectedFiles, setSelectedFiles] = useState([]);

  // const handleImgUpload = () => {
  //   // console.log(selectedFiles);
  //   console.log(imgformData);
  // };
  //지출 선택시
  const selectOp = (e, index, exp2) => {
    setOpModify(true);
    setSelectedExpNum(index);
    setExp({
      exp_at: dayjs(exp2.exp_at),
      cost: exp2.cost,
      exp_content: exp2.exp_content,
      ac_detail: exp2.ac_detail,
      pay_method: exp2.pay_method,
      imgName: exp2.imgName
    });
  };
  const opModifyCancel = () => {
    setOpModify(false);
    setSelectedExpNum(null);
    resetExp();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: 750 }}>
        {(formData !== null) & (rezData !== null) && (
          <form onSubmit={hanldSubmit}>
            <Box sx={{ pt: 2, px: 4, pb: 3, bgcolor: 'background.paper' }}>
              <Box>
                <Typography
                  sx={{
                    paddingTop: '2px',
                    paddingBottom: '2px'
                  }}
                  variant="h5"
                  id="parent-modal-title"
                >
                  운행 완료 처리
                </Typography>
              </Box>
              <Divider />
              <Box
                display="flex"
                marginTop="15px"
                sx={{
                  width: '100%',
                  borderBottom: '3px solid black',
                  padding: '5px 0px'
                }}
              >
                <RectangleIcon
                  sx={{
                    color: 'black',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    width: '6px',
                    height: '6px'
                  }}
                />
                <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
                  기본 정보
                </Typography>
              </Box>
              {/* input Form */}
              <Grid container spacing={1} margin="5px 0px" padding="0px 6px">
                <Grid item container spacing={2}>
                  <StyledLabelGrid item xs={3}>
                    <Label
                      htmlFor={'aft_mileage'}
                      text={'주행 후 계기판 거리'}
                    />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <TextField
                      id="aft_mileage"
                      name="aft_mileage"
                      variant="outlined"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
                      defaultValue={
                        formData.aft_mileage.toFixed(1) &&
                        formData.aft_mileage.toFixed(1)
                      }
                      onChange={hanldeFormData}
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <StyledLabelGrid item xs={3}>
                    <Label
                      htmlFor={'nomal_biz_mileage'}
                      text={'일반 업무용 거리'}
                    />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <TextField
                      id="nomal_biz_mileage"
                      name="nomal_biz_mileage"
                      variant="outlined"
                      type="number"
                      onChange={(e) => hanldeFormData(e)}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
                      // value={nomal_biz_mileage}
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <StyledLabelGrid item xs={3}>
                    <Label htmlFor={'commute_mileage'} text={'출퇴근용 거리'} />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <TextField
                      id="commute_mileage"
                      name="commute_mileage"
                      variant="outlined"
                      type="number"
                      onChange={(e) => hanldeFormData(e)}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
                      // value={commute_mileage}
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <StyledLabelGrid item xs={3}>
                    <Label htmlFor={'memo'} text={'메모'} />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <TextField
                      id="memo"
                      name="memo"
                      variant="outlined"
                      type="text"
                      onChange={(e) => hanldeFormData(e)}
                      multiline
                      // value={memo}
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <StyledLabelGrid item xs={3}>
                    <Label htmlFor={'spend'} text={'지출'} />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <RadioGroup
                      row
                      name="row-radio-buttons-group"
                      value={spend}
                      onChange={(e) => handleSpend(e)}
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="지출 없음"
                      />
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="지출 있음"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
              <Collapse in={spend}>
                <Box
                  display="flex"
                  marginTop="15px"
                  sx={{
                    width: '100%',
                    borderBottom: '3px solid black',
                    padding: '5px 0px'
                  }}
                >
                  <RectangleIcon
                    sx={{
                      color: 'black',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      width: '6px',
                      height: '6px'
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
                    지출 정보
                  </Typography>
                </Box>
                <Grid container margin="5px 0px" padding="0px 6px">
                  <Grid xs={6}>
                    <Grid item container spacing={2}>
                      <StyledLabelGrid item xs={3}>
                        <Label htmlFor={'exp_at'} text={'지출날짜'} />
                      </StyledLabelGrid>
                      <Grid item xs={8}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            name={'exp_at'}
                            onChange={(e) => {
                              setExp({
                                ...exp,
                                exp_at: e.format('YYYY-MM-DD')
                              });
                            }}
                            value={exp.exp_at}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <StyledLabelGrid item xs={3}>
                        <Label htmlFor={'cost'} text={'지출금액'} />
                      </StyledLabelGrid>
                      <Grid item xs={8}>
                        <TextField
                          id="cost"
                          name="cost"
                          variant="outlined"
                          type="number"
                          onChange={handleExp}
                          value={exp.cost}
                          InputProps={{
                            inputProps: { min: 0 },
                            endAdornment: (
                              <InputAdornment position="end">원</InputAdornment>
                            )
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <StyledLabelGrid item xs={3}>
                        <Label htmlFor={'exp_content'} text={'지출내용'} />
                      </StyledLabelGrid>
                      <Grid item xs={8}>
                        <TextField
                          id="exp_content"
                          name="exp_content"
                          onChange={(e) => handleExp(e)}
                          value={exp.exp_content}
                          variant="outlined"
                          type="text"
                        ></TextField>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <StyledLabelGrid item xs={3}>
                        <Label htmlFor={'ac_detail'} text={'계정세목'} />
                      </StyledLabelGrid>
                      <Grid item xs={8}>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          name="ac_detail"
                          onChange={(e) => handleExp(e)}
                          value={exp.ac_detail}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          sx={{ minWidth: 220 }}
                        >
                          <MenuItem value={'통행료'}>통행료</MenuItem>
                          <MenuItem value={'유류비'}>유류비</MenuItem>
                          <MenuItem value={'주차비'}>주차비</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <StyledLabelGrid item xs={3}>
                        <Label htmlFor={'pay_method'} text={'결제 수단'} />
                      </StyledLabelGrid>
                      <Grid item xs={8}>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          name="pay_method"
                          onChange={(e) => handleExp(e)}
                          value={exp.pay_method}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          sx={{ minWidth: 220, mb: 1 }}
                        >
                          <MenuItem value={'법인 카드'}>법인 카드</MenuItem>
                          <MenuItem value={'법인 현금'}>법인 현금</MenuItem>
                          <MenuItem value={'개인 카드'}>개인 카드</MenuItem>
                          <MenuItem value={'개인 현금'}>개인 현금</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <StyledLabelGrid item xs={3}>
                        <Label htmlFor={'imgUpload'} text={'영수증'} />
                      </StyledLabelGrid>
                      {exp.imgName !== '' ? (
                        <>
                          <Grid item xs={9}>
                            <Typography variant="body2" fontSize={12}>
                              {exp.imgName}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={9}>
                            <Button component="label" variant="contained">
                              영수증 사진 업로드
                              <input
                                style={{ display: 'none' }}
                                type="file"
                                onChange={handleImageChange}
                              />
                            </Button>
                          </Grid>
                        </>
                      ) : (
                        <Grid item xs={9}>
                          <Button component="label" variant="contained">
                            영수증 사진 업로드
                            <input
                              style={{ display: 'none' }}
                              type="file"
                              onChange={handleImageChange}
                            />
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container xs={6} sx={{ border: '1px solid #ccc' }}>
                    {/* <ImageList sx={1} cols={1} rowHeight={'auto'}>
                  {images.map((item, index) => (
                    <ImageListItem key={index}> */}
                    {/* {images !== null && (
                      <img src={images.src} alt={images.title} loading="lazy" />
                    )} */}
                    {/* </ImageListItem> */}
                    {/* ))} */}
                    {/* </ImageList> */}
                    <div
                      style={{
                        maxHeight: '30vh',
                        overflowY: 'auto'
                      }}
                    >
                      <List dense component="div" role="list">
                        {formData.expenditureDTO &&
                          formData.expenditureDTO.map((exp, index) => {
                            return (
                              <ListItem key={index}>
                                <ListItemButton
                                  onClick={(e) => selectOp(e, index, exp)}
                                >
                                  <ListItemText
                                    primary={
                                      index +
                                      ' 지출 일자:' +
                                      dateFormat(exp.exp_at) +
                                      ', 지출 내용:' +
                                      exp.exp_content
                                    }
                                    secondary={
                                      '결제수단:' +
                                      exp.pay_method +
                                      ', 지출 금액:' +
                                      exp.cost +
                                      '원'
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                            );
                          })}
                      </List>
                    </div>
                  </Grid>
                </Grid>
                <Grid container xs={12} justifyContent="center">
                  {opModify ? (
                    <div>
                      <Button
                        variant="contained"
                        onClick={(e) => handleExpListModify(e)}
                        sx={{
                          borderColor: '#BEBEBE',
                          ':hover': {
                            backgroundColor: '#2065D1',
                            borderColor: '#BEBEBE'
                          },
                          margin: '0px 4px'
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          opModifyCancel(e);
                        }}
                        sx={{
                          borderColor: '#2065D1',
                          backgroundColor: '#fff',
                          color: '#1A6ECE',
                          ':hover': {
                            backgroundColor: '#fff',
                            borderColor: '#2065D1'
                          },
                          margin: '0px 4px'
                        }}
                      >
                        취소
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        handleExpList(e);
                      }}
                      sx={{
                        borderColor: '#BEBEBE',
                        ':hover': {
                          backgroundColor: '#2065D1',
                          borderColor: '#BEBEBE'
                        },
                        margin: '0px 4px'
                      }}
                    >
                      추가
                    </Button>
                  )}
                  {/* <Button
                    variant="contained"
                    onClick={(e) => handleExpList(e)}
                    sx={{
                      borderColor: '#BEBEBE',
                      ':hover': {
                        backgroundColor: '#2065D1',
                        borderColor: '#BEBEBE'
                      },
                      margin: '0px 4px'
                    }}
                  >
                    추가
                  </Button> */}
                </Grid>
              </Collapse>
            </Box>
            <Grid
              container
              xs={12}
              sx={{ m: '10px 0px' }}
              justifyContent="center"
              spacing={2}
            >
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
                onClick={handleCloseEvent}
              >
                취소
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  borderColor: '#BEBEBE',
                  ':hover': {
                    backgroundColor: '#2065D1',
                    borderColor: '#BEBEBE'
                  },
                  margin: '0px 4px'
                }}
              >
                완료
              </Button>
            </Grid>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default CarOperation;

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
