import {
  Button,
  Card,
  CardHeader,
  Checkbox,
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
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import RectangleIcon from '@mui/icons-material/Rectangle';
import styled from '@emotion/styled';
import Label from '../common/Label';
import { palette } from '../../theme/palette';
import { typography } from '../../theme/typography';
import UserSearchBar from './UserSearchBar';

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

const CarDetail = ({ carCode }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  // axios로 사용자 정보 불러오기
  useEffect(() => {
    axios
      .get('http://localhost:8081/admin/memList')
      .then((res) => {
        setRight(res.data);
      })
      .catch((error) => {
        // 에러 발생 시 코드 실행
        console.log(error);
      });
  }, []);

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

  const handleCarAuthority = (e) => {
    // setRegisterData({ ...registerData, authority: e.target.value });
    setIsShowSelectUser(e.target.value === '모두' ? false : true);
  };

  // transferList 관련 함수, 변수들 끝

  const [carModifyInfo, setCarModifyInfo] = useState({
    car_name: '',
    memo: '',
    carDetail: {
      fuel_effciency: 0,
      accum_mileage: 0
    },
    carUser: { mem_code: left[0] ? left[0] : null, car_code: '' }
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/admin/car/carGetOne`, {
        params: {
          car_code: carCode
        }
      })
      .then((res) => {
        const data = res.data;
        setCarInfo({
          ...setCarInfo,
          carVO: {
            ...carInfo.carVO,
            car_name: data.carVO.car_name,
            type: data.carVO.type,
            fuel_type: data.carVO.fuel_type,
            authority: data.carVO.authority,
            buy_at: new Date(data.carVO.buy_at),
            memo: data.carVO.memo,
            created_at: new Date(data.carVO.created_at)
          },
          fuel_effciency: data.fuel_effciency,
          accum_mileage: data.accum_mileage,
          car_status: data.car_status,
          updated_at: new Date(data.updated_at),
          car_latitude: data.car_latitude,
          car_longitude: data.car_longitude,
          car_address: data.car_address
        });

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
    setCarModifyInfo({
      ...setCarModifyInfo,
      car_name: carInfo.carVO.car_name,
      memo: carInfo.carVO.memo,
      authority: carInfo.carVO.authority,
      carDetail: {
        fuel_effciency: carInfo.fuel_effciency,
        accum_mileage: carInfo.accum_mileage
      },
      carUser: {}
    });
    handleOpen();
  };

  return (
    <Container>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 750 }}>
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
                차량 수정
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
                <StyledLabelGrid item xs={2}>
                  <Label htmlFor={'carName'} text={'차량명'} />
                </StyledLabelGrid>
                <Grid item xs={10}>
                  <TextField
                    id="carName"
                    variant="outlined"
                    value={carModifyInfo.car_name}
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
                    // defaultValue="모두"
                    value={carModifyInfo.authority}
                    onChange={(e) => {
                      handleCarAuthority(e);
                    }}
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
                        left,
                        <CardHeader
                          sx={{ px: 2, py: 1 }}
                          titleTypographyProps={{ variant: 'subtitle1' }}
                          title="지정 사용자"
                        />
                      )}
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container direction="column" alignItems="center">
                        <Button
                          item
                          xs={6}
                          sx={{ my: 0.5 }}
                          variant="outlined"
                          size="small"
                          onClick={handleCheckedRight}
                          disabled={leftChecked.length === 0}
                          aria-label="move selected right"
                        >
                          &gt;
                        </Button>
                        <Button
                          sx={{ my: 0.5 }}
                          variant="outlined"
                          size="small"
                          onClick={handleCheckedLeft}
                          disabled={rightChecked.length === 0}
                          aria-label="move selected left"
                        >
                          &lt;
                        </Button>
                      </Grid>
                    </Grid>
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
              수정
            </Button>
          </Grid>
        </Box>
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
        <Button
          sx={{
            backgroundColor: '#607d8b',
            ':hover': { backgroundColor: '#455a64' }
          }}
          variant="contained"
          startIcon={<AutoFixNormalIcon />}
          onClick={handleModifyBtn}
        >
          수정
        </Button>
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
            <ListItemText primary={carInfo.accum_mileage} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="구입일자" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.carVO.created_at.toString()} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="등록일자" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.carVO.buy_at.toString()} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={12}>
          <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
            <ListItemText primary="차량 사용 권한" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo.carVO.authority} />
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
