import SubHeader from '../../components/common/SubHeader';
import SubSidebar from '../../components/common/SubSidebar';
import Drawer from '../../components/common/Drawer';
import { useState, useEffect } from 'react';
import Box from '@mui/system/Box';
import {
  Button,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItem,
  ListItemIcon,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  CardHeader,
  Typography,
  InputAdornment,
  Paper,
  FormControl,
  Select
} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Circle } from '@mui/icons-material';
import { Container, Stack } from '@mui/system';
import styled from '@emotion/styled';
import Searchbar from '../../components/common/Searchbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, datePickerToolbarClasses } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import UserSearchBar from '../../components/car_admin/UserSearchBar';
import cardata from '../../cardata.json';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { openDrawer, closeDrawer } from '../../redux/reducer/DrawerSlice';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import { palette } from '../../theme/palette';
import axiosInstance from '../../utils/axios';
import Selectbox from '../../components/common/Selectbox';
import PersonIcon from '@mui/icons-material/Person';
import RectangleBtn from '../../components/common/RectangleBtn';
import CarInfo from '../../components/car_admin/CarInfo';

// transferList 관련 함수
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

// transferList 관련 함수 끝

// 서브 사이드바 콘텐츠
const SubSidebarContent = ({
  setTabData,
  carInfo,
  setCarInfo,
  setFilterValue,
  setSearchValue,
  setSearchInput
}) => {
  //   const isDrawerOpen = useSelector((state) => state.drawer.isDrawerOpen);
  const dispatch = useDispatch();

  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  const handleCarRegisterBtn = () => {
    setTabData([
      {
        title: '차량 등록',
        content: <CarRegisterFrom carInfo={carInfo} setCarInfo={setCarInfo} />
      }
    ]);
    handleOpenDrawer();
  };

  const handleFilterClick = (e, filterValue) => {
    e.stopPropagation();
    setSearchValue('');
    setSearchInput('');
    setFilterValue(filterValue);
  };

  const handleClick = () => {
    setSearchValue('');
    setSearchInput('');
    setFilterValue('전체');
  };
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2 }}>
      <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={handleCarRegisterBtn}
        >
          차량 등록
        </Button>
      </Grid>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={`전체 차량(${
                carInfo.filter((item) => item.car_status != '삭제됨').length
              })`}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={(e) => {
                handleFilterClick(e, '승용차');
              }}
            >
              <ListItemIcon>
                <Circle color="primary" sx={{ width: '15px !important' }} />
              </ListItemIcon>
              <ListItemText
                primary={`승용차 (${
                  carInfo.filter(
                    (obj) =>
                      obj.type === '승용차' && obj.car_status !== '삭제됨'
                  ).length
                })`}
                primaryTypographyProps={{ fontSize: '13px' }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={(e) => {
                handleFilterClick(e, '화물차');
              }}
            >
              <ListItemIcon>
                <Circle color="success" sx={{ width: '15px !important' }} />
              </ListItemIcon>
              <ListItemText
                primary={`화물차 (${
                  carInfo.filter(
                    (obj) =>
                      obj.type === '화물차' && obj.car_status !== '삭제됨'
                  ).length
                })`}
                primaryTypographyProps={{ fontSize: '13px' }}
              />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          onClick={(e) => {
            handleFilterClick(e, '삭제됨');
          }}
        >
          <ListItemText
            primary={`삭제된 차량 (${
              carInfo.filter((obj) => obj.car_status === '삭제됨').length
            })`}
          />
        </ListItemButton>
      </List>
      {/* </Box> */}
    </Box>
  );
};

