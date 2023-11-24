import styled from '@emotion/styled';
import { Box, Container } from '@mui/system';
import { PAGE_INNER_PADDING } from '../../config';
import SubHeader from '../../components/common/SubHeader';
import Calendar from '../../components/common/Calendar';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { palette } from '../../theme/palette';
import {
  Button,
  Collapse,
  Divider,
  FormControl,
  Grid,
  ListItem,
  ListItemIcon,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography
} from '@mui/material';
import format from 'date-fns/format';
import CarRezListModal from '../../components/car_admin/rez/CarRezListModal';
import { useDispatch } from 'react-redux';
import Drawer from '../../components/common/Drawer';
import { openDrawer, closeDrawer } from '../../redux/reducer/DrawerSlice';
import CarRezDetail from '../../components/car_admin/rez/CarRezDetail';
import ReorderIcon from '@mui/icons-material/Reorder';
import EventIcon from '@mui/icons-material/Event';
import CarRezList from '../../components/car_admin/rez/CarRezList';
import Searchbar from '../../components/common/Searchbar';
import { endOfMonth, startOfMonth } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import RectangleBtn from '../../components/common/RectangleBtn';
import CommonTitle from '../../components/car_admin/CommonTitle';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Circle } from '@mui/icons-material';
import RezPageStatusChart from '../../components/car_admin/chart/RezPageStatusChart';

const setTitle = (data) => {
  // data 객체의 status 값에 따라 title을 설정
  if (data === '1') {
    return '미처리';
  } else if (data === '2') {
    return '취소';
  } else if (data === '3') {
    return '운행 대기';
  } else if (data === '4') {
    return '운행중';
  } else {
    return '운행 완료';
  }
};

