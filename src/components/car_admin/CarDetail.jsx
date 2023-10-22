import {
  Button,
  Grid,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { Box, Container } from '@mui/system';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CarDetail = ({ carCode }) => {
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
    car_address: '',
    car_latitude: 0,
    car_longitude: 0,
    car_status: '',
    updated_at: new Date()
  });
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태

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

  return (
    <Container>
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
