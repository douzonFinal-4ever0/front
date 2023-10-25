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
  Typography
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

const CarOperation = ({ rezCode, open, handleClose }) => {
  const [rezData, setRezData] = useState(null);
  const [rezLoc, setRezLoc] = useState(null);
  const [spend, setSpend] = useState(false);
  const [formData, setFormData] = useState(null);
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
  const handleCloseEvent = () => {
    setImages([]);
    handleClose();
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8081/car_rez/carRezDetail/${rezCode}`)
      .then((res) => {
        console.log(res.data);
        setRezData(res.data);
        setFormData({
          ...formData,
          distance: res.data.est_mileage,
          car_rez_code: res.data.car_rez_code,
          bef_mileage: res.data.carDetailResponseVO.accum_mileage,
          mem_code: res.data.memResponseVO.mem_code,
          car_code: res.data.carDetailResponseVO.car_code
        });
      });
    axios
      .get(`http://localhost:8081/car_rez/locations/${rezCode}`)
      .then((res) => {
        console.log(res.data);
        setRezLoc(res.data);
      });
  }, [rezCode]);
  //지출 여부
  const handleSpend = (e) => {
    console.log(e.target.value);
    setSpend(!spend);
  };
  /*---------------------------------이미지 저장---------------------------------- */
  const [images, setImages] = useState(null); // 이미지 배열
  /**이미지가 리스트에 추가가 되는 이벤트 */
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = { src: e.target.result, title: file.name };
        setImages(newImage);
        console.log(images);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: 750 }}>
        {(formData !== null) & (rezData !== null) && (
          <>
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
                    <Label htmlFor={'distance'} text={'주행 후 계기판 거리'} />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <TextField
                      id="distance"
                      variant="outlined"
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
                      value={
                        formData.distance +
                        rezData.carDetailResponseVO.accum_mileage
                      }
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
                      variant="outlined"
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
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
                      variant="outlined"
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
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
                      variant="outlined"
                      type="text"
                      multiline
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
                      onChange={handleSpend}
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
                        <Label htmlFor={'distance'} text={'지출날짜'} />
                      </StyledLabelGrid>
                      <Grid item xs={8}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <StyledLabelGrid item xs={3}>
                        <Label htmlFor={'distance'} text={'지출금액'} />
                      </StyledLabelGrid>
                      <Grid item xs={8}>
                        <TextField
                          id="distance"
                          variant="outlined"
                          type="number"
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
                        <Label htmlFor={'distance'} text={'지출내용'} />
                      </StyledLabelGrid>
                      <Grid item xs={8}>
                        <TextField
                          id="distance"
                          variant="outlined"
                          type="number"
                        ></TextField>
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <StyledLabelGrid item xs={3}>
                        <Label htmlFor={'imgUpload'} text={'영수증'} />
                      </StyledLabelGrid>
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
                    </Grid>
                  </Grid>
                  <Grid container xs={6} sx={{ border: '1px solid #ccc' }}>
                    {/* <ImageList sx={1} cols={1} rowHeight={'auto'}>
                  {images.map((item, index) => (
                    <ImageListItem key={index}> */}
                    {images !== null && (
                      <img src={images.src} alt={images.title} loading="lazy" />
                    )}
                    {/* </ImageListItem> */}
                    {/* ))} */}
                    {/* </ImageList> */}
                  </Grid>
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
          </>
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
