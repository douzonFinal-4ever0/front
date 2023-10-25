import React from 'react';
import {
  Box,
  Grid,
  InputLabel,
  TextField,
  Stack,
  Input,
  ButtonGroup,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TimeField from '../../components/common/TimeField';
import SubHeader from '../../components/common/SubHeader';
import DaumPost from '../../components/car_user/DaumPost';
import { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal';
import Typography from '@mui/material/Typography';
import CarList from '../../components/car_user/CarList';
import axios from 'axios';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { useNavigate } from 'react-router-dom';
// import { formatDate } from '@fullcalendar/core';
import dayjs from 'dayjs';
import SubSideContents from '../../components/car_user/SubsideContents';
import Label from '../../components/common/Label';
import Selectbox from '../../components/common/Selectbox';
import RectangleBtn from '../../components/common/RectangleBtn';
import { palette } from '../../theme/palette';
import RectangleIcon from '@mui/icons-material/Rectangle';

const Register = () => {
  const navigate = useNavigate();
  const [addressObj, setAddressObj] = useState({
    areaAddress: '',
    townAddress: ''
  });
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [carDetail, setCarDetail] = useState({
    id: '',
    car_name: '',
    accum_mileage: '',
    authority: '',
    fuel_type: '',
    fuel_effciency: '',
    car_address: ''
  });

  const [formData, setFormData] = useState({
    memDTO: {
      mem_code: 'MEM001'
    },
    carDTO: {
      car_code: ''
    },
    detail: '',
    est_mileage: '',
    start_at: '',
    return_at: '',
    receipt_loc: '',
    return_loc: '',
    dest_loc: ''
  });
  const returnLocList = [
    {
      index: 0,
      value: '강원특별자치도 춘천시 남산면 버들1길 130'
    },
    {
      index: 0,
      value: '서울특별시 중구 을지로1가 을지로 29'
    },
    {
      index: 0,
      value: '부산 해운대구 센텀중앙로 79'
    }
  ];
  //값이 변하면 formdata 값변경 함수
  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleTimeChange = (e, name) => {
    //const { name, value } = e;
    //console.log(name);
    //console.log(value);
    console.log(typeof e.$d);
    setFormData({
      ...formData,
      [name]: e.$d
    });
  };
  //submit하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    var flag = 0;
    if (formData.carDTO.car_code === '') {
      alert('차량을 선택하세요');
      flag++;
    }
    if (formData.start_at === '' || formData.return_at === '') {
      alert('날짜를 선택하세요');
      flag++;
    }
    if (formData.return_loc === '' || formData.dest_loc === '') {
      alert('장소를 선택하세요');
      flag++;
    }
    if (flag === 0) {
      axios
        .post('http://localhost:8081/car_rez/rezSave', formData)
        .then((res) => {
          console.log('예약 완료 : ' + res.data);
          navigate('../carRezComplete', { state: res.data });
        });
    }
  };

  //modal여는 함수
  const handleOpenModal = () => {
    setOpen(true);
  };
  //modal 닫는 함수
  const handleCloseModal = (reason) => {
    if (reason === 'buttonClick') {
      // 특정 버튼을 클릭한 경우의 처리
      console.log('사용자가 버튼을 클릭하여 모달이 닫힘');
    }
    setOpen(false);
  };
  //차량 선택 후 처리
  const carSelect = () => {
    console.log(selectedRows);
    if (selectedRows.length !== 0) {
      //console.log(selectedRows.id);
      setFormData({
        ...formData,
        carDTO: { car_code: selectedRows.car_code },
        receipt_loc: selectedRows.car_address
      });
      setOpen(false);
    } else {
      alert('차량을 선택해주세요');
    }
    axios
      .get(`http://localhost:8081/car_rez/carDetail/${selectedRows.car_code}`)
      .then((res) => {
        setCarDetail({
          id: res.data.carVO.car_code,
          car_name: res.data.carVO.car_name,
          accum_mileage: res.data.accum_mileage,
          authority: res.data.carVO.authority,
          fuel_type: res.data.carVO.fuel_type,
          fuel_effciency: res.data.fuel_effciency,
          car_address: res.data.car_address
        });
      });
  };
  useEffect(() => {
    setFormData({
      ...formData,
      dest_loc: addressObj.areaAddress + addressObj.townAddress
    });
  }, [addressObj]);
  const hiddenStyle = {
    display: 'none'
  };
  return (
    <>
      <SubHeader title={'차량 예약'} />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16 }}
        >
          <Grid item xs={6}>
            <Item>
              <Stack sx={{ rowGap: '10px' }}>
                <Box
                  display="flex"
                  marginTop="15px"
                  sx={{
                    width: '100%',
                    borderBottom: '3px solid black',
                    padding: '5px 0px'
                  }}
                  mb={1}
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
                {/* 이름 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'mem_code'} text={'이름'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="mem_code"
                      variant="outlined"
                      placeholder="이름을 입력하세요"
                    />
                  </Grid>
                </Grid>

                {/* 부서 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'dpt_name'} text={'부서'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="dpt_name"
                      variant="outlined"
                      placeholder="부서를 입력하세요"
                    />
                  </Grid>
                </Grid>

                {/* 직급 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'position_name'} text={'직급'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="position_name"
                      variant="outlined"
                      placeholder="직급을 입력하세요"
                    />
                  </Grid>
                </Grid>
                {/* 목적 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'detail'} text={'목적'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="detail"
                      name="detail"
                      variant="outlined"
                      placeholder="목적을 입력하세요"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                {/* 대여 날짜 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'start_at'} text={'대여 날짜'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TimeField
                      withMonth={true}
                      label={'대여 날짜'}
                      name={'start_at'}
                      onChange={(e) => handleTimeChange(e, 'start_at')}
                    ></TimeField>
                  </Grid>
                </Grid>
                {/* 반납 날짜 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'return_at'} text={'반납 날짜'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TimeField
                      withMonth={true}
                      label={'반납 날짜'}
                      name={'return_at'}
                      onChange={(e) => handleTimeChange(e, 'return_at')}
                    ></TimeField>
                  </Grid>
                </Grid>
                {/* 목적지 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'dest'} text={'목적지'} />
                  </StyledLabelGrid>
                  <Grid item xs={8}>
                    <TextField
                      id="dest"
                      name="dest_loc"
                      type="text"
                      value={addressObj.areaAddress + addressObj.townAddress}
                      onChange={handleChange}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DaumPost setAddressObj={setAddressObj} />
                  </Grid>
                </Grid>
                {/* 차량 찾기 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'detail'} text={'차량 찾기'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    {/* <Button onClick={handleOpenModal}>차량 찾기</Button> */}
                    <RectangleBtn
                      type={'button'}
                      text={'차량 찾기'}
                      sx={{
                        padding: '14px 12px',
                        backgroundColor: palette.grey['500']
                      }}
                      handlebtn={handleOpenModal}
                    />
                    <Modal
                      open={open}
                      handleModal={(e, reason) => handleCloseModal(reason)}
                      modalTitle={'차량 찾기'}
                      content={
                        <SubSideContents setSelectedRows={setSelectedRows} />
                      }
                      buttons={
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
                            onClick={handleCloseModal}
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
                            onClick={carSelect}
                          >
                            선택
                          </Button>
                        </Grid>
                      }
                    />
                  </Grid>
                </Grid>
                {/* 예상 주행 거리 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'est_mileage'} text={'예상주행거리'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="est_mileage"
                      name="est_mileage"
                      type="number"
                      onChange={handleChange}
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
              <Stack sx={{ rowGap: '10px' }}>
                <Box
                  display="flex"
                  marginTop="15px"
                  sx={{
                    width: '100%',
                    borderBottom: '3px solid black',
                    padding: '5px 0px'
                  }}
                  mb={1}
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
                    차량 정보
                  </Typography>
                </Box>

                {/* 차종 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'car_name'} text={'차종'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="car_name"
                      type="text"
                      value={carDetail.car_name}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 차량 번호 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'car_code'} text={'차량 번호'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="car_code"
                      name="car_code"
                      type="text"
                      onChange={handleChange}
                      value={carDetail.id}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 누적 주행 거리 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'accum_mileage'} text={'누적주행거리'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="accum_mileage"
                      type="text"
                      value={carDetail.accum_mileage}
                      readOnly
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                {/* 권한 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'authority'} text={'권한'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="authority"
                      type="text"
                      value={carDetail.authority}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 유종 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'fuel_type'} text={'유종'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="fuel_type"
                      type="text"
                      value={carDetail.fuel_type}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 유종 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'fuel_effciency'} text={'연비'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="fuel_effciency"
                      type="text"
                      value={carDetail.fuel_effciency}
                      readOnly
                      InputProps={{
                        inputProps: { min: 0 },
                        endAdornment: (
                          <InputAdornment position="end">㎞/ℓ</InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                {/* 인수지 */}
                <Grid item container xs={12} spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'receipt_loc'} text={'인수지'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <TextField
                      id="receipt_loc"
                      name="receipt_loc"
                      type="text"
                      onChange={handleChange}
                      value={carDetail.car_address}
                      readOnly
                    />
                  </Grid>
                </Grid>
                {/* 반납지 */}
                <Grid item container spacing={2}>
                  <StyledLabelGrid item xs={2}>
                    <Label htmlFor={'return_loc'} text={'반납지'} />
                  </StyledLabelGrid>
                  <Grid item xs={10}>
                    <Selectbox
                      name="return_loc"
                      // onChange={handleChange}
                      value={formData.return_loc}
                      handleSelectBox={handleChange}
                      menuList={returnLocList}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Item>
          </Grid>
        </Grid>
        <BottomBox>
          <Button
            variant="contained"
            color="success"
            style={{ marginRight: '10px' }}
            type="submit"
          >
            예약
          </Button>
          <Button variant="outlined" color="error">
            Error
          </Button>
        </BottomBox>
      </form>
    </>
  );
};
export default Register;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 650
}));

const BottomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 5,
  marginRight: 16
}));

const NewFormControl = styled(FormControl)(({ theme }) => ({
  textAlign: 'left',
  margin: 7
}));

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
