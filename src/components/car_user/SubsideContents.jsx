import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Searchbar from '../common/Searchbar';
import NoRow from './NoRow';
import RectangleBtn from '../common/RectangleBtn';
import { palette } from '../../theme/palette';
import RectangleIcon from '@mui/icons-material/Rectangle';
import axiosInstance from '../../utils/axios';
import { useQuery } from 'react-query';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

//통신
const socket = io.connect('http://localhost:4000');

// 서브 사이드바 콘텐츠
const SubSideContents = ({
  setSelectedRows,
  rezStart_at,
  rezReturn_at,
  carSelect,
  setOpen
}) => {
  const [searchInput, setSearchInput] = useState('');
  //const [carCode, setCarCode] = useState('');
  const [rows, setRows] = useState([]);
  //통신
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const currentName = currentUser.name;
  const [userNum, setUserNum] = useState(0);
  const [selected, setSelected] = useState();
  const getJwtToken = () => {
    return localStorage.getItem('jwtToken');
  };
  useEffect(() => {
    //통신 연결
    const Token = getJwtToken();
    console.log(rezStart_at + '');
    console.log(typeof rezStart_at);
    console.log(Token);
    socket.emit('user', currentName);
    socket.on('users', (currentUsers) => {
      console.log(currentUsers);
    });
    socket.emit('init', {
      rows,
      currentName,
      rezStart_at,
      rezReturn_at,
      Token,
      setRows
    });
    socket.on('cars', (cars) => {
      console.log(cars);
      setRows(
        cars.map((car) => ({
          id: car.car_code,
          car_name: car.car_name,
          car_address: car.car_address,
          car_status: car.car_status
        }))
      );
    });
    socket.on('currentCnt', (cnt) => {
      console.log(cnt);
      setUserNum(cnt);
    });
    socket.on('Upcars', (cars) => {
      console.log('up');
      console.log(cars);
      setRows(
        cars.map((car) => ({
          id: car.car_code,
          car_name: car.car_name,
          car_address: car.car_address,
          car_status: car.car_status
        }))
      );
    });
    socket.on('selected', (mapAsJSON) => {
      // console.log(mapAsJSON);
      const mapData = new Map(JSON.parse(mapAsJSON));
      // console.log(mapData);
      // const valuesArray = Array.from(mapData.values());
      // const updateRows = rows.map((car) => {
      //   if (valuesArray.includes(car.car_code)) {
      //     return { ...car, car_status: '선택됨' };
      //   }
      //   return car;
      // });
      // setRows(updateRows);
      //선택된 차
      if (mapData.get(currentName)) {
        setSelected(mapData.get(currentName));
      }
      // setSelectedUser(selectedUser);
    });
  }, []);
  // useEffect(() => {
  //   console.log(currentName);

  //   socket.on('users', (currentUsers) => {
  //     console.log('클라이언트:' + currentUsers);
  //   });
  // }, []);
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit('message', { name, message });
    setState({ message: '', name });
  };
  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}:<span>{message}</span>
        </h3>
      </div>
    ));
  };
  //modal 닫는 함수
  const handleCloseModal = (reason) => {
    if (reason === 'buttonClick') {
      // 특정 버튼을 클릭한 경우의 처리
      console.log('사용자가 버튼을 클릭하여 모달이 닫힘');
    }
    socket.emit('disconnect_with_info', currentName);
    setOpen(false);
  };
  // const { cars, error } = useQuery(
  //   ['availableCars', rezStart_at, rezReturn_at],
  //   () => {
  //     axiosInstance.axiosInstance
  //       .get(
  //         `http://localhost:8081/car_rez/availableCars/${rezStart_at}/${rezReturn_at}`
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         setRows(
  //           res.data.map((car) => ({
  //             id: car.car_code,
  //             car_name: car.car_name,
  //             car_address: car.car_address,
  //             car_status: car.car_status
  //           }))
  //         );
  //       });
  //   },
  //   {
  //     staleTime: 1000
  //   }
  // );
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
  const handleItem = (e, car_code, car_address, car_name) => {
    //setCarCode(car_code);
    setSelectedRows({ car_code, car_address, car_name });
    //선택된 차량 비활성화
    socket.emit('selected', { car_code, currentName });

    //다른 차량 선택시 선택됨 해제 필요
  };
  // hover
  const [isHovered, setIsHovered] = useState(null);
  const handleHover = (index) => {
    setIsHovered(index);
  };
  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  const CarList = ({ rows }) => {
    if (rows.length == 0) {
      return <NoRow />;
    } else {
      return (
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <List dense component="div" role="list">
            {rows.map((car, index) => {
              return (
                <ListItem
                  key={car.id}
                  // onMouseEnter={() => handleHover(index)}
                  // onMouseLeave={handleMouseLeave}
                  // sx={{ background: isHovered === index && '#FFFFFF' }}
                  // {isHovered&&}
                  onClick={(e) =>
                    handleItem(e, car.id, car.car_address, car.car_name)
                  }
                >
                  <ListItemButton disabled={car.car_status === '선택됨'}>
                    <ListItemText
                      primary={`${car.id}`}
                      secondary={`${car.car_name}`}
                    />
                    <ListItemText
                      primary={`${car.car_address}`}
                      secondary={`${car.car_status}`}
                    />
                  </ListItemButton>
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
        // px: 2,
        // pt: 0,
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

      <Divider />
      {/* <Box
        display="flex"
        // marginTop="15px"
        sx={{
          width: '100%',
          borderBottom: '3px solid black',
          padding: '5px 0px',
          mb: 1
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
          차량 검색
        </Typography>
      </Box> */}
      <Typography variant="body">동시 접속자 : {userNum}명</Typography>
      <br />
      <Typography variant="body">
        선택한 차량 : {selected ? selected : '없음'}
      </Typography>
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
    </Box>
  );
};

export default SubSideContents;
