import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import Label from '../common/Label';
import styled from '@emotion/styled';
import TimeField from '../common/TimeField';
import DaumPost from './DaumPost';
import { useEffect, useState } from 'react';
import RectangleBtn from '../common/RectangleBtn';
import { palette } from '../../theme/palette';
import Modal from '../common/Modal';
import SubSideContents from './SubsideContents';
import axios from 'axios';
import Selectbox from '../common/Selectbox';
import {
  openSanckbar,
  setSnackbarContent,
  setSnackbarStatus
} from '../../redux/reducer/SnackbarSlice';
import { useDispatch } from 'react-redux';

const ModifyRez = ({
  rezData,
  setRezData,
  rezLoc,
  formData,
  setFormData
  //   addressObj,
  //   setAddressObj
}) => {
  const [addressObj, setAddressObj] = useState({
    areaAddress: rezLoc[2].address,
    townAddress: ''
  });
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [carName, setCarName] = useState(rezData.car_name);
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
    setFormData({
      car_rez_code: rezData.car_rez_code,
      detail: rezData.detail,
      dest_loc: rezLoc[2].address,
      receipt_loc: rezLoc[0].address,
      return_loc: rezLoc[1].address,
      carDTO: {
        car_code: rezData.carDetailResponseVO.carVO.car_code,
        car_name: rezData.carDetailResponseVO.carVO.car_name
      },
      memDTO: { mem_code: rezData.memResponseVO.mem_code },
      est_mileage: rezData.est_mileage
    });
    console.log(formData);
  }, []);
  //   useEffect(() => {
  //     console.log(addressObj);
  //     setFormData({
  //       ...formData,
  //       dest_loc: addressObj.areaAddress + addressObj.townAddress
  //     });
  //     console.log(formData);
  //   }, [addressObj]);
  const handleAddress = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
      //   setFormData({
      //     ...formData,
      //     carDTO: { car_code: selectedRows.car_code },
      //     receipt_loc: selectedRows.car_address
      //   });
      setFormData({
        ...formData,
        carDTO: {
          car_code: selectedRows.car_code,
          car_name: selectedRows.car_name
        },
        receipt_loc: selectedRows.car_address
      });
      setCarName(selectedRows.car_name);
      //   setRezData({
      //     ...rezData,
      //     carDTO: {
      //       car_code: selectedRows.car_code,
      //       car_name: selectedRows.car_name
      //     },
      //     receipt_loc: selectedRows.car_address
      //   });
      setOpen(false);
    } else {
      handleSetSnackbarStatus('error');
      handleSetSnackbarContent('차량을 선택해주세요.');
      handleOpenSnackbar();
    }
    // axios
    //   .get(`http://localhost:8081/car_rez/carDetail/${selectedRows.car_code}`)
    //   .then((res) => {
    //     setCar({
    //       id: res.data.carVO.car_code,
    //       car_name: res.data.carVO.car_name
    //       //   accum_mileage: res.data.accum_mileage,
    //       //   authority: res.data.carVO.authority,
    //       //   fuel_type: res.data.carVO.fuel_type,
    //       //   fuel_effciency: res.data.fuel_effciency,
    //       //   car_address: res.data.car_address
    //     });
    //   });
  };
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
  return (
    <>
      {formData !== null && (
        <Grid container spacing={1}>
          <Grid item container spacing={2}>
            <StyledLabelGrid item xs={2}>
              <Label htmlFor={'carName'} text={'차량명'} />
            </StyledLabelGrid>
            <Grid item xs={8}>
              <TextField
                id="carName"
                variant="outlined"
                // defaultValue={rezData.carDTO.car_name}
                value={formData.carDTO.car_name}
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              <RectangleBtn
                type={'button'}
                text={'찾기'}
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
                content={<SubSideContents setSelectedRows={setSelectedRows} />}
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
                value={formData.dest_loc}
                onChange={handleAddress}
                // onBlur={handleAddress}
                readOnly
              />
            </Grid>
            <Grid item xs={2}>
              <DaumPost
                setAddressObj={setAddressObj}
                setFormData={setFormData}
                formData={formData}
              />
            </Grid>
            {/* 예상 주행 거리 */}
            <Grid item container xs={12} spacing={2}>
              <StyledLabelGrid item xs={3}>
                <Label htmlFor={'est_mileage'} text={'예상주행거리'} />
              </StyledLabelGrid>
              <Grid item xs={9}>
                <TextField
                  id="est_mileage"
                  name="est_mileage"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: (
                      <InputAdornment position="end">㎞</InputAdornment>
                    )
                  }}
                  defaultValue={formData.est_mileage}
                  onChange={(e) =>
                    setFormData({ ...formData, est_mileage: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
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
                defaultValue={formData.detail}
                onChange={(e) =>
                  setFormData({ ...formData, detail: e.target.value })
                }
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
                handleSelectBox={(e) => {
                  setFormData({ ...formData, return_loc: e.target.value });
                }}
                menuList={returnLocList}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ModifyRez;
const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