const setColor = (data) => {
  // data 객체의 status 값에 따라 color를 설정
  if (data === '1') {
    return '#B5C7E3';
  } else if (data === '2') {
    return '#e87676';
  } else if (data === '3') {
    return '#ffc107';
  } else if (data === '4') {
    return '#4695db';
  } else {
    return '#9cb287';
  }
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

// 사이드바 컴포넌트
const SubSidebarContent = ({ rezData, isList, listData }) => {
  // rezData에서 필요한 값을 추출하여 계산
  const calculateSeries = (data) => {
    const counts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    // rezData에서 특정 값을 추출하여 counts에 누적
    data.forEach((item) => {
      const status = item.rez_status; // 예약 상태에 맞게 변경 필요
      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    });

    // counts의 값을 series에 맞게 변환
    const series = Object.values(counts);
    console.log(series);
    return series;
  };

  const labels = ['미처리', '취소', '운행 대기', '운행 중', '운행 완료'];
  const [series, setSeries] = useState([]);
  useEffect(() => {
    isList
      ? setSeries(calculateSeries(listData))
      : setSeries(calculateSeries(rezData));
  }, [rezData, listData]);

  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}>
      <Box padding={'2px 10px'}>
        <CommonTitle title={'예약 현황'} />
      </Box>
      <Box marginTop="10px">
        <RezPageStatusChart series={series} labels={labels} />
        <List sx={{ width: '50%', margin: 'auto', padding: '0px' }}>
          {labels.map((item, index) => (
            <ListItem
              disablePadding
              sx={{
                '& .MuiListItemIcon-root': { minWidth: '40px' },
                '& .MuiListItemText-root': { display: 'flex' }
              }}
            >
              <ListItemIcon>
                <Circle
                  sx={{
                    width: '12px !important',
                    color: `${setColor(`${index + 1}`)}`
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item}
                secondary={`${series[index]}건`}
                secondaryTypographyProps={{ marginLeft: '10px' }}
                primaryTypographyProps={{
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

// 실제 차량 예약 리스트 페이지
const CarRezPage = () => {
  // 예약 정보
  const [rezData, setRezData] = useState([]);
  const [events, setEvents] = useState([]);

  // 모달
  const [modalOpen, setModalOpen] = useState(false);

  // 리스트 객체
  const [listData, setListData] = useState([]);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  //리스트 or 캘린더
  const [isList, setIsList] = useState(false);

  const listAxios = (inputSearchFilter) => {
    axiosInstance.axiosInstance
      .post('/manager/car/rezListGetAll', inputSearchFilter)
      .then((res) => {
        console.log(res.data);
        // const newRezData = res.data.map((data) => {
        //   return {
        //     ...data,
        //     start_at: format(new Date(data.start_at), 'yyyy-MM-dd HH:mm:ss')
        //   };
        // });
        setListData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleListBtn = () => {
    setIsList((prev) => !prev);
    listAxios(searchFilter);
  };

  // 검색
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchBtn = (e) => {
    e.preventDefault();
    // alert('검색 : ' + searchInput);

    const pattern = /^[0-9]{2,3}[\s]*[가-힣]{1}[\s]*[0-9]*$/i;
    if (pattern.test(searchInput)) {
      setSearchType(0);
      setSearchValue(searchInput);
    } else {
      setSearchType(1);
      setSearchValue(searchInput);
    }
    setSearchInput('');
  };

  const dateNow = new Date();
  const today = endOfMonth(dateNow).toISOString().slice(0, 10);

  const dateBefore = startOfMonth(dateNow, 1);
  const before = dateBefore.toISOString().slice(0, 10);

  const [searchFilter, setSearchFilter] = useState({
    rez_status: 0,
    rez_start_at: null,
    rez_end_at: null,
    oper_start_at: before,
    oper_end_at: today,
    dept_name: '전체'
  });
  const [openSearchDetail, setOpenSearchDetail] = useState(false);

  const handleDetailBtn = () => {
    setOpenSearchDetail((prev) => !prev);
  };

  const handleFilterBtn = () => {
    console.log(searchFilter);
    listAxios(searchFilter);
  };

  const handleReturnBtn = () => {
    const newSearchFilter = {
      rez_status: 0,
      rez_start_at: null,
      rez_end_at: null,
      oper_start_at: before,
      oper_end_at: today,
      dept_name: '전체'
    };
    setSearchValue('');

    setSearchFilter(newSearchFilter);

    listAxios(newSearchFilter);
  };

  // 검색창 내용
  const searchDetailForm = (
    <Paper sx={{ width: '100%', padding: '10px 25px', overflow: 'hidden' }}>
      <Grid container marginBottom="25px">
        <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2">예약 기간</Typography>
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
                    value={dayjs(searchFilter.oper_start_at)}
                    onChange={(newValue) => {
                      console.log(searchFilter.oper_start_at);
                      setSearchFilter({
                        ...searchFilter,
                        oper_start_at: newValue.format('YYYY-MM-DD')
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
                    value={dayjs(searchFilter.oper_end_at)}
                    onChange={(newValue) => {
                      console.log(searchFilter.oper_end_at);
                      setSearchFilter({
                        ...searchFilter,
                        oper_end_at: newValue.format('YYYY-MM-DD')
                      });
                    }}
                  />
                </DemoItem>
              </Box>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2">등록 일자</Typography>
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
                      searchFilter.rez_start_at
                        ? dayjs(searchFilter.rez_start_at)
                        : null
                    }
                    onChange={(newValue) => {
                      console.log(searchFilter.rez_start_at);
                      setSearchFilter({
                        ...searchFilter,
                        rez_start_at: newValue.format('YYYY-MM-DD')
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
                    value={
                      searchFilter.rez_end_at
                        ? dayjs(searchFilter.rez_end_at)
                        : null
                    }
                    onChange={(newValue) => {
                      console.log(searchFilter.rez_end_at);
                      setSearchFilter({
                        ...searchFilter,
                        rez_end_at: newValue.format('YYYY-MM-DD')
                      });
                    }}
                  />
                </DemoItem>
              </Box>
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2">상태</Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Box sx={{ minWidth: 120, width: '270px' }}>
            <FormControl
              sx={{
                '& .MuiInputBase-root': { width: '270px', height: '40px' }
              }}
            >
              <Select
                id="demo-simple-select"
                value={searchFilter.rez_status}
                displayEmpty
                onChange={(e) => {
                  setSearchFilter({
                    ...searchFilter,
                    rez_status: e.target.value
                  });
                }}
              >
                <MenuItem value={0}>전체</MenuItem>
                <MenuItem value={3}>운행대기</MenuItem>
                <MenuItem value={4}>운행중</MenuItem>
                <MenuItem value={1}>미처리</MenuItem>
                <MenuItem value={5}>운행완료</MenuItem>
                <MenuItem value={2}>취소</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2">부서</Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Box sx={{ minWidth: 120, width: '270px' }}>
            <FormControl
              fullWidth
              sx={{
                '& .MuiInputBase-root': { width: '270px', height: '40px' }
              }}
            >
              <Select
                id="demo-simple-select"
                value={searchFilter.dept_name}
                displayEmpty
                onChange={(e) => {
                  setSearchFilter({
                    ...searchFilter,
                    dept_name: e.target.value
                  });
                }}
              >
                <MenuItem value="전체">전체</MenuItem>
                <MenuItem value={'개발1팀'}>개발1팀</MenuItem>
                <MenuItem value={'개발2팀'}>개발2팀</MenuItem>
                <MenuItem value={'관리1팀'}>관리1팀</MenuItem>
                <MenuItem value={'개발3팀'}>개발3팀</MenuItem>
                <MenuItem value={'디자인1팀'}>디자인1팀</MenuItem>
                <MenuItem value={'기획1팀'}>기획1팀</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item flexGrow={1} display="flex" justifyContent="end"></Grid>
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

  // useEffect(() => {
  //   axiosInstance.axiosInstance
  //     .get('/manager/car/rezListGetAll')
  //     .then((res) => {
  //       console.log(res.data);
  //       const newRezData = res.data.map((data) => {
  //         return {
  //           ...data,
  //           start_at: format(new Date(data.start_at), 'yyyy-MM-dd HH:mm:ss')
  //         };
  //       });

  //       setRezData(newRezData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    // start_at과 count를 키로 가지는 객체를 저장할 배열 초기화

    const startAtCounts = [];

    // rezData 배열을 순회
    rezData.forEach((data) => {
      // 현재 data의 start_at 값을 가져오기
      const currentStartAt = data.start_at.substr(0, 10);
      const currentStatus = data.rez_status;

      // start_at을 키로 가지는 객체가 이미 배열에 있는지 확인
      const existingObjectIndex = startAtCounts.findIndex(
        (obj) => obj.start_at === currentStartAt && obj.status === currentStatus
      );

      if (existingObjectIndex !== -1) {
        // 이미 해당 start_at을 키로 가지는 객체가 배열에 있을 경우, count 증가
        startAtCounts[existingObjectIndex].count += 1;
      } else {
        // 해당 start_at을 키로 가지는 객체가 배열에 없을 경우, 새로운 객체 추가
        startAtCounts.push({
          start_at: currentStartAt,
          count: 1,
          status: currentStatus
        });
      }
    });

    const newData = startAtCounts.map((data) => {
      return {
        start: data.start_at,
        title: `${setTitle(data.status)} - ${data.count}`,
        color: setColor(data.status)
      };
    });

    setEvents(newData);
  }, [rezData]);

  const handleEventClick = (e) => {
    setListData(
      rezData.filter(
        (data) =>
          data.start_at.substr(0, 10) === format(e.event.start, 'yyyy-MM-dd')
      )
    );
    handleModalOpen();
  };

  const handleDateSet = (arg) => {
    console.log(arg);
    axiosInstance.axiosInstance
      .post('/manager/car/rezListGetAll', {
        rez_status: 0,
        dept_name: '전체',
        rez_start_at: null,
        rez_end_at: null,
        oper_start_at: arg.start,
        oper_end_at: arg.end
      })
      .then((res) => {
        console.log(res.data);
        const newRezData = res.data.map((data) => {
          return {
            ...data,
            start_at: format(new Date(data.start_at), 'yyyy-MM-dd HH:mm:ss')
          };
        });

        setRezData(newRezData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [tabData, setTabData] = useState([]);
  const dispatch = useDispatch();

  const handleClickRow = (car_rez_code) => {
    setTabData([
      {
        title: '예약 정보',
        content: (
          <CarRezDetail
            car_rez_code={car_rez_code}
            rezData={rezData}
            setRezData={setRezData}
          />
        )
      }
    ]);
    dispatch(openDrawer());
  };

  return (
    <Box sx={{ overflow: 'auto' }}>
      <SubHeader title={'차량 예약 조회'} />
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Modal open={modalOpen} onClose={handleModalClose}>
          <CarRezListModal
            listData={listData}
            style={style}
            handleClickRow={handleClickRow}
          />
        </Modal>
        <Drawer width={900} tabData={tabData} sx={{ zIndex: 1300 }} />
        <Grid xs={9.5}>
          <StyledMain>
            <Box
              sx={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
            >
              <StyledContainer>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  padding="10px 24px"
                >
                  <Button
                    variant="outlined"
                    startIcon={isList ? <EventIcon /> : <ReorderIcon />}
                    onClick={handleListBtn}
                  >
                    {isList ? '캘린더' : '리스트'}
                  </Button>
                  {isList && (
                    <Box sx={{ display: 'flex' }}>
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
                      <Box flexGrow={1}>
                        <Searchbar
                          placeholder={'차량명 · 차량 번호 · 사용자 검색'}
                          value={searchInput}
                          handleInputChange={handleInput}
                          handleSearchBtnClick={handleSearchBtn}
                          inputHeight={'35px !important'}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
                {isList && (
                  <Collapse
                    sx={{ width: '100%', padding: '0px 24px 10px 24px' }}
                    in={openSearchDetail}
                  >
                    {searchDetailForm}
                  </Collapse>
                )}

                <Divider />
                {isList ? (
                  <CarRezList
                    carRezData={listData}
                    handleClickRow={handleClickRow}
                    searchType={searchType}
                    searchValue={searchValue}
                  />
                ) : (
                  <Calendar
                    events={events}
                    handleEventClick={(e) => {
                      handleEventClick(e);
                    }}
                    handleDateSet={handleDateSet}
                  />
                )}
              </StyledContainer>
            </Box>
          </StyledMain>
        </Grid>
        <Grid xs={2.5}>
          <StyledSidebar>
            <SubSidebarContent
              rezData={rezData}
              isList={isList}
              listData={listData}
            />
          </StyledSidebar>
        </Grid>
        {/* <SubSidebar content={<SubSidebarContent />} widthP={15} /> */}
      </Grid>
    </Box>
  );
};

export default CarRezPage;

const StyledMain = styled(Box)(({ theme }) => ({
  padding: PAGE_INNER_PADDING,
  width: '100%',
  height: '100%',
  maxWidth: '1400px'
}));

const StyledSidebar = styled(Box)(({ theme }) => ({
  paddingTop: 20,
  paddingBottom: 20,
  paddingRight: 20,
  width: '100%',
  height: '100%',
  maxWidth: '500px'
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  padding: '20px',
  borderRadius: 10
}));
