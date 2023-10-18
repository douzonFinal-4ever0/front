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
const Dashboard = () => {
  const [carRez, setCarRez] = useState([]);
  const [range, setRange] = useState('전체');
  const mem_code = 'MEM001';
  // 검색창------------------------------------------------------
  const [value, setValue] = useState(null);
  // 검색창 입력 이벤트
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  // 검색 클릭 이벤트
  const handleSearchBtn = (e) => {
    e.preventDefault();
    console.log('asd');
  };

  const dateFormat = (date) => {
    const preDate = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return preDate.toLocaleString('ko-KR', options).slice(0, -1);
  };
  useEffect(() => {
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
    if (params.row.status === '확정') {
      return <Chip label="success" color="success" variant="outlined" />;
    }
    if (params.row.status === '완료') {
      return <Chip label="primary" color="primary" variant="outlined" />;
    }
    if (params.row.status === '거절') {
      return <Chip label="reject" color="error" variant="outlined" />;
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
  const SubSideContents = ({}) => {
    // const isDrawerOpen = useSelector((state) => state.drawer.isDrawerOpen);
    // const dispatch = useDispatch();

    // const handleOpenDrawer = () => {
    //   dispatch(openDrawer());
    // };

    // const handleCloseDrawer = () => {
    //   dispatch(closeDrawer());
    // };

    // // 차량 수
    // const totalCar = 20;
    // const [open, setOpen] = useState(true);
    // const handleClick = () => {
    //   setOpen(!open);
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
            height: 100
          }
        }}
      >
        <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
          <Button variant="contained" sx={{ width: '100%' }}>
            차량 등록
          </Button>
        </Grid>
        <Divider />
        <Searchbar width={'100%'} placeholder={'차량/차량번호 입력'} />
        <Paper className="MuiPaper-rounded2" width={'100%'}>
          <CarList rows={[]} />
        </Paper>
      </Box>
    );
  };

  const CarList = ({ rows }) => {
    if (rows.length == 0) {
      return <div>no rows</div>;
    } else {
      rows.map((car) => {
        return <div>asd</div>;
      });
    }
  };
  const colums = [
    {
      field: 'rez_status',
      headerName: '상태',
      width: 100,
      description: '예약 상태',
      editable: false
      //renderCell: (params) => createChip(params)
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
  const handleRange = (e) => {
    setRange(e.target.value);
  };
  return (
    <>
      <SubHeader title={'차량 예약 조회'} />
      <Box sx={{ display: 'flex', height: '95%' }}>
        <SubSidebar widthP={20} content={<SubSideContents />} />
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
                <MenuItem value={'전체'}>
                  <em>전체</em>
                </MenuItem>
                <MenuItem value={'확정'}>확정</MenuItem>
                <MenuItem value={'취소'}>취소</MenuItem>
                <MenuItem value={'완료'}>완료</MenuItem>
              </Select>
            </FormControl>
            <br />
            <DataGrid
              rows={carRez}
              columns={colums}
              width="90%"
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
