import {
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Box, Container } from '@mui/system';
import RectangleIcon from '@mui/icons-material/Rectangle';
import styled from '@emotion/styled';
import Label from '../common/Label';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import RectangleBtn from '../common/RectangleBtn';
import { useDispatch } from 'react-redux';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import axiosInstance from '../../utils/axios';

const CarMaintRegister = ({
  carCode,
  style,
  maintData,
  setMaintData,
  handleModalClose,
  mileage
}) => {
  const [maintItem, setMaintItem] = useState({
    maintItemList: [],
    maintComList: []
  });

  const dispatch = useDispatch();

  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  // 정비 내역, 정비 업체 axios 요청
  useEffect(() => {
    axiosInstance
      .get('/manager/car/getMaintItem')
      .then((res) => {
        console.log(res.data);
        setMaintItem({
          ...maintItem,
          maintItemList: res.data.carMaintItemList,
          maintComList: res.data.maintComList
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // datePicker
  const [cleared, setCleared] = useState(false);
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  // const [dateData, setDateData] = useState();

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  console.log(mileage);

  // 등록 데이터
  const [maintRegisterData, setMaintRegisterData] = useState({
    car_code: carCode,
    maint_item_code: '',
    mc_code: '',
    mem_code: 'MEM001',
    maint_start_at: dayjs(today),
    maint_cost: '',
    pay_method: '법인카드',
    memo: '',
    mileage: mileage === null ? 0 : mileage
  });

  useEffect(() => {
    console.log(maintRegisterData);
    console.log(typeof maintRegisterData.maint_start_at);
  }, [maintRegisterData]);

  const handleMaintRegisterBtn = () => {
    if (
      maintRegisterData.car_code === '' ||
      maintRegisterData.maint_item_code === '' ||
      maintRegisterData.mc_code === '' ||
      maintRegisterData.maint_start_at === '' ||
      maintRegisterData.maint_cost === '' ||
      maintRegisterData.pay_method === ''
    ) {
      alert('입력되지 않은 데이터가 있습니다');
      return;
    }
    if (typeof maintRegisterData.maint_start_at !== 'string') {
      setMaintRegisterData({
        ...maintRegisterData,
        maint_start_at: maintRegisterData.maint_start_at.toISOString()
      });
    }

    console.log(maintRegisterData);
    axiosInstance
      .post('/manager/car/maintRecordRegister', maintRegisterData)
      .then((res) => {
        console.log(res.data);
        // res.data -> maint 객체 하나
        const newData = {
          maint_name: res.data.carMaintResponseVO.maint_name,
          maint_start_at: new Date(
            res.data.maint_start_at
          ).toLocaleDateString(),
          maint_end_at:
            res.data.maint_end_at !== null
              ? new Date(res.data.maint_end_at).toLocaleDateString()
              : '-',
          maint_cost: res.data.maint_cost,
          pay_method: res.data.pay_method,
          mc_name: res.data.maintComResponseVO.mc_name,
          mem_info: [
            res.data.memResponseVO.name,
            res.data.memResponseVO.deptVO.dept_name +
              ' ' +
              res.data.memResponseVO.position_name
          ],
          memo: res.data.memo,
          maint_code: res.data.maint_code
        };
        // 등록후, 새롭게 저장된 maintRecord 정보를 리스트에 추가해주기
        setMaintData([...maintData, newData]);

        // 모달창 내리고, 등록 완료 snackbar 보여주기
        handleModalClose();
        handleSetSnackbarContent('등록이 완료되었습니다.');
        handleOpenSnackbar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={style}>
      <Box sx={{ pt: 2, px: 4, pb: 3, bgcolor: 'background.paper' }}>
        <Container sx={{ padding: '0px 0px !important' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              width: '100%',
              borderBottom: '3px solid black',
              padding: '15px 0px'
            }}
          >
            <Box display="flex">
              <RectangleIcon
                sx={{
                  color: 'black',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  width: '6px',
                  height: '6px'
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  marginLeft: '10px',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                기본 정보
              </Typography>
            </Box>
          </Box>
          <Grid
            container
            spacing={1}
            rowSpacing={4}
            margin="5px 0px"
            padding="0px 25px"
          >
            <Grid item container justifyContent="center" spacing={3}>
              <StyledLabelGrid item xs={1.5}>
                <Label htmlFor={'carMaint'} text={'정비명'} />
              </StyledLabelGrid>
              <Grid
                item
                xs={4.5}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                display="inline-flex"
              >
                <FormControl sx={{ minWidth: 80 }}>
                  <InputLabel id="demo-multiple-name-label"></InputLabel>
                  <TextField
                    id="outlined-select-currency"
                    select
                    value={maintRegisterData.maint_item_code}
                    onChange={(e) => {
                      setMaintRegisterData({
                        ...maintRegisterData,
                        maint_item_code: e.target.value
                      });
                    }}
                    SelectProps={{
                      MenuProps: { style: { maxHeight: 400 } }
                    }}
                  >
                    {maintItem.maintItemList.map((item) => (
                      <MenuItem value={item.maint_item_code}>
                        {item.maint_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <StyledLabelGrid item xs={1.5}>
                <Label htmlFor={'carMaint'} text={'정비업체'} />
              </StyledLabelGrid>
              <Grid
                item
                xs={4.5}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                display="inline-flex"
              >
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-multiple-name-label"></InputLabel>
                  <TextField
                    id="outlined-select-currency"
                    select
                    value={maintRegisterData.mc_code}
                    SelectProps={{
                      MenuProps: { style: { maxHeight: 400 } }
                    }}
                    onChange={(e) => {
                      setMaintRegisterData({
                        ...maintRegisterData,
                        mc_code: e.target.value
                      });
                    }}
                  >
                    {maintItem.maintComList.map((item) => (
                      <MenuItem key={item.mc_code} value={item.mc_code}>
                        {item.mc_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center" spacing={3}>
              <StyledLabelGrid item xs={1.5}>
                <Label htmlFor={'carMaint'} text={'정비 시작일'} />
              </StyledLabelGrid>
              <Grid item xs={4.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    sx={{
                      width: '100% !important',
                      height: '100%'
                    }}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    display="inline-flex"
                  >
                    <DemoItem>
                      <DatePicker
                        sx={{ width: 260 }}
                        slotProps={{
                          field: {
                            clearable: true,
                            onClear: () => setCleared(true)
                          }
                        }}
                        value={maintRegisterData.maint_start_at}
                        onChange={(newValue) => {
                          setMaintRegisterData({
                            ...maintRegisterData,
                            maint_start_at: newValue
                          });
                        }}
                      />
                    </DemoItem>
                  </Box>
                </LocalizationProvider>
              </Grid>
              <StyledLabelGrid item xs={1.5}>
                <Label htmlFor={'carMaint'} text={'정비 비용'} />
              </StyledLabelGrid>
              <Grid
                item
                xs={4.5}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                display="inline-flex"
              >
                <TextField
                  required
                  id="outlined-multiline-flexible"
                  placeholder="0"
                  type="number"
                  sx={{ m: 1 }}
                  InputProps={{
                    inputProps: { min: 0 },
                    endAdornment: (
                      <InputAdornment position="end">원</InputAdornment>
                    )
                  }}
                  value={maintRegisterData.maint_cost}
                  onChange={(e) => {
                    setMaintRegisterData({
                      ...maintRegisterData,
                      maint_cost: e.target.value
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3}>
              <StyledLabelGrid item xs={1.5}>
                <Label htmlFor={'carMaint'} text={'결제 수단'} />
              </StyledLabelGrid>
              <Grid item xs={4.5}>
                <RadioGroup
                  row
                  name="row-radio-buttons-group"
                  defaultValue={maintRegisterData.pay_method}
                  value={maintRegisterData.pay_method}
                  onChange={(e) => {
                    setMaintRegisterData({
                      ...maintRegisterData,
                      pay_method: e.target.value
                    });
                  }}
                >
                  <Grid item display="flex" xs={4}>
                    <FormControlLabel
                      value="법인카드"
                      control={<Radio />}
                      label={<Chip label="법인 카드" />}
                    />
                    <FormControlLabel
                      value="개인카드"
                      control={<Radio />}
                      label={<Chip label="개인 카드" />}
                    />
                    <FormControlLabel
                      value="법인현금"
                      control={<Radio />}
                      label={<Chip label="법인 현금" />}
                    />
                    <FormControlLabel
                      value="개인현금"
                      control={<Radio />}
                      label={<Chip label="개인 현금" />}
                    />
                  </Grid>
                </RadioGroup>
                <Grid xs={1.5}></Grid>
                <Grid xs={4.5}></Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={3.5}>
              <StyledLabelGrid item xs={1.5}>
                <Label htmlFor={'carMaint'} text={'메모'} />
              </StyledLabelGrid>
              <Grid item xs={10.5}>
                <TextField
                  id="carName"
                  variant="outlined"
                  value={maintRegisterData.memo}
                  multiline
                  onChange={(e) => {
                    setMaintRegisterData({
                      ...maintRegisterData,
                      memo: e.target.value
                    });
                  }}
                ></TextField>
              </Grid>
              <Grid xs={1.5}></Grid>
              <Grid xs={4.5}></Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ m: '10px 0px' }}
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="140px"
          height="36px"
        >
          <RectangleBtn
            item
            text={'취소'}
            category={'cancel'}
            sx={{ width: '64px' }}
          />
          <RectangleBtn
            item
            text={'등록'}
            category={'register'}
            sx={{ width: '64px' }}
            handlebtn={handleMaintRegisterBtn}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CarMaintRegister;

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