// 차량 등록 Drawer 컴포넌트
const CarRegisterFrom = ({ carInfo, setCarInfo }) => {
  // carInfo props로 잘 받았는지 확인
  console.log(carInfo);

  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);

  // 차량 등록 데이터
  // transferList 관련 변수, 함수들
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const [dateData, setDateData] = useState(dayjs(today));

  const [registerData, setRegisterData] = useState({
    car_code: '',
    car_name: null,
    type: '승용차',
    fuel_type: '휘발유',
    authority: '모두',
    buy_at: dayjs(today).toISOString(),
    memo: '',
    max_capacity: 0,
    carDetail: {
      fuel_effciency: '',
      accum_mileage: '',
      car_address: '강원특별자치도 춘천시 남산면 버들1길 130'
    },
    carUser: { mem_code: left[0] ? left[0] : null, car_code: '' }
  });

  const [autoCompleteValue, setAutoCompleteValue] = useState(null);

  const handleChange = (event) => {
    setRegisterData({ ...registerData, fuel_type: event.target.value });
  };

  const [isShowSelectUser, setIsSelectUser] = useState(false);

  const handleCarAuthority = (e) => {
    if (e.target.value === '모두') {
      setLeft([]);
      setRight(right.concat(left));
    }
    setRegisterData({ ...registerData, authority: e.target.value });
    setIsSelectUser(e.target.value === '모두' ? false : true);
  };

  // axios로 사용자 정보 불러오기
  useEffect(() => {
    axiosInstance
      .get('/manager/memList')
      .then((res) => {
        setRight(res.data);
      })
      .catch((error) => {
        // 에러 발생 시 코드 실행
        console.log(error);
      });
  }, []);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [checked]; // 하나만 체크할 수 있도록 변경

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    if (left.length < 1) {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
      setRegisterData({
        ...registerData,
        carUser: { ...registerData.carUser, mem_code: rightChecked[0].mem_code }
      });
    }
  };

  const customList = (items, header) => (
    <Card
      sx={{
        width: '100%',
        height: 230,
        overflow: 'auto',
        backgroundColor: '#f5f5f5'
      }}
    >
      {header}
      <Divider />
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${value['mem_code']} ${value['name']} ${value.deptVO.dept_name}_${value['position_name']}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  // transferList 관련 함수, 변수들 끝

  // autoComplete
  // const carData = CarFuelData;

  const carData = cardata;

  const defaultProps = {
    options:
      registerData.type === '승용차'
        ? cardata.filter((item) => item.type === '승용차')
        : cardata.filter((item) => item.type === '화물차'),
    getOptionLabel: (option) => {
      return option ? option.model : '';
    }
  };

  // 사용자 검색 기능
  const [inputUser, setInputUser] = useState('');

  // 사용자 검색할 때
  const handleInputUser = (e) => {
    setInputUser(e.target.value);
  };

  // 검색어에 따라 데이터 필터링
  const filterMemData = right.filter((item) =>
    item['name'].includes(inputUser)
  );

  // 사용자 검색 기능 끝

  // datePicker
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  // datePicker 끝

  // 차량 위치
  const returnLocList = [
    {
      index: 0,
      key: 0,
      value: '강원특별자치도 춘천시 남산면 버들1길 130'
    },
    {
      index: 1,
      key: 1,
      value: '서울특별시 중구 을지로1가 을지로 29'
    },
    {
      index: 2,
      key: 2,
      value: '부산 해운대구 센텀중앙로 79'
    }
  ];

  const handleLocChange = (e) => {
    setRegisterData({
      ...registerData,
      carDetail: { ...registerData.carDetail, car_address: e.target.value }
    });
  };

  // 차량 위치 끝

  // 차량 등록 버튼
  const handleSubmitBtn = async (e) => {
    if (
      registerData.car_code === null ||
      registerData.type === null ||
      registerData.car_name === null ||
      registerData.fuel_type === null ||
      registerData.carDetail.fuel_effciency === null ||
      registerData.authority === '' ||
      registerData.max_capacity === null ||
      registerData.car_address === ''
    ) {
      alert('입력하지 않은 필수값이 있습니다.');
      return;
    }

    e.stopPropagation();

    console.log(registerData);

    await axiosInstance
      .post('/manager/car/carRegister', registerData)
      .then((res) => {})
      .catch((error) => {
        // 에러 발생 시 코드 실행
        console.log(error);
      });
    axiosInstance
      .get(`/manager/car/carListGetOne`, {
        params: {
          car_code: registerData.car_code
        }
      })
      .then((res) => {
        // console.log(res);
        const newCarInfo = [...carInfo, res.data];

        setCarInfo(newCarInfo);
        handleCloseDrawer();
        handleSetSnackbarContent('등록이 완료되었습니다.');
        handleOpenSnackbar();
      });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {
          m: 1,
          width: '100%',
          backgroundColor: palette.grey[100]
        },
        '& .MuiGrid-item': { alignSelf: 'center' }
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction="row" justifyContent="end">
        <Button
          variant="contained"
          size="large"
          sx={{ width: '12%' }}
          onClick={handleSubmitBtn}
        >
          차량 등록
        </Button>
      </Stack>
      {/* 전체 그리드 */}
      <Grid sx={{ flexGrow: 1, p: '30px' }} container>
        <Grid item xs={12}>
          {/* TODO */}
          <RadioGroup
            row
            name="row-radio-buttons-group"
            defaultValue="승용차"
            value={registerData.type}
            onChange={(e) => {
              setRegisterData({ ...registerData, type: e.target.value });
              console.log(e.target.value);
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  종류 *
                </FormLabel>
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="승용차"
                  control={<Radio />}
                  label={<Chip label="승용차" color="primary" />}
                />
                <FormControlLabel
                  value="화물차"
                  control={<Radio />}
                  label={<Chip label="화물차" color="success" />}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <FormLabel
                item
                id="demo-row-radio-buttons-group-label"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  fontWeight: 'bold'
                }}
              >
                차량명 *
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                freeSolo
                {...defaultProps}
                item
                required
                value={autoCompleteValue}
                onChange={(event, newValue, clear) => {
                  if (clear === 'clear') {
                    console.log(event);
                    setRegisterData({
                      ...registerData,
                      car_name: '',
                      fuel_type: '',
                      type: '승용차',
                      max_capacity: 0,
                      carDetail: {
                        ...registerData.carDetail,
                        fuel_effciency: ''
                      }
                    });
                  } else {
                    setAutoCompleteValue(newValue);
                    setRegisterData({
                      ...registerData,
                      car_name: newValue.model,
                      fuel_type: newValue.fuel_type,
                      type: newValue.type,
                      max_capacity: newValue.max_capacity,
                      carDetail: {
                        ...registerData.carDetail,
                        fuel_effciency: newValue.fuel_effciency
                      }
                    });
                  }
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="차량명" />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel
                item
                id="demo-row-radio-buttons-group-label"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  fontWeight: 'bold'
                }}
              >
                차량번호 *
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ m: 1 }}
                item
                required
                id="outlined-multiline-flexible"
                placeholder="차량번호"
                value={registerData.car_code}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    car_code: e.target.value,
                    carUser: {
                      ...registerData.carUser,
                      car_code: e.target.value
                    }
                  });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <FormLabel
                item
                id="demo-row-radio-buttons-group-label"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontWeight: 'bold'
                }}
              >
                유종 *
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-select-currency"
                select
                label="유종"
                value={registerData.fuel_type}
                onChange={handleChange}
                sx={{ backgroundColor: '#f5f5f5' }}
              >
                <MenuItem key="휘발유" value="휘발유">
                  휘발유
                </MenuItem>
                <MenuItem key="경유" value="경유">
                  경유
                </MenuItem>
                <MenuItem key="LPG" value="LPG">
                  LPG
                </MenuItem>
                <MenuItem key="전기" value="전기">
                  전기
                </MenuItem>
                <MenuItem key="하이브리드" value="하이브리드">
                  전기
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={2}>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontWeight: 'bold'
                }}
              >
                연비 *
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="outlined-multiline-flexible"
                placeholder="연비"
                type="number"
                sx={{ m: 1 }}
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">㎞/ℓ</InputAdornment>
                  )
                }}
                value={registerData.carDetail.fuel_effciency}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    carDetail: {
                      ...registerData.carDetail,
                      fuel_effciency: e.target.value
                    }
                  });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontWeight: 'bold',
                  whiteSpace: 'pre-line'
                }}
              >
                {'누적 주행 거리'}
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="outlined-number"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">km</InputAdornment>
                  )
                }}
                placeholder="누적 주행 거리"
                InputLabelProps={{
                  shrink: true
                }}
                value={registerData.carDetail.accum_mileage}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    carDetail: {
                      ...registerData.carDetail,
                      accum_mileage: e.target.value
                    }
                  });
                }}
                sx={{ m: 1 }}
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel
                item
                id="demo-row-radio-buttons-group-label"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontWeight: 'bold',
                  whiteSpace: 'pre-line'
                }}
              >
                {'수용 인원'}
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <TextField
                item
                required
                id="outlined-number"
                type="number"
                InputProps={{
                  inputProps: { min: 0 }
                }}
                placeholder="수용 인원"
                InputLabelProps={{
                  shrink: true
                }}
                value={registerData.max_capacity}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    max_capacity: e.target.value
                  });
                }}
                sx={{ m: 1 }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <FormLabel
                item
                id="demo-row-radio-buttons-group-label"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                구입일자
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%'
                  }}
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
                      value={dateData}
                      onChange={(newValue) => {
                        setDateData(newValue);
                        setRegisterData({
                          ...registerData,
                          buy_at: newValue.toISOString()
                        });
                      }}
                    />
                  </DemoItem>
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <FormLabel
                item
                id="demo-row-radio-buttons-group-label"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                차량 위치
              </FormLabel>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                '& .MuiOutlinedInput-root': { margin: '8px !important' }
              }}
            >
              <Selectbox
                name="car_address"
                key={returnLocList.key}
                value={registerData.carDetail.car_address}
                handleSelectBox={(e) => handleLocChange(e)}
                menuList={returnLocList}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <FormLabel
                item
                id="demo-row-radio-buttons-group-label"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                메모
              </FormLabel>
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="outlined-multiline-static"
                label="메모"
                multiline
                value={registerData.memo}
                onChange={(e) => {
                  setRegisterData({ ...registerData, memo: e.target.value });
                }}
                rows={3}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            defaultValue={registerData.authority}
            onChange={handleCarAuthority}
          >
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <FormLabel
                  id=""
                  sx={{
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  차량 사용 권한 *
                </FormLabel>
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  value="모두"
                  control={<Radio />}
                  label="전체 사용 가능"
                />
                <FormControlLabel
                  value="지정"
                  control={<Radio />}
                  label="선택 사용자만 사용 가능"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
        {isShowSelectUser === true ? (
          <Grid container xs={12} spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              {customList(
                filterMemData,
                <CardHeader
                  sx={{ px: 2, py: 1, height: '65px' }}
                  title={
                    <UserSearchBar
                      placeholder={'사용자명 검색'}
                      value={inputUser}
                      handleInput={handleInputUser}
                    ></UserSearchBar>
                  }
                />
              )}
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0 || left.length >= 1}
                  aria-label="move selected left"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {customList(
                left,
                <CardHeader
                  sx={{ px: 2, py: 1, height: '65px' }}
                  title={
                    <Box display="flex">
                      <PersonIcon height="35px" width="35px" color="#637381" />
                      <Typography
                        variant="subtitle1"
                        color="#637381"
                        marginLeft="10px"
                      >
                        선택 사용자
                      </Typography>
                    </Box>
                  }
                />
              )}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

// 실제 등록 페이지
const CarManagePage = ({ isAdminMode, setIsAdminMode }) => {
  const [carInfo, setCarInfo] = useState([]);

  // const [deleteCar, setDeleteCar] = useState([]);
  const [tabData, setTabData] = useState([]);

  useEffect(() => {
    if (isAdminMode === false) {
      setIsAdminMode(true);
    }
  }, []);

  const [filter, setFilterValue] = useState('전체');

  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchBtn = (e) => {
    e.preventDefault();
    // alert('검색 : ' + searchInput);

    const pattern = /^[0-9]{2,3}[\s]*[가-힣]{1}[\s]*[0-9]{4}$/;
    if (pattern.test(searchInput)) {
      setSearchType(0);
      setSearchValue(searchInput);
    } else {
      setSearchType(1);
      setSearchValue(searchInput);
    }
    setSearchInput('');
  };

  // 상세 검색 보내줄 객체
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);

  const [searchFilter, setSearchFilter] = useState({
    operation_sdate: null,
    operation_edate: today,
    authority: '전체',
    max_capacity: 0,
    sdistance: 0,
    edistance: 150000
  });

  // 상세 검색 관련 함수
  const [openSearchDetail, setOpenSearchDetail] = useState(false);

  const handleDetailBtn = () => {
    setOpenSearchDetail((prev) => !prev);
  };

  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleFilterBtn = () => {
    console.log(searchFilter);
    axiosInstance
      .post('/manager/car/carList', searchFilter)
      .then((res) => {
        console.log(res.data);
        setCarInfo(res.data);
        // 삭제 차량 수 설정
      })
      .catch((error) => {
        // 에러 발생 시 코드 실행
        console.log(error);
      });
  };

  const handleReturnBtn = () => {
    setSearchFilter({
      operation_sdate: null,
      operation_edate: today,
      authority: '전체',
      max_capacity: 0,
      sdistance: 0,
      edistance: 150000
    });
  };

  const searchDetailForm = (
    <Paper sx={{ width: '100%', padding: '10px 25px', overflow: 'hidden' }}>
      <Grid container marginBottom="25px">
        <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2">최근 운행 일자</Typography>
        </Grid>
        <Grid item xs={4.5} sx={{ overflow: 'hidden' }}>
          <Box display="flex">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <DemoItem>
                  <DatePicker
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '40px',
                        width: '150px'
                      },
                      '& .MuiInputBase-inputAdornedEnd': { fontSize: '15px' }
                    }}
                    format="YYYY-MM-DD"
                    value={
                      searchFilter.operation_sdate
                        ? dayjs(searchFilter.operation_sdate)
                        : null
                    }
                    onChange={(newValue) => {
                      console.log(searchFilter.operation_sdate);
                      setSearchFilter({
                        ...searchFilter,
                        operation_sdate: newValue.format('YYYY-MM-DD')
                      });
                    }}
                  />
                </DemoItem>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0px 10px'
                }}
              >
                <Typography variant="h6">-</Typography>
              </Box>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <DemoItem>
                  <DatePicker
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '40px',
                        width: '150px'
                      },
                      '& .MuiInputBase-inputAdornedEnd': { fontSize: '15px' }
                    }}
                    format="YYYY-MM-DD"
                    size="small"
                    value={dayjs(searchFilter.operation_edate)}
                    onChange={(newValue) => {
                      console.log(searchFilter.operation_edate);
                      setSearchFilter({
                        ...searchFilter,
                        operation_edate: newValue.format('YYYY-MM-DD')
                      });
                    }}
                  />
                </DemoItem>
              </Box>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
        >
          <Typography variant="subtitle2">운행 권한</Typography>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{ minWidth: 120, '& .MuiFormControl-root': { width: '130px' } }}
          >
            <FormControl
              sx={{
                '& .MuiInputBase-root': { width: '130px', height: '40px' }
              }}
            >
              <Select
                id="demo-simple-select"
                value={searchFilter.authority}
                displayEmpty
                onChange={(e) => {
                  setSearchFilter({
                    ...searchFilter,
                    authority: e.target.value
                  });
                }}
              >
                <MenuItem value="전체">전체</MenuItem>
                <MenuItem value="모두">모두</MenuItem>
                <MenuItem value="지정">지정</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2">최대 수용 인원</Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Box sx={{ minWidth: 120, width: '270px' }}>
            <FormControl
              fullWidth
              displayEmpty
              sx={{
                '& .MuiInputBase-root': { width: '270px', height: '40px' }
              }}
            >
              <Select
                id="demo-simple-select"
                value={searchFilter.max_capacity}
                onChange={(e) => {
                  setSearchFilter({
                    ...searchFilter,
                    max_capacity: e.target.value
                  });
                }}
              >
                <MenuItem value={0}>전체</MenuItem>
                <MenuItem value={1}>5명 이하</MenuItem>
                <MenuItem value={2}>7명 이상</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
        >
          <Typography variant="subtitle2">누적주행거리</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              minWidth: 120,
              display: 'flex',
              '& .MuiFormControl-root': { width: '130px', height: '40px' }
            }}
          >
            <TextField
              type="number"
              InputProps={{
                inputProps: { min: 0 },
                endAdornment: <InputAdornment position="end">㎞</InputAdornment>
              }}
              sx={{
                '& .MuiInputBase-root': { width: '130px', height: '40px' }
              }}
              value={searchFilter.sdistance}
              onChange={(e) => {
                setSearchFilter({ ...searchFilter, sdistance: e.target.value });
              }}
            ></TextField>
            <Typography variant="h6" margin="0px 10px">
              -
            </Typography>
            <TextField
              type="number"
              InputProps={{
                inputProps: { min: 0 },
                endAdornment: <InputAdornment position="end">㎞</InputAdornment>
              }}
              sx={{
                '& .MuiInputBase-root': { width: '130px', height: '40px' }
              }}
              value={searchFilter.edistance}
              onChange={(e) => {
                setSearchFilter({ ...searchFilter, edistance: e.target.value });
              }}
            ></TextField>
          </Box>
        </Grid>
      </Grid>
      <Grid
        flexGrow={1}
        display="flex"
        justifyContent="center"
        marginTop="30px"
      >
        <Box width="8%" marginRight="25px">
          <RectangleBtn
            text="초기화"
            category="cancel"
            sx={{ height: '35px', padding: '0px' }}
            handlebtn={handleReturnBtn}
          />
        </Box>
        <Box width="8%">
          <RectangleBtn
            text="적용"
            category="register"
            sx={{ height: '35px', padding: '0px' }}
            handlebtn={handleFilterBtn}
          />
        </Box>
      </Grid>
    </Paper>
  );

  // car DataGrid 시작

  useEffect(() => {
    console.log(searchFilter);
    axiosInstance
      .post('/manager/car/carList', searchFilter)
      .then((res) => {
        console.log(res.data);
        setCarInfo(res.data);
        // 삭제 차량 수 설정
      })
      .catch((error) => {
        // 에러 발생 시 코드 실행
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* 캘린더 이벤트 전달은 객체 배열을 props로 전달하여 표시
            
        */}
      <SubHeader title={'차량'} />
      <Box sx={{ display: 'flex', height: 'calc(100% - 67px)' }}>
        <SubSidebar
          content={
            <SubSidebarContent
              setTabData={setTabData}
              carInfo={carInfo}
              setCarInfo={setCarInfo}
              setFilterValue={setFilterValue}
              setSearchValue={setSearchValue}
              setSearchInput={setSearchInput}
            />
          }
          widthP={20}
        />
        <Drawer width={1150} tabData={tabData} />
        <Box sx={{ width: '100%', padding: 3 }}>
          <Stack
            sx={{
              width: '100%',
              maxWidth: '1200px',
              height: 'auto',
              margin: '0px auto'
            }}
          ></Stack>
          <StyledContainer>
            <Box
              sx={{
                width: '100%',
                maxWidth: '1200px',
                height: 'auto',
                margin: '0px auto',
                padding: '0px 24px',
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <Button
                sx={{
                  color: palette.grey['600'],
                  border: `1px solid ${palette.grey['500']}`,
                  borderRadius: '2px',
                  '&:hover': { backgroundColor: '#ffffff' },
                  height: '35px',
                  marginRight: '15px'
                }}
                onClick={handleDetailBtn}
              >
                검색 상세
              </Button>
              <Box sx={{ width: '30%' }}>
                <Searchbar
                  placeholder={'차량명 · 차량 번호 · 사용자 검색'}
                  value={searchInput}
                  handleInputChange={handleInput}
                  handleSearchBtnClick={handleSearchBtn}
                  inputHeight={'35px !important'}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                maxWidth: '1200px',
                margin: '15px 0px'
              }}
            >
              <Collapse sx={{ width: '100%' }} in={openSearchDetail}>
                {searchDetailForm}
              </Collapse>
            </Box>
            <CarInfo
              rows={carInfo}
              setTabData={setTabData}
              filter={filter}
              searchValue={searchValue}
              searchType={searchType}
              setCarListInfo={setCarInfo}
            />
          </StyledContainer>
        </Box>
      </Box>
    </>
  );
};

export default CarManagePage;

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  height: 'auto',
  marginTop: '20px',
  padding: '20px',
  borderRadius: 10
}));
