import { Box, Grid, InputLabel, TextField, Stack, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { boxSizing, margin, padding } from '@mui/system';
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
import CarAlert from '../../components/car_user/CarAlert';
import axios from 'axios';

const Register = () => {
  const [addressObj, setAddressObj] = useState({
    areaAddress: '',
    townAddress: ''
  });
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [carDetail, setCarDetail] = useState({
    id: '',
    car_name: '',
    accum_mileage: 0,
    authority: '',
    fuel_type: '',
    fuel_effciency: 0,
    car_address: ''
  });

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = (reason) => {
    if (reason === 'buttonClick') {
      // 특정 버튼을 클릭한 경우의 처리
      console.log('사용자가 버튼을 클릭하여 모달이 닫힘');
    }
    setOpen(false);
  };
  const carSelect = () => {
    console.log(selectedRows);
    if (selectedRows.length !== 0) {
      setOpen(false);
    } else {
      alert('차량을 선택해주세요');
    }
  };
  useEffect(() => {
    axios.get('http://localhost:3001/carDetail').then((res) => {
      console.log(res.data);
      setCarDetail(res.data);
    });
  }, [selectedRows]);
  return (
    <Box>
      {/* <script type='text/javascript' src=''></script> */}
      <SubHeader title={'차량 예약'} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <Stack>
              <NewFormControl>
                <TextField label="이름" variant="outlined" type="text" />
              </NewFormControl>
              <NewFormControl>
                <TextField label="부서" variant="outlined" type="text" />
              </NewFormControl>
              <NewFormControl>
                <TextField label="직급" variant="outlined" type="text" />
              </NewFormControl>
              <NewFormControl>
                <TextField label="목적" variant="outlined" type="text" />
              </NewFormControl>
              <Grid>
                <NewFormControl>
                  <TimeField withMonth={true} label={'대여 날짜'}></TimeField>
                </NewFormControl>
                ~
                <NewFormControl>
                  <TimeField withMonth={true} label={'반납 날짜'}></TimeField>
                </NewFormControl>
              </Grid>
              <NewFormControl>
                <InputLabel htmlFor="dest">목적지</InputLabel>
                <Input
                  id="dest"
                  type="text"
                  value={addressObj.areaAddress + addressObj.townAddress}
                  readOnly
                />
                <DaumPost setAddressObj={setAddressObj} />
              </NewFormControl>
              <NewFormControl>
                <Button onClick={handleOpenModal}>차량 찾기</Button>
                <Modal
                  open={open}
                  handleModal={(e, reason) => handleCloseModal(reason)}
                  modalTitle={'차량 찾기'}
                  content={<CarList setSelectedRows={setSelectedRows} />}
                  buttons={<Button onClick={carSelect}>선택</Button>}
                />
              </NewFormControl>
              <NewFormControl>
                <InputLabel htmlFor="dest">예상 주행거리</InputLabel>
                <Input id="est_mileage" type="number" readOnly />
              </NewFormControl>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography
              variant="h7"
              component="div"
              sx={{ flexGrow: 1, color: '#000' }}
            >
              차량 정보
            </Typography>
            <NewFormControl>
              <InputLabel htmlFor="car_name">차종</InputLabel>
              <Input
                id="car_name"
                type="text"
                value={carDetail.car_name}
                readOnly
              />
            </NewFormControl>
            <NewFormControl>
              <InputLabel htmlFor="car_code">차량 번호</InputLabel>
              <Input id="car_code" type="text" value={carDetail.id} readOnly />
            </NewFormControl>
            <NewFormControl>
              <InputLabel htmlFor="accum_mileage">누적 주행 거리</InputLabel>
              <Input
                id="accum_mileage"
                type="text"
                value={carDetail.accum_mileage}
                readOnly
              />
            </NewFormControl>
            <NewFormControl>
              <InputLabel htmlFor="authority">권한</InputLabel>
              <Input
                id="authority"
                type="text"
                value={carDetail.authority}
                readOnly
              />
            </NewFormControl>
            <NewFormControl>
              <InputLabel htmlFor="fuel_type">유종</InputLabel>
              <Input
                id="fuel_type"
                type="text"
                value={carDetail.fuel_type}
                readOnly
              />
            </NewFormControl>
            <NewFormControl>
              <InputLabel htmlFor="fuel_effciency">연비</InputLabel>
              <Input
                id="fuel_effciency"
                type="text"
                value={carDetail.fuel_effciency}
                readOnly
              />
            </NewFormControl>

            <NewFormControl>
              <InputLabel htmlFor="pickup">인수지</InputLabel>
              <Input
                id="pickup"
                type="text"
                value={carDetail.car_address}
                readOnly
              />
            </NewFormControl>
            <NewFormControl sx={{ minWidth: 240 }}>
              <InputLabel id="demo-simple-select-label">반납지</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="반납지"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </NewFormControl>
          </Item>
        </Grid>
      </Grid>
      <BottomBox>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: '10px' }}
        >
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </BottomBox>
    </Box>
  );
};
export default Register;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 750
}));

const BottomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 10
}));

const NewFormControl = styled(FormControl)(({ theme }) => ({
  textAlign: 'left',
  margin: 10
}));
