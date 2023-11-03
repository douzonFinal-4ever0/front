import { Box, Container } from '@mui/system';
import SubHeader from '../../components/common/SubHeader';
import Searchbar from '../../components/common/Searchbar';
import { useEffect, useState } from 'react';
import CarOperationTable from '../../components/car_admin/operation/CarOperationTable';
import styled from '@emotion/styled';
import axiosInstance from '../../utils/axios';
import { PAGE_INNER_PADDING } from '../../config';
import {
  Button,
  Collapse,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { palette } from '../../theme/palette';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import RectangleBtn from '../../components/common/RectangleBtn';
import dayjs, { Dayjs } from 'dayjs';
import { subDays } from 'date-fns';

const CarOperationPage = () => {
  const [searchInput, setSearchInput] = useState('');

  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);

  const dateBefore = subDays(new Date(), 7);
  const before = dateBefore.toISOString().slice(0, 10); // Day.js 객체로 변경

  const [searchFilter, setSearchFilter] = useState({
    operation_sdate: before,
    operation_edate: today,
    car_type: '전체',
    dept_name: '전체',
    sdistance: 0,
    edistance: 1000
  });
  const [searchValue, setSearchValue] = useState('');

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchBtn = (e) => {
    e.preventDefault();
    // alert('검색 : ' + searchInput);
    // 여기서 필터링 해줄 상태를 체크!
    setSearchValue(searchInput);
  };

  const [operationData, setOperationData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post('/manager/car/operationList', searchFilter)
      .then((res) => {
        console.log(res.data);
        const newData = res.data.map((item, index) => {
          return {
            operation_code: item.operation_code,
            start_at: new Date(item.start_at).toLocaleDateString(),
            car_info: {
              car_code: item.car_code,
              car_name: item.car_name,
              type: item.type
            },
            mem_info: {
              dept_name: item.dept_name,
              position_name: item.position_name,
              name: item.name
            },
            purpose: [
              { reason: '일반업무', distance: item.nomal_biz_mileage },
              { reason: '출 • 퇴근', distance: item.commute_mileage }
            ],
            loc: item.carLocList.map((data) => {
              return {
                loc_type: data.loc_type,
                address: data.address
              };
            }),
            memo: item.memo
          };
        });
        setOperationData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleFilterBtn = () => {
    console.log(searchFilter);
    axiosInstance
      .post('/manager/car/operationList', searchFilter)
      .then((res) => {
        console.log(res.data);
        const newData = res.data.map((item, index) => {
          return {
            operation_code: item.operation_code,
            start_at: new Date(item.start_at).toLocaleDateString(),
            car_info: {
              car_code: item.car_code,
              car_name: item.car_name,
              type: item.type
            },
            mem_info: {
              dept_name: item.dept_name,
              position_name: item.position_name,
              name: item.name
            },
            purpose: [
              { reason: '일반업무', distance: item.nomal_biz_mileage },
              { reason: '출 • 퇴근', distance: item.commute_mileage }
            ],
            loc: item.carLocList.map((data) => {
              return {
                loc_type: data.loc_type,
                address: data.address
              };
            }),
            memo: item.memo
          };
        });
        setOperationData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReturnBtn = () => {
    setSearchFilter({
      operation_sdate: before,
      operation_edate: today,
      car_type: '전체',
      dept_name: '전체',
      sdistance: 0,
      edistance: 1000
    });
  };

  const searchDetailForm = (
    <Paper sx={{ width: '100%', padding: '10px 25px', overflow: 'hidden' }}>
      <Grid container marginBottom="25px">
        <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2">운행 목록 기간</Typography>
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
                    value={dayjs(searchFilter.operation_sdate)}
                    onChange={(newValue) => {
                      console.log(searchFilter.operation_sdate);
                      setSearchFilter({
                        ...searchFilter,
                        operation_sdate: newValue.format('YYYY-MM-DD')
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
                    value={dayjs(searchFilter.operation_edate)}
                    onChange={(newValue) => {
                      console.log(searchFilter.operation_edate);
                      setSearchFilter({
                        ...searchFilter,
                        operation_edate: newValue.format('YYYY-MM-DD')
                      });
                    }}
                  />
                </DemoItem>
              </Box>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid
          item
          xs={1.5}
          sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
        >
          <Typography variant="subtitle2">차량 종류</Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ minWidth: 120, width: '270px' }}>
            <FormControl
              sx={{
                '& .MuiInputBase-root': { width: '270px', height: '40px' }
              }}
            >
              <Select
                id="demo-simple-select"
                value={searchFilter.car_type}
                displayEmpty
                onChange={(e) => {
                  setSearchFilter({
                    ...searchFilter,
                    car_type: e.target.value
                  });
                }}
              >
                <MenuItem value="전체">전체</MenuItem>
                <MenuItem value="승용차">승용차</MenuItem>
                <MenuItem value="화물차">화물차</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
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
        <Grid
          item
          xs={1.5}
          sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
        >
          <Typography sx={{ whiteSpace: 'pre-line' }} variant="subtitle2">
            {'업무용 운행 거리'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              minWidth: 120,
              display: 'flex',
              '& .MuiFormControl-root': { width: '120px', height: '40px' }
            }}
          >
            <TextField
              type="number"
              InputProps={{
                inputProps: { min: 0 },
                endAdornment: <InputAdornment position="end">㎞</InputAdornment>
              }}
              sx={{
                '& .MuiInputBase-root': { width: '120px', height: '40px' }
              }}
              value={searchFilter.sdistance}
              onChange={(e) => {
                setSearchFilter({ ...searchFilter, sdistance: e.target.value });
              }}
            ></TextField>
            <Typography variant="h6" margin="0px 10px">
              -
            </Typography>
            <TextField
              type="number"
              InputProps={{
                inputProps: { min: 0 },
                endAdornment: <InputAdornment position="end">㎞</InputAdornment>
              }}
              sx={{
                '& .MuiInputBase-root': { width: '120px', height: '40px' }
              }}
              value={searchFilter.edistance}
              onChange={(e) => {
                setSearchFilter({ ...searchFilter, edistance: e.target.value });
              }}
            ></TextField>
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

  // 상세 검색 관련 함수
  const [openSearchDetail, setOpenSearchDetail] = useState(false);

  const handleDetailBtn = () => {
    setOpenSearchDetail((prev) => !prev);
  };

  return (
    <>
      <SubHeader title={'운행 내역'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledMain>
          <Box sx={{ width: '100%', padding: 3, backgroundColor: '#ffffff' }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '1200px',
                height: 'auto',
                margin: '0px auto',
                padding: '0px 24px',
                display: 'flex',
                justifyContent: 'end'
              }}
            >
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
              <Box sx={{ width: '30%' }}>
                <Searchbar
                  placeholder={'차량명 검색'}
                  value={searchInput}
                  handleInputChange={handleInput}
                  handleSearchBtnClick={handleSearchBtn}
                  inputHeight={'35px !important'}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                padding: '10px 24px',
                maxWidth: '1200px',
                margin: 'auto'
              }}
            >
              <Collapse sx={{ width: '100%' }} in={openSearchDetail}>
                {searchDetailForm}
              </Collapse>
            </Box>
            <StyledContainer>
              <CarOperationTable operationData={operationData} />
            </StyledContainer>
          </Box>
        </StyledMain>
      </Box>
    </>
  );
};

export default CarOperationPage;

const StyledMain = styled(Box)(({ theme }) => ({
  padding: PAGE_INNER_PADDING,
  width: '100%',
  maxWidth: '1400px'
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  minHeight: '630px',
  height: 'auto',
  padding: '20px',
  borderRadius: 10
}));
