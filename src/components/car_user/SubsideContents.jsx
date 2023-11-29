import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NoRow from './NoRow';

//통신
// const socket = io.connect('http://localhost:4000');

// 서브 사이드바 콘텐츠
const SubSideContents = ({
  setSelectedRows,
  selectedRows,
  rezStart_at,
  rezReturn_at,
  carSelect,
  setOpen,
  socket,
  open
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  //const [carCode, setCarCode] = useState('');
  const [rows, setRows] = useState([]);
  //통신
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const currentName = currentUser.name;
  const mem_code = currentUser.mem_code;
  const [userNum, setUserNum] = useState(0);
  const [selected, setSelected] = useState(null);
  const [openGroup, setOpenGroup] = useState('');
  const getJwtToken = () => {
    return localStorage.getItem('jwtToken');
  };

  useEffect(() => {
    //통신 연결
    const Token = getJwtToken();
    // console.log(rezStart_at + '');
    // console.log(typeof rezStart_at);
    // console.log(Token);
    socket.emit('user', currentName);
    socket.on('users', (currentUsers) => {
      // console.log(currentUsers);
    });
    socket.emit('init', {
      mem_code,
      rezStart_at,
      rezReturn_at,
      Token
    });
    socket.on('cars', (filterCars) => {
      console.log(filterCars);
      setRows(filterCars);
    });
    socket.on('currentCnt', (cnt) => {
      setUserNum(cnt);
    });
    socket.on('Upcars', (cars) => {
      setRows(cars);
    });
    socket.on('selected', (jsonObject) => {
      console.log(jsonObject);
      const jsonObject2 = JSON.parse(jsonObject);
      const myMap = new Map(Object.entries(jsonObject2));
      if (myMap.get(currentName)) {
        setSelected(myMap.get(currentName));
      }
    });
    console.log(rows);
  }, []);

  //modal 닫는 함수
  const handleCloseModal = (reason) => {
    if (reason === 'buttonClick') {
      // 특정 버튼을 클릭한 경우의 처리
      console.log('사용자가 버튼을 클릭하여 모달이 닫힘');
    }
    setSelected(null);
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
  // const handleInput = (e) => {
  //   setSearchInput(e.target.value);
  // };
  const groupedCarData = [
    {
      groupName: '지정 차량',
      items: rows.filter(
        (item) => item.mem_code !== null && item['mem_code'].includes(mem_code)
      )
    },
    {
      groupName: '승용차',
      items: rows.filter(
        (item) =>
          item['type'].includes('승용차') && item['authority'].includes('모두')
      )
    },
    {
      groupName: '화물차',
      items: rows.filter(
        (item) =>
          item['type'].includes('화물차') && item['authority'].includes('모두')
      )
    }
  ];

  const handleItem = (e, car_code, car_address, car_name) => {
    //setCarCode(car_code);

    console.log(e.target);
    setSelectedRows({ car_code, car_address, car_name });
    //선택된 차량 비활성화
    socket.emit('selected', { car_code, currentName });

    //다른 차량 선택시 선택됨 해제 필요
  };

  useEffect(() => {
    // openGroup 상태가 변경될 때 실행되는 효과
    // 다른 그룹은 모두 닫히도록 상태를 업데이트
    const newOpenGroup = groupedCarData.find(
      (group) => group.groupName === openGroup
    );
    if (!newOpenGroup) {
      // openGroup이 유효하지 않은 경우, 모든 그룹을 닫습니다.
      setOpenGroup('');
    }
  }, [openGroup, groupedCarData]);
  useEffect(() => {
    if (open === false) {
      if (selectedRows === null) {
        console.log(selectedRows);
        setSelected(null);
        setRows([]);
        socket.emit('disconnect_with_info', currentName);
      }
    }
  }, [open]);
  const toggleGroup = (groupName) => {
    if (openGroup === groupName) {
      setOpenGroup(''); // 이미 열려 있는 그룹을 클릭하면 닫습니다.
    } else {
      setOpenGroup(groupName); // 클릭한 그룹을 엽니다.
    }
  };
  const CarList = ({ rows }) => {
    if (rows.length === 0) {
      return <NoRow />;
    } else {
      return (
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <List dense component="div" role="list">
            {groupedCarData.map((group, index) => {
              const isGroupOpen = openGroup === group.groupName;
              return (
                <div key={index}>
                  <div onClick={() => toggleGroup(group.groupName)}>
                    <ListSubheader>
                      {group.groupName}

                      {openGroup !== group.groupName ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ExpandLessIcon />
                      )}
                    </ListSubheader>
                  </div>
                  <Collapse in={isGroupOpen}>
                    {group.items.map((car, index) => (
                      // <Grid
                      //   container
                      //   // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      //   sx={{
                      //     mt: '2%',
                      //     '& .infoTitle': {
                      //       backgroundColor: '#eeeeee'
                      //     },
                      //     '& .MuiListItem-gutters': {
                      //       borderBottom: '1px solid #bdbdbd'
                      //     }
                      //   }}
                      // >

                      <ListItem
                        key={index}
                        onClick={(e) =>
                          handleItem(
                            e,
                            car.car_code,
                            car.car_address,
                            car.car_name
                          )
                        }
                      >
                        <ListItemButton
                          disabled={
                            car.car_status === '선택된 차량' ||
                            car.car_status === '내가 선택한 차량'
                          }
                        >
                          <Grid
                            item
                            sx={{
                              display: 'flex'
                              // border: '1px solid #bdbdbd'
                            }}
                            xs={12}
                          >
                            <Grid
                              item
                              sx={{
                                display: 'flex'
                                // borderRight: '1px solid #bdbdbd'
                              }}
                              xs={6}
                            >
                              <ListItemText
                                primary={`${car.car_code}`}
                                secondary={`${car.car_name}`}
                              />
                            </Grid>
                            <Grid item sx={{ display: 'flex', ml: 1 }} xs={6}>
                              <ListItemText
                                primary={`${car.car_address}`}
                                secondary={
                                  selected === car.car_code
                                    ? '내가 선택한 차량'
                                    : `${car.car_status}`
                                }
                              />
                            </Grid>
                          </Grid>
                        </ListItemButton>
                      </ListItem>
                      // </Grid>
                    ))}
                  </Collapse>
                </div>
              );
            })}
          </List>
          {/* {groupedCarData.map((group, index) => {
            console.log(group.groupName);
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{group.groupName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense component="div" role="list">
                    {group.items.map((car, index) => (
                      <ListItem
                        key={index}
                        onClick={(e) => {
                          handleItem(
                            e,
                            car.car_code,
                            car.car_address,
                            car.car_name
                          );
                        }}
                      >
                        <ListItemButton disabled={car.car_status === '선택됨'}>
                          <ListItemText
                            primary={`${car.car_code}`}
                            secondary={`${car.car_name}`}
                          />
                          <ListItemText
                            primary={`${car.car_address}`}
                            secondary={`${car.car_status}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })} */}
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
      {/* <LoadingModal open={isLoading} /> */}
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
      {/* <Searchbar
        width={'100%'}
        placeholder={'차종을 입력하세요'}
        value={searchInput}
        handleInputChange={handleInput}
        handleSearchBtn={handleSearchBtn}
      /> */}

      <Divider />
      <Paper className="MuiPaper-rounded2" width={'100%'}>
        <CarList rows={groupedCarData} />
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
          onClick={(e) => {
            carSelect(e);
          }}
        >
          선택
        </Button>
      </Grid>
    </Box>
  );
};

export default SubSideContents;
