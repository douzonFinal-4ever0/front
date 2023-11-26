import CommonTable from '../../components/car_admin/CarInfoTable';
import DataGrid from '../../components/common/DataGrid';
import DoneIcon from '@mui/icons-material/Done';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import SubHeader from '../../components/common/SubHeader';
import SubSidebar from '../../components/common/SubSidebar';
import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
  Typography
} from '@mui/material';
import MainContainer from '../../components/mr_user/MainContainer';
import { Container } from '@mui/system';
import { PAGE_INNER_PADDING, BORDER_RADIUS } from '../../config';
import styled from '@emotion/styled';
import WrapContainer from '../../components/mr_user/WrapContainer';
import Searchbar from '../../components/common/Searchbar';
import NoRow from '../../components/car_user/NoRow';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '../../components/common/Drawer';
import { openDrawer, closeDrawer } from '../../redux/reducer/DrawerSlice';
import CarRezDetail from '../../components/car_user/CarRezDetail';
import Selectbox from '../../components/common/Selectbox';
import RectangleBtn from '../../components/common/RectangleBtn';
import { palette } from '../../theme/palette';
import CarOperation from '../../components/car_user/CarOperation';
import axiosInstance from '../../utils/axios';
import { useQuery } from 'react-query';
import CreateChip from '../../components/car_user/CreateChip';
import DateSelect from '../../components/car_user/DateSelect';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/car_user/LoadingModal';
import {
  openSanckbar,
  setSnackbarContent,
  setSnackbarStatus
} from '../../redux/reducer/SnackbarSlice';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [carRez, setCarRez] = useState([]);
  const [range, setRange] = useState('0');
  const [dateInfo, setDateInfo] = useState('0');
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState({
    startDate: 0,
    endDate: 0
  });
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState(0);
  // const [flag, setFlag] = useState(false);
  function dateFormat(date) {
    const preDate = new Date(date);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return preDate.toLocaleString('ko-KR', options);
  }
  const currentUser = useSelector((state) => state.user);
  const mem_code = currentUser.mem_code;
  console.log(currentUser);

  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };
  const handleSetSnackbarStatus = (status) => {
    dispatch(setSnackbarStatus(status));
  };
  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };
  // const handleDateInfo =() =>{
  //   set
  // }
  const { rezData, error } = useQuery(
    ['rezList', mem_code, range, dateRange, dateFilter],
    () => {
      let startAt = 0;
      let endAt = 0;
      //상세설정 보기가 아닐경우 초기화
      if (dateRange !== 4) {
        startAt = 0;
        endAt = 0;
      }
      if (dateFilter.startDate !== 0 && dateFilter.endDate !== 0) {
        startAt = dateFilter.startDate;
        endAt = dateFilter.endDate;
        setDateRange(4);
      }
      setIsLoading(true);
      axiosInstance.axiosInstance
        .get(
          `http://localhost:8081/car_rez/rezList/${mem_code}/${range}/${dateRange}/${startAt}/${endAt}/${dateInfo}`
        )
        .then((res) => {
          console.log(res.data);
          console.log(range);
          console.log(dateRange);
          const data = res.data;
          if (data) {
            const rezData = data.map((item) => ({
              ...item,
              id: item.car_rez_code,
              start_at: dateFormat(item.start_at),
              return_at: dateFormat(item.return_at),
              during: {
                start_at: dateFormat(item.start_at),
                return_at: dateFormat(item.return_at)
              }
            }));
            console.log(rezData);
            setCarRez(rezData);
            setIsLoading(false);
            return rezData;
          } else {
            console.log(data);
          }
          if ((res.data = null)) {
            //error snackbar

            handleSetSnackbarStatus('error');
            handleSetSnackbarContent('에러 발생.');
            handleOpenSnackbar();
          }
        });
    },
    {
      staleTime: 1000
    }
  );
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // useEffect(() => {
  //   axiosInstance.axiosInstance
  //     .get(`http://localhost:8081/car_rez/rezList/${mem_code}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       const rezData = res.data.map((item) => ({
  //         ...item,
  //         id: item.car_rez_code,
  //         start_at: dateFormat(item.start_at),
  //         return_at: dateFormat(item.return_at),
  //         during: dateFormat(item.start_at) + '\n' + dateFormat(item.return_at)
  //       }));
  //       console.log(rezData);
  //       setCarRez(rezData);
  //     });
  // }, []);
  // useEffect(() => {
  //   axiosInstance.axiosInstance
  //     .get(`http://localhost:8081/car_rez/rezList/${mem_code}/${range}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       const rezData = res.data.map((item) => ({
  //         ...item,
  //         id: item.car_rez_code,
  //         start_at: dateFormat(item.start_at),
  //         return_at: dateFormat(item.return_at),
  //         // during: dateFormat(item.start_at) + '\n' + dateFormat(item.return_at)
  //         during: {
  //           start_at: dateFormat(item.start_at),
  //           return_at: dateFormat(item.return_at)
  //         }
  //       }));
  //       console.log(rezData);
  //       setCarRez(rezData);
  //     });
  // }, [range]);

  // const createChip = (params) => {
  //   if (params.row.rez_status === '1') {
  //     return <Chip label="미처리" color="primary" variant="outlined" />;
  //   }
  //   if (params.row.rez_status === '2') {
  //     return <Chip label="확정" color="success" variant="outlined" />;
  //   }
  //   if (params.row.rez_status === '3') {
  //     return <Chip label="완료" variant="outlined" />;
  //   }
  //   if (params.row.rez_status === '4') {
  //     return <Chip label="취소" color="error" variant="outlined" />;
  //   }
  // };

  // const colums =[
  //   {
  //     field:"id", row값과 맵핑
  //     headerName:"", header에 나올 이름
  //     width:100, colums의 너비
  //     editable:true/false, 수정 가능 여부
  //     type:number, 타입 숫자일때만 (선택)
  //     description:"설명", colum에 마우스를 가져다 댔을때 나오는 설명
  //     valueGetter:(params)=> value값 커스텀
  //       `${params.row.mem_name} / ${params.row.dept_name}`,
  //     renderCell : 셀의 모양 변경
  //   },
  // ];
  // 서브 사이드바 콘텐츠
  const SubSideContents = () => {
    // const [searchInput, setSearchInput] = useState('');

    // const [rows, setRows] = useState([]);
    // useEffect(() => {
    //   axiosInstance.axiosInstance
    //     .get(`http://localhost:8081/car_rez/searchCarList`)
    //     .then((res) => {
    //       setRows(res.data);
    //     });
    // }, []);
    // const handleInput = (e) => {
    //   setSearchInput(e.target.value);
    // };
    // const filterCarData = rows.filter((item) =>
    //   item['car_name'].includes(searchInput)
    // );
    // 검색 클릭 이벤트
    // const handleSearchBtn = (e) => {
    //   e.preventDefault();
    // };
    return (
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          px: 2,
          '& .MuiPaper-rounded2': {
            mt: 1,
            backgroundColor: '#f5f5f5',
            height: '64.5vh'
          }
        }}
      >
        <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
          {/* <Button variant="contained" sx={{ width: '100%' }}>
            차량 예약
          </Button> */}
          <RectangleBtn
            type={'button'}
            text={'차량 예약'}
            sx={{ padding: '14px 12px', backgroundColor: palette.grey['500'] }}
            handlebtn={() => {
              navigate('../reservation');
            }}
          />
        </Grid>
        <Divider />
        {/* <Searchbar
          width={'100%'}
          placeholder={'차종을 입력하세요'}
          value={searchInput}
          handleInput={handleInput}
          handleSearchBtn={handleSearchBtn}
        /> */}
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          displayEmpty
          value={dateInfo}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(e) => {
            setDateInfo(e.target.value);
          }}
          sx={{ width: '100%', mt: 1 }}
        >
          {/* <MenuItem value={'0'}>
            <em>전체</em>
          </MenuItem> */}
          <MenuItem value={'0'}>
            <em>대여일</em>
          </MenuItem>
          <MenuItem value={'1'}>반납일</MenuItem>
          <MenuItem value={'2'}>예약일</MenuItem>
        </Select>
        <Paper className="MuiPaper-rounded2" width={'100%'}>
          <DateSelect
            setDateRange={setDateRange}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </Paper>
      </Box>
    );
  };
  const [carCode, setCarCode] = useState('');
  const handleItem = (e, car_code) => {
    setCarCode(car_code);
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
                <ListItem onClick={(e) => handleItem(e, car.car_code)}>
                  <ListItemText
                    primary={`${car.car_code}`}
                    secondary={`${car.car_name}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      );
    }
  };
  const colums = [
    {
      field: 'rez_status',
      headerName: '상태',
      width: 100,
      description: '예약 상태',
      editable: false,
      renderCell: (params) => <CreateChip params={params.row.rez_status} />
    },
    {
      field: 'during2',
      headerName: '일자',
      width: 250,
      description: '예약 기간',
      editable: false,
      renderCell: (params) => {
        // <div style={{ whiteSpace: 'pre-line' }}>{params.value}</div>
        return (
          <Box width="100%">
            {/* {params.map((item) => {
              return ( */}
            <Box sx={{ backgroundColor: '#f5f5f5' }} padding="0px 4px">
              <Box display="flex" justifyContent="center" paddingTop="2px">
                <Typography variant="subtitle2" marginRight="15px">
                  대여일
                </Typography>
                {/* <Tooltip title={params.row.start_at} placement="top-start"> */}
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '300px' // 원하는 최대 너비 설정
                  }}
                >
                  {params.row.start_at}
                </Typography>
                {/* </Tooltip> */}
              </Box>
              <Divider sx={{ backgroundColor: '#616161' }} />
            </Box>
            <Box sx={{ backgroundColor: '#f5f5f5' }} padding="0px 4px">
              <Box display="flex" justifyContent="center" paddingTop="2px">
                <Typography variant="subtitle2" marginRight="15px">
                  반납일
                </Typography>
                {/* <Tooltip title={params.row.return_at} placement="top-start"> */}
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '300px' // 원하는 최대 너비 설정
                  }}
                >
                  {params.row.return_at}
                </Typography>
                {/* </Tooltip> */}
              </Box>
              <Divider sx={{ backgroundColor: '#616161' }} />
            </Box>
            {/* );
             })} */}
          </Box>
        );
      }
    },
    {
      field: 'mem/dept',
      headerName: '이름/부서',
      width: 110,
      description: '예약자 이름, 부서',
      editable: false,
      // valueGetter: (params) => `${params.row.name} / ${params.row.dept_name}`
      renderCell: (params) => (
        <Box width="100%">
          <Typography variant="subtitle1">{params.row.name}</Typography>
          <Typography variant="body2">{`${params.row.dept_name}`}</Typography>
        </Box>
      )
    },
    {
      field: 'car_name/code',
      headerName: '차종/차번호',
      width: 250,
      description: '예약 차량 이름, 번호',
      editable: false,
      // valueGetter: (params) =>
      //   `${params.row.car_name} / ${params.row.car_code} ${params.row.type}`
      renderCell: (params) => (
        <Box display="flex" width="100%" alignItems="center">
          <Chip
            label={params.row.type}
            size="small"
            sx={{ backgroundColor: '#90caf9', marginRight: '10px' }}
          />
          <Box>
            <Typography variant="subtitle1">{params.row.car_code}</Typography>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '240px' // 원하는 최대 너비 설정
              }}
            >
              {params.row.car_name}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'detail',
      headerName: '목적',
      width: 160,
      description: '사량 사용 목적',
      editable: false,
      renderCell: (params) => (
        <Tooltip title={params.row.detail} placement="top-start">
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100px' // 원하는 최대 너비 설정
            }}
          >
            {params.row.detail}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: 'action',
      headerName: '비고',
      width: 100,
      description: '운행 완료 처리',
      renderCell: (params) => {
        const Data = params.row;
        const handleClick = (e) => {
          e.stopPropagation();
          setSelectedRezCode(Data.id);
          console.log(Data.rez_status);
          handleOpen();
        };
        if (
          Data.rez_status === '4' ||
          Data.rez_status === '1' ||
          Data.rez_status === '3'
        ) {
          return (
            <Button
              onClick={(e) => {
                handleClick(e);
              }}
            >
              운행완료
            </Button>
          );
        } else if (Data.rez_status === '5') {
          return (
            <Box display="flex" width="100%" alignItems="center">
              <DoneIcon color="primary" />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '240px' // 원하는 최대 너비 설정
                  }}
                >
                  처리 완료
                </Typography>
              </Box>
            </Box>
          );
        }

        // return (
        //   <>
        //     {Data.rez_status === '4' || Data.rez_status === '1' ? (
        //       <Button
        //         onClick={(e) => {
        //           handleClick(e);
        //         }}
        //       >
        //         운행완료
        //       </Button>
        //     ) : Data.rez_status === '5' ? (
        //       <Box display="flex" width="100%" alignItems="center">
        //         <DoneIcon color="primary" />
        //         <Box>
        //           <Typography
        //             variant="body2"
        //             sx={{
        //               whiteSpace: 'nowrap',
        //               overflow: 'hidden',
        //               textOverflow: 'ellipsis',
        //               maxWidth: '240px' // 원하는 최대 너비 설정
        //             }}
        //           >
        //             처리 완료
        //           </Typography>
        //         </Box>
        //       </Box>
        //     ) : (
        //       ''
        //     )}
        //   </>
        // );
      }
    }
  ];

  // var filterRezData = carRez.filter((item) => {
  //   return (
  //     item['rez_status'].includes(range) && item['car_code'].includes(carCode)
  //   );
  // });
  const handleRange = (e) => {
    setRange(e.target.value);
    // axiosInstance.axiosInstance.get(`http://localhost:8081/car_rez/rezList/${mem_code}`);
  };
  //오프캔버스 관련
  // const dispatch = useDispatch();
  const [selectedRezCode, setSelectedRezCode] = useState(null);
  const [flag, setFlag] = useState(false);
  /**오프캔버스 열기 */
  const handleOpenDrawer = () => {
    dispatch(openDrawer());
    setFlag(!flag);
  };
  /**오프캔버스 닫기 */
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
    setFlag(!flag);
  };
  //더블클릭 이벧느
  const handleDbClick = (param) => {
    const Data = param.row;
    setSelectedRezCode(Data.id);
    console.log(Data.id);
    handleOpenDrawer();
  };

  const tabData = [
    {
      title: '예약 상세',
      content: (
        <CarRezDetail
          rezCode={selectedRezCode}
          handleCloseDrawer={handleCloseDrawer}
          setFlag={setFlag}
        />
      )
    }
  ];

  return (
    <>
      {carRez !== null && (
        <div>
          <SubHeader title={'차량 예약 조회'} />
          <CarOperation
            rezCode={selectedRezCode}
            open={open}
            handleClose={handleClose}
          />
          <LoadingModal open={isLoading} />
          <Box sx={{ display: 'flex', height: '95%' }}>
            <SubSidebar widthP={30} content={<SubSideContents />} />
            <MainContainer>
              <WrapContainer bgcolor={'#fff'}>
                {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}> */}
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  displayEmpty
                  value={range}
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={handleRange}
                  sx={{ minWidth: 120, mb: 1 }}
                >
                  <MenuItem value={'0'}>
                    <em>전체</em>
                  </MenuItem>
                  <MenuItem value={'1'}>미처리</MenuItem>
                  <MenuItem value={'4'}>운행중</MenuItem>
                  <MenuItem value={'2'}>취소</MenuItem>
                  <MenuItem value={'5'}>완료</MenuItem>
                  <MenuItem value={'3'}>확정</MenuItem>
                </Select>
                <Box padding="0px 4px">
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    paddingTop="2px"
                  >
                    <Typography variant="subtitle2" marginRight="15px">
                      기간 :
                    </Typography>
                    {/* <Tooltip title={params.row.start_at} placement="top-start"> */}
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '300px' // 원하는 최대 너비 설정
                      }}
                    >
                      {dateRange === 0
                        ? '전체'
                        : dateRange == 1
                        ? '오늘'
                        : dateRange == 2
                        ? '일주일 전까지'
                        : dateRange == 3
                        ? '한달 전까지'
                        : dateRange == 4
                        ? `${dateFilter.startDate} - ${dateFilter.endDate}`
                        : ''}
                    </Typography>
                    {/* </Tooltip> */}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#f0f0f0'
                    }
                  }}
                >
                  <DataGrid
                    rows={carRez}
                    columns={colums}
                    width="100%"
                    height={'auto'}
                    pageSize={10}
                    pageSizeOptions={[10, 15]}
                    checkbox={false}
                    disableRow={false}
                    clickEvent={handleDbClick}
                    // dbclickEvent={handleDbClick}
                  />
                </Box>
              </WrapContainer>
            </MainContainer>
          </Box>
          {flag && <Drawer width={'100vh'} tabData={tabData} />}
        </div>
      )}
    </>
  );
};

export default Dashboard;

const StyledBox = styled(Box)(({ theme, bgcolor, height }) => ({
  padding: PAGE_INNER_PADDING,
  borderRadius: BORDER_RADIUS,
  marginTop: '1%',
  alignContent: 'center',
  height: height,
  backgroundColor: bgcolor,
  [theme.breakpoints.up('md')]: {
    minWidth: '100%'
  }
}));

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
