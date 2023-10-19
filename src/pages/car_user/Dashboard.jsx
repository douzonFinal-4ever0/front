import CommonTable from '../../components/common/CommonTable';
import DataGrid from '../../components/common/DataGrid';
import axios from 'axios';
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
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer
} from '@mui/material';
import MainContainer from '../../components/mr_user/MainContainer';
import { Container } from '@mui/system';
import { PAGE_INNER_PADDING, BORDER_RADIUS } from '../../config';
import styled from '@emotion/styled';
import WrapContainer from '../../components/mr_user/WrapContainer';
import Searchbar from '../../components/common/Searchbar';
import NoRow from '../../components/car_user/NoRow';
const Dashboard = () => {
  const [carRez, setCarRez] = useState([]);
  const [range, setRange] = useState('');
  const mem_code = 'MEM001';

  // 검색창------------------------------------------------------
  //const [value, setValue] = useState(null);

  const dateFormat = (date) => {
    const preDate = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return preDate.toLocaleString('ko-KR', options).slice(0, -1);
  };
  useEffect(() => {
    //console.log(range);
    const rez_status = range;
    axios
      .get(`http://localhost:8081/car_rez/rezList/${mem_code}`)
      .then((res) => {
        console.log(res.data);
        const rezData = res.data.map((item) => ({
          ...item,
          id: item.car_rez_code,
          start_at: dateFormat(item.start_at),
          return_at: dateFormat(item.return_at)
        }));
        console.log(rezData);
        setCarRez(rezData);
      });
  }, []);

  const createChip = (params) => {
    if (params.row.rez_status === '1') {
      return <Chip label="확정" color="success" variant="outlined" />;
    }
    if (params.row.rez_status === '2') {
      return <Chip label="완료" color="primary" variant="outlined" />;
    }
    if (params.row.rez_status === '3') {
      return <Chip label="취소" color="error" variant="outlined" />;
    }
  };

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
    const [searchInput, setSearchInput] = useState('');
    const [rows, setRows] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:8081/car_rez/searchCarList`).then((res) => {
        setRows(res.data);
        // res.data.map((row) => {
        //   let sRow = row.car_name.split(' ');
        //   res.data.car_name = sRow[0];
        // });
        // setRows(res.data);
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
        <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
          <Button variant="contained" sx={{ width: '100%' }}>
            차량 예약
          </Button>
        </Grid>
        <Divider />
        <Searchbar
          width={'100%'}
          placeholder={'차종을 입력하세요'}
          value={searchInput}
          handleInput={handleInput}
          handleSearchBtn={handleSearchBtn}
        />
        <Paper className="MuiPaper-rounded2" width={'100%'}>
          <CarList rows={filterCarData} />
        </Paper>
      </Box>
    );
  };

  const CarList = ({ rows }) => {
    if (rows.length == 0) {
      return <NoRow />;
    } else {
      // <List dense component="div" role="list">
      //   {rows.map((car) => {
      //     return (
      //       <ListItem>
      //         <ListItemText primary={`${car.car_code}`} />
      //       </ListItem>
      //     );
      //   })}
      // </List>;
      return (
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <List dense component="div" role="list">
            {rows.map((car) => {
              return (
                <ListItem>
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
      renderCell: (params) => createChip(params)
    },
    {
      field: 'start_at/return_at',
      headerName: '일자',
      width: 300,
      description: '예약 기간',
      editable: false,
      valueGetter: (params) =>
        `${params.row.start_at} - ${params.row.return_at}`
    },
    {
      field: 'mem/dept',
      headerName: '이름/부서',
      width: 200,
      description: '예약자 이름, 부서',
      editable: false,
      valueGetter: (params) => `${params.row.name} / ${params.row.dept_name}`
    },
    {
      field: 'car_name/code',
      headerName: '차종/차번호',
      width: 200,
      description: '예약 차량 이름, 번호',
      editable: false,
      valueGetter: (params) =>
        `${params.row.car_name} / ${params.row.car_code} ${params.row.type}`
    },
    {
      field: 'detail',
      headerName: '목적',
      width: 100,
      description: '사량 사용 목적',
      editable: false
    }
  ];

  const filterRezData = carRez.filter((item) =>
    item['rez_status'].includes(range)
  );
  const handleRange = (e) => {
    setRange(e.target.value);
    // axios.get(`http://localhost:8081/car_rez/rezList/${mem_code}`);
  };
  return (
    <>
      <SubHeader title={'차량 예약 조회'} />
      <Box sx={{ display: 'flex', height: '95%' }}>
        <SubSidebar widthP={30} content={<SubSideContents />} />
        <MainContainer>
          <WrapContainer bgColor={'#fff'}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              {/* <InputLabel id="demo-simple-select-filled-label">전체</InputLabel> */}
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                displayEmpty
                value={range}
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleRange}
              >
                <MenuItem value={''}>
                  <em>전체</em>
                </MenuItem>
                <MenuItem value={'1'}>확정</MenuItem>
                <MenuItem value={'3'}>취소</MenuItem>
                <MenuItem value={'2'}>완료</MenuItem>
              </Select>
            </FormControl>
            <br />
            <DataGrid
              rows={filterRezData}
              columns={colums}
              width="100%"
              height={'auto'}
              pageSize={5}
              pageSizeOptions={[5, 10]}
              checkbox={true}
              disableRow={false}
              footer={true}
            />
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default Dashboard;

const StyledBox = styled(Box)(({ theme, bgColor, height }) => ({
  padding: PAGE_INNER_PADDING,
  borderRadius: BORDER_RADIUS,
  marginTop: '1%',
  alignContent: 'center',
  height: height,
  backgroundColor: bgColor,
  [theme.breakpoints.up('md')]: {
    minWidth: '100%'
  }
}));
