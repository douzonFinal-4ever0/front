import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import RectangleIcon from '@mui/icons-material/Rectangle';
import styled from '@emotion/styled';
import Label from '../common/Label';
import { palette } from '../../theme/palette';
import UserSearchBar from './UserSearchBar';
import RectangleBtn from '../common/RectangleBtn';
import CarDeleteModal from './CarDeleteModal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HdrAutoOutlinedIcon from '@mui/icons-material/HdrAutoOutlined';
import axiosInstance from '../../utils/axios';
import PersonIcon from '@mui/icons-material/Person';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import { useDispatch } from 'react-redux';

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

const CarDetail = ({ carCode, carListInfo, setCarListInfo }) => {
  const dispatch = useDispatch();

  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  // 수정 모달 관련 변수 및 함수
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // 삭제 모달 관련 변수 및 함수
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const carDeleteBtn = () => {
    console.log(carCode);
    axiosInstance.axiosInstance
      .put('/manager/car/carDelete', carCode)
      .then((res) => {
        console.log(res.data);
        handleSetSnackbarContent('삭제가 완료되었습니다.');
        handleOpenSnackbar();
      });
  };

  const [carInfo, setCarInfo] = useState({
    carVO: {
      authority: '',
      buy_at: new Date(),
      car_code: carCode,
      car_name: '',
      created_at: new Date(),
      fuel_type: '',
      memo: '',
      type: ''
    },
    carUser: {
      mem_code: '',
      dept_code: '',
      position_name: '',
      name: '',
      dept_name: ''
    },
    accum_mileage: 0,
    fuel_effciency: 0,
    car_address: '',
    car_latitude: 0,
    car_longitude: 0,
    car_status: '',
    updated_at: new Date()
  });

  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태

  // trasfer List 관련 함수
  const [isShowSelectUser, setIsShowSelectUser] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

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
      setCarModifyInfo({
        ...carModifyInfo,
        carUser: {
          ...carModifyInfo.carUser,
          mem_code: rightChecked[0].mem_code
        }
      });
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

  // left = items
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

  const [carModifyInfo, setCarModifyInfo] = useState({
    car_code: carCode,
    car_name: '',
    memo: '',
    authority: '',
    carDetail: {
      fuel_effciency: 0,
      accum_mileage: 0
    },
    carUser: { mem_code: left[0] ? left[0].mem_code : null }
  });

  const handleCarAuthority = (e) => {
    setIsShowSelectUser(e.target.value === '모두' ? false : true);

    if (e.target.value === '모두') {
      setLeft([]);
      setRight(right.concat(left));
      setCarModifyInfo({
        ...carModifyInfo,
        authority: e.target.value
      });
    } else {
      setCarModifyInfo({
        ...carModifyInfo,
        authority: e.target.value,
        carUser: { ...carModifyInfo.carUser, mem_code: '' }
      });
    }
  };

  useEffect(() => {
    console.log(carCode);
    axiosInstance.axiosInstance
      .get(`/manager/car/carGetOne`, {
        params: {
          car_code: carCode
        }
      })
      .then((res) => {
        console.log(res.data);
        setCarInfo(res.data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  // 모달 관련

  // 차량 상세 수정
  const handleModifyBtn = () => {
    // 모달창 오픈
    axiosInstance.axiosInstance
      .get('/manager/memList')
      .then((res) => {
        carInfo.carUser !== null
          ? setRight(
              res.data.filter(
                (item) => item.mem_code !== carInfo.carUser.mem_code
              )
            )
          : setRight(res.data);
      })
      .catch((error) => {
        // 에러 발생 시 코드 실행
        console.log(error);
      });

    setIsShowSelectUser(carInfo.carVO.authority === '모두' ? false : true);

    // 차량 정보 모달창에 바로 반영
    setCarModifyInfo({
      ...setCarModifyInfo,
      car_code: carInfo.carVO.car_code,
      car_name: carInfo.carVO.car_name,
      memo: carInfo.carVO.memo !== null ? carInfo.carVO.memo : '',
      authority: carInfo.carVO.authority,
      carDetail: {
        ...carModifyInfo.carDetail,
        fuel_effciency: carInfo.fuel_effciency,
        accum_mileage: carInfo.accum_mileage
      },
      carUser: {
        ...carModifyInfo.carUser,
        mem_code: carInfo.carUser !== null ? carInfo.carUser.mem_code : ''
      }
    });

    if (carInfo.carVO.authority === '지정') {
      setLeft([
        {
          mem_code: carInfo.carUser.mem_code,
          name: carInfo.carUser.name,
          position_name: carInfo.carUser.position_name,
          deptVO: { dept_name: carInfo.carUser.dept_name }
        }
      ]);
    }

    handleOpen();
  };

  // 수정 버튼 클릭
  const clickModifyBtn = () => {
    console.log(carModifyInfo);
    // 수정 axios 처리
    axiosInstance.axiosInstance
      .put('/manager/car/carModify', carModifyInfo)
      .then(() => {
        axiosInstance.axiosInstance
          .get(`/manager/car/carGetOne`, {
            params: {
              car_code: carModifyInfo.car_code
            }
          })
          .then((res) => {
            console.log(res.data);
            // 상세 페이지에 적용
            setCarInfo(res.data);

            // 리스트에 적용

            const updatedItem = [...carListInfo];
            const modifyCar = carListInfo.find(
              (item) => item.car_code === carModifyInfo.car_code
            );
            if (modifyCar) {
              modifyCar.accum_mileage = res.data.accum_mileage;
              modifyCar.memo = res.data.carVO.memo;
              modifyCar.authority = res.data.carVO.authority;
              modifyCar.car_status = res.data.car_status;
              modifyCar.max_capacity = res.data.carVO.max_capacity;
              if (modifyCar.authority !== '모두') {
                modifyCar.dept_name = res.data.carUser.dept_name;
                modifyCar.mem_code = res.data.carUser.mem_code;
                modifyCar.name = res.data.carUser.name;
                modifyCar.position_name = res.data.carUser.position_name;
              }
              setCarListInfo(updatedItem);
            }

            handleSetSnackbarContent('수정이 완료되었습니다.');
            handleOpenSnackbar();
            handleClose();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 750 }}>
          <Box sx={{ pt: 2, px: 4, pb: 3, bgcolor: 'background.paper' }}>
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
                차량 수정
              </Typography>
            </Box>
            {/* input Form */}
            <Grid container spacing={1} margin="5px 0px" padding="0px 6px">
              <Grid item container spacing={2}>
                <StyledLabelGrid item xs={2}>
                  <Label htmlFor={'carName'} text={'차량명'} />
                </StyledLabelGrid>
                <Grid item xs={10}>
                  <TextField
                    id="carName"
                    variant="outlined"
                    value={carModifyInfo.car_name}
                    onChange={(e) => {
                      setCarModifyInfo({
                        ...carModifyInfo,
                        car_name: e.target.value
                      });
                    }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item container spacing={2}>
                <StyledLabelGrid item xs={2}>
                  <Label htmlFor={'fuel_effciency'} text={'연비'} />
                </StyledLabelGrid>
                <Grid item xs={10}>
                  <TextField
                    id="fuel_effciency"
                    variant="outlined"
                    value={carModifyInfo.carDetail.fuel_effciency}
                    onChange={(e) => {
                      setCarModifyInfo({
                        ...carModifyInfo,
                        carDetail: {
                          ...carModifyInfo.carDetail,
                          fuel_effciency: e.target.value
                        }
                      });
                    }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item container spacing={2}>
                <StyledLabelGrid item xs={2}>
                  <Label htmlFor={'accum_mileage'} text={'누적 주행 거리'} />
                </StyledLabelGrid>
                <Grid item xs={10}>
                  <TextField
                    id="accum_mileage"
                    variant="outlined"
                    value={carModifyInfo.carDetail.accum_mileage}
                    onChange={(e) => {
                      setCarModifyInfo({
                        ...carModifyInfo,
                        carDetail: {
                          ...carModifyInfo.carDetail,
                          accum_mileage: e.target.value
                        }
                      });
                    }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item container spacing={2}>
                <StyledLabelGrid item xs={2}>
                  <Label htmlFor={'memo'} text={'메모'} />
                </StyledLabelGrid>
                <Grid item xs={10}>
                  <TextField
                    id="memo"
                    variant="outlined"
                    value={carModifyInfo.memo}
                    onChange={(e) => {
                      setCarModifyInfo({
                        ...carModifyInfo,
                        memo: e.target.value
                      });
                    }}
                    multiline
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item container spacing={2}>
                <StyledLabelGrid item xs={2}>
                  <Label htmlFor={'authority'} text={'권한'} />
                </StyledLabelGrid>
                <Grid item xs={10}>
                  <RadioGroup
                    row
                    name="row-radio-buttons-group"
                    value={carModifyInfo.authority}
                    onChange={handleCarAuthority}
                  >
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
                  </RadioGroup>
                </Grid>
              </Grid>

              {isShowSelectUser === true ? (
                <Grid item container spacing={2}>
                  <Grid item xs={2}></Grid>
                  <Grid item container xs={10} spacing={1}>
                    <Grid item xs={5}>
                      {customList(
                        filterMemData,
                        <CardHeader
                          sx={{ px: 2, py: 1 }}
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
                    <Grid item xs={2} display="flex" alignItems="center">
                      <Grid container direction="column" alignItems="center">
                        <Button
                          xs={6}
                          sx={{ my: 0.5 }}
                          variant="outlined"
                          size="small"
                          onClick={handleCheckedRight}
                          disabled={leftChecked.length === 0}
                          aria-label="move selected right"
                        >
                          &lt;
                        </Button>
                        <Button
                          sx={{ my: 0.5 }}
                          variant="outlined"
                          size="small"
                          onClick={handleCheckedLeft}
                          disabled={
                            rightChecked.length === 0 || left.length >= 1
                          }
                          aria-label="move selected left"
                        >
                          &gt;
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={5}>
                      {customList(
                        left,
                        <CardHeader
                          sx={{ px: 2, py: 1 }}
                          titleTypographyProps={{ variant: 'subtitle1' }}
                          title={
                            <Box display="flex">
                              <PersonIcon
                                height="35px"
                                width="35px"
                                color="#637381"
                              />
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
                </Grid>
              ) : null}
            </Grid>
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
              onClick={handleClose}
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
              onClick={clickModifyBtn}
            >
              수정
            </Button>
          </Grid>
        </Box>
      </Modal>

      <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
        <CarDeleteModal
          style={style}
          handleDeleteModalClose={handleDeleteModalClose}
          handleDeleteBtn={carDeleteBtn}
          title={'차량 삭제'}
        >
          정말로 선택한 차량을 삭제하시겠습니까?
          <br />
          삭제된 차량은 삭제된 차량에서 조회할 수 있습니다.
        </CarDeleteModal>
      </Modal>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mt: '2%'
        }}
      >
        <Typography variant="h6">기본 정보</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          width="140px"
          height="36px"
        >
          <RectangleBtn
            text={'수정'}
            category={'modify'}
            sx={{ width: '64px' }}
            handlebtn={handleModifyBtn}
          />
          <RectangleBtn
            text={'삭제'}
            category={'delete'}
            sx={{ width: '64px' }}
            handlebtn={handleDeleteModalOpen}
          />
        </Box>
      </Box>
      <Grid
        container
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          mt: '2%',
          '& .infoTitle': {
            backgroundColor: '#eeeeee'
          },
          '& .MuiListItem-gutters': {
            borderBottom: '1px solid #bdbdbd'
          }
        }}
      >
        <Grid
          item
          sx={{ display: 'flex', borderTop: '1px solid #bdbdbd' }}
          xs={6}
        >
          <ListItem className="infoTitle">
            <ListItemText primary="차량명" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.carVO.car_name} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="차량 번호" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.carVO.car_code} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="유종" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.carVO.fuel_type} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="연비" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.fuel_effciency} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="종류" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.carVO.type} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="누적 주행거리" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.accum_mileage + ' km'} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="구입일자" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={new Date(carInfo.carVO.created_at).toLocaleString()}
            />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="등록일자" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={new Date(carInfo.carVO.buy_at).toLocaleString()}
            />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="차량 사용 권한" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                carInfo.carVO.authority === '지정' ? (
                  <Chip
                    color="primary"
                    icon={<CheckCircleOutlineIcon />}
                    label={carInfo.carVO.authority}
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    color="primary"
                    icon={<HdrAutoOutlinedIcon />}
                    label={carInfo.carVO.authority}
                    variant="outlined"
                  />
                )
              }
            />
            {carInfo.carVO.authority === '지정' && (
              <Box>
                <ListItemText
                  primary={`${carInfo.carUser.name} ${carInfo.carUser.position_name}`}
                />
                <Typography variant="caption">{`${carInfo.carUser.dept_name}부서`}</Typography>
              </Box>
            )}
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="최근 수정일자" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                carInfo.updated_at &&
                new Date(carInfo.updated_at).toLocaleString()
              }
            />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="수용 인원" />
          </ListItem>
          <ListItem>
            <ListItemText primary={`${carInfo.carVO.max_capacity}명`} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="상태" />
          </ListItem>
          <ListItem>
            {carInfo.car_status === '사용가능' ? (
              <Chip
                label={`${carInfo.car_status}`}
                variant="outlined"
                sx={{ color: '#388e3c', borderColor: '#388e3c' }}
              />
            ) : (
              <Chip
                label={`${carInfo.car_status}`}
                color="success"
                variant="outlined"
                sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
              />
            )}
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={12}>
          <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
            <ListItemText primary="메모" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.carVO.memo} />
          </ListItem>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetail;

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
