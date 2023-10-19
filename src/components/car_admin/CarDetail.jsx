import {
  Button,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { Box, Container, styled, width } from '@mui/system';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CarDetail = ({ carCode }) => {
  const [carInfo, setCarInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/admin/car/carGetOne`, {
        params: {
          car_code: carCode
        }
      })
      .then((res) => {
        console.log(res.data);
        setCarInfo(res);
      });
  }, []);

  return (
    <Container>
      {/* <Box
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
            <ListItemText primary={carInfo['carVO']['car_name']} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="차량 번호" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo['carVO']['car_code']} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="유종" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo['carVO']['fuel_type']} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="연비" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo['fuel_effciency']} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="누적 주행거리" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo['accum_mileage']} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="구입일자" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo['carVO']['created_at']} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={6}>
          <ListItem className="infoTitle">
            <ListItemText primary="등록일자" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo['carVO']['buy_at']} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={12}>
          <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
            <ListItemText primary="차량 사용 권한" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo['carVO']['authority']} />
          </ListItem>
        </Grid>
        <Grid item sx={{ display: 'flex' }} xs={12}>
          <ListItem className="infoTitle" sx={{ width: '32.5%' }}>
            <ListItemText primary="메모" />
          </ListItem>
          <ListItem>
            <ListItemText primary={carInfo['carVO']['memo']} />
          </ListItem>
        </Grid>
      </Grid> */}
    </Container>
  );
};

export default CarDetail;
