import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Searchbar from '../common/Searchbar';
import NoRow from './NoRow';
import RectangleBtn from '../common/RectangleBtn';
import { palette } from '../../theme/palette';

// 서브 사이드바 콘텐츠
const SubSideContents = ({ setSelectedRows }) => {
  const [searchInput, setSearchInput] = useState('');
  //const [carCode, setCarCode] = useState('');
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/car_rez/availableCars').then((res) => {
      setRows(
        res.data.map((car) => ({
          id: car.carVO.car_code,
          car_name: car.carVO.car_name,
          car_address: car.car_address
        }))
      );
    });
  }, []);
  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const filterCarData = rows.filter((item) =>
    item['car_name'].includes(searchInput)
  );
  // 검색 클릭 이벤트
  const handleSearchBtn = (e) => {
    e.preventDefault();
  };
  const handleItem = (e, car_code, car_address) => {
    //setCarCode(car_code);
    setSelectedRows({ car_code, car_address });
  };

  const CarList = ({ rows }) => {
    if (rows.length == 0) {
      return <NoRow />;
    } else {
      return (
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <List dense component="div" role="list">
            {rows.map((car) => {
              return (
                <ListItem
                  onClick={(e) => handleItem(e, car.id, car.car_address)}
                >
                  <ListItemText
                    primary={`${car.id}`}
                    secondary={`${car.car_name}`}
                  />
                  <ListItemText primary={`${car.car_address}`} />
                </ListItem>
              );
            })}
          </List>
        </div>
      );
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        px: 2,
        '& .MuiPaper-rounded2': {
          mt: 1,
          backgroundColor: '#f5f5f5',
          height: '60vh'
        }
      }}
    >
      {/* <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
        <Button variant="contained" sx={{ width: '100%' }}>
          차량 예약
        </Button>
        <RectangleBtn
          type={'button'}
          text={'차량 예약'}
          sx={{ padding: '14px 12px', backgroundColor: palette.grey['500'] }}
        />
      </Grid> */}

      <Searchbar
        width={'100%'}
        placeholder={'차종을 입력하세요'}
        value={searchInput}
        handleInputChange={handleInput}
        handleSearchBtn={handleSearchBtn}
      />
      <Divider />
      <Paper className="MuiPaper-rounded2" width={'100%'}>
        <CarList rows={filterCarData} />
      </Paper>
    </Box>
  );
};

export default SubSideContents;
