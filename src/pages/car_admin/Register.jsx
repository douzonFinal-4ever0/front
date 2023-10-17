import SubHeader from "../../components/common/SubHeader";
import SubSidebar from "../../components/common/SubSidebar";
import Drawer from "../../components/common/Drawer";
import { useState, useEffect } from "react";
import Box from "@mui/system/Box";
import { Button, Checkbox, Chip, Collapse, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, ListItem, ListItemIcon, MenuItem, Radio, RadioGroup, Select, TextField, Paper, CardHeader, Typography, Alert } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Circle, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Container, Stack } from "@mui/system";
import styled from "@emotion/styled";
import Searchbar from "../../components/common/Searchbar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import CommonTable from "../../components/common/CommonTable";
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import UserSearchBar from "../../components/car_admin/UserSearchBar";
import cardata from "../../cardata.json";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

// transferList 관련 함수
function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

// transferList 관련 함수 끝


// 서브 사이드바 콘텐츠
const SubSidebarContent = ({ toggleDrawer }) => {
    // 차량 수
    const totalCar = 20
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2 }}>
            <Grid container sx={{ pt: 3, pl: 1, pr: 1, pb: 3 }}>
                <Button variant="contained" sx={{ width: '100%' }} onClick={toggleDrawer('right', true)}>차량 등록</Button>
            </Grid>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary={`전체 차량(${totalCar})`} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon >
                                <Circle color="primary" sx={{ width: '15px !important' }} />
                            </ListItemIcon>
                            <ListItemText primary={`법인 차량 (${totalCar})`} primaryTypographyProps={{ fontSize: '13px' }} />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon >
                                <Circle color="success" sx={{ width: '15px !important' }} />
                            </ListItemIcon>
                            <ListItemText primary={`개인 차량 (${totalCar})`} primaryTypographyProps={{ fontSize: '13px' }} />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton >
                    <ListItemText primary={`삭제된 차량 (${totalCar})`} />
                </ListItemButton>
            </List>
            {/* </Box> */}map
        </Box>
    );
}

// 차량 등록 Drawer 컴포넌트
const CarRegisterFrom = () => {


    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0, 10);

    // 차량 등록 데이터
    // transferList 관련 변수, 함수들
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    const [registerData, setRegisterData] = useState({
        car_code: '',
        name: null,
        type: '법인',
        fuel_type: '',
        authority: '1',
        buy_at: dayjs(today),
        memo: '',
        carDetail : {fuel_effciency: '',accum_mileage: ''},
        carUser: { mem_code: left[0] ? left[0] : null, car_code: '' }
    });

    // useEffect(() => {
    //     console.log(registerData);
    // }, [registerData]);

    const handleChange = (event) => {
        setRegisterData({ ...registerData, fuel_type: event.target.value });
    };

    const [isShowSelectUser, setIsSelectUser] = useState(false);

    const handleCarAuthority = (e) => {
        setRegisterData({ ...registerData, authority: e.target.value });
        setIsSelectUser(e.target.value === "1" ? false : true);
    }

    // axios로 사용자 정보 불러오기
    useEffect(() => {
        axios.get('http://localhost:8081/admin/memList').then((res) => {
            setRight(res.data);
        })
            .catch((error) => { // 에러 발생 시 코드 실행
                console.log(error);
            })
    }, [])

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [checked]; // 하나만 체크할 수 있도록 변경

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        if (left.length < 1) {
            setLeft(left.concat(rightChecked));
            setRight(not(right, rightChecked));
            setChecked(not(checked, rightChecked));
            setRegisterData({ ...registerData, carUser: { ...registerData.carUser, mem_code: rightChecked[0].mem_code } });
        }
    };


    const customList = (items, header) => (
        <Card sx={{ width: "100%", height: 230, overflow: 'auto', backgroundColor: '#f5f5f5' }}>
            {header}
            <Divider />
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;
                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value['mem_code']} ${value['name']} ${value['dept_code']}_${value['position_name']}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );

    // transferList 관련 함수, 변수들 끝

    // autoComplete
    // const carData = CarFuelData;

    const carData = cardata;

    const defaultProps = {
        options: cardata,
        getOptionLabel: (option) => {
            return option.model
        }
    };

    // 사용자 검색 기능
    const [inputUser, setInputUser] = useState('');


    // 사용자 검색할 때 
    const handleInputUser = (e) => {
        setInputUser(e.target.value);
    }

    // 검색어에 따라 데이터 필터링
    const filterMemData = right.filter((item) =>
        item['name'].includes(inputUser)
    )

    // 사용자 검색 기능 끝

    // datePicker
    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => { };
    }, [cleared]);

    // datePicker 끝

    // 차량 등록 버튼
    const handleSubmitBtn = () => {
        console.log(registerData);
        // axios.post('http://localhost:8081/admin/memList', registerData).then((res) => {
        //     console.log(res);
        // }).catch((error) => { // 에러 발생 시 코드 실행
        //     console.log(error);
        // })
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%', backgroundColor: '#f5f5f5' },
                '& .MuiGrid-item': { alignSelf: "center" }
            }}
            noValidate
            autoComplete="off"
        >
            <Stack direction="row" justifyContent="end">
                <Button variant="contained" size="large" sx={{ width: "12%" }} onClick={handleSubmitBtn}>
                    차량 등록
                </Button>
            </Stack>
            {/* 전체 그리드 */}
            <Grid sx={{ flexGrow: 1, p: "30px" }} container>
                <Grid item xs={12}>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        defaultValue="법인"
                        value={registerData.type}
                        onChange={(e) => { setRegisterData({ ...registerData, type: e.target.value }) }}
                    >
                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ display: "flex", alignItems: "center", width: "80px", fontWeight: "bold" }} >종류</FormLabel>
                        <FormControlLabel value="법인" control={<Radio />} label={<Chip label="법인" color="primary" />} />
                        <FormControlLabel value="개인" control={<Radio />} label={<Chip label="개인" color="success" />} />
                    </RadioGroup>

                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <FormLabel item id="demo-row-radio-buttons-group-label" sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }} >차량명</FormLabel>
                        </Grid>
                        <Grid item xs={5}>
                            <Autocomplete
                                freeSolo
                                {...defaultProps}
                                item
                                value={registerData.name}
                                onChange={(e) => console.log(e)}
                                // onChange={(event, newValue, clear) => {
                                //     if (clear === "clear") {
                                //         setRegisterData({ ...registerData, fuel_type: '', carDetail : {...registerData.carDetail, fuel_effciency : ''}});
                                //     } else {
                                //         setRegisterData({ ...registerData, name: newValue.model, fuel_type: newValue.fuel_type, carDetail : {...registerData.carDetail, fuel_effciency : newValue.fuel_effciency} });
                                //     }
                                // }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} placeholder="차량명" />}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <FormLabel item id="demo-row-radio-buttons-group-label" sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }} >차량번호</FormLabel>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                sx={{ m: 1 }}
                                item
                                id="outlined-multiline-flexible"
                                placeholder="차량번호"
                                value={registerData.car_code}
                                onChange={(e) => { setRegisterData({ ...registerData, car_code: e.target.value, carUser: { ...registerData.carUser, car_code: e.target.value } }) }}
                            />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <FormLabel item id="demo-row-radio-buttons-group-label" sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }} >유종</FormLabel>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl item required sx={{ m: 1, width: "100%" }}>
                                <InputLabel id="demo-simple-select-required-label">유종</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={registerData.fuel_type}
                                    label="유종 *"
                                    onChange={handleChange}
                                    sx={{ backgroundColor: '#f5f5f5' }}
                                >
                                    <MenuItem value={"휘발유"}>휘발유</MenuItem>
                                    <MenuItem value={"경유"}>경유</MenuItem>
                                    <MenuItem value={"LPG"}>LPG</MenuItem>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <FormLabel item id="demo-row-radio-buttons-group-label" sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }} >연비</FormLabel>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                item
                                id="outlined-multiline-flexible"
                                placeholder="연비"
                                sx={{ m: 1 }}
                                value={registerData.carDetail.fuel_effciency}
                                onChange={(e) => {setRegisterData({...registerData, carDetail : {...registerData.carDetail, fuel_effciency : e.target.value}})}}
                            />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <FormLabel item id="demo-row-radio-buttons-group-label" sx={{ display: "flex", alignItems: "center", fontWeight: "bold", whiteSpace: 'pre-line', fontSize: "15px" }} >{"누적" + "\n" + "주행 거리"}</FormLabel>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                item
                                id="outlined-multiline-flexible"
                                type="number"
                                label="numberOnly"
                                placeholder="누적 주행 거리"
                                value={registerData.carDetail.accum_mileage}
                                onChange={(e) => {setRegisterData({...registerData, carDetail : {...registerData.carDetail, accum_mileage : e.target.value}})}}
                                sx={{ m: 1 }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <FormLabel item id="demo-row-radio-buttons-group-label" sx={{ fontWeight: "bold" }} >km</FormLabel>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <FormLabel item id="demo-row-radio-buttons-group-label" sx={{ fontWeight: "bold" }} >구입일자</FormLabel>
                        </Grid>
                        <Grid item xs={5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <DemoItem>
                                        <DatePicker
                                            sx={{ width: 260 }}
                                            slotProps={{
                                                field: { clearable: true, onClear: () => setCleared(true) },
                                            }}
                                            value={registerData.buy_at}
                                            onChange={(newValue) => { setRegisterData({ ...registerData, buy_at: newValue }) }}
                                        />
                                    </DemoItem>
                                </Box>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <FormLabel item id="demo-row-radio-buttons-group-label" sx={{ fontWeight: "bold" }} >메모</FormLabel>
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                id="outlined-multiline-static"
                                label="메모"
                                multiline
                                value={registerData.memo}
                                onChange={(e) => { setRegisterData({ ...registerData, memo: e.target.value }) }}
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container xs={12}>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        defaultValue={registerData.authority}
                        onChange={handleCarAuthority}
                    >
                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ display: "flex", alignItems: "center", fontWeight: "bold", mr: "15px" }} >차량 사용 권한</FormLabel>
                        <FormControlLabel value="1" control={<Radio />} label="전체 사용 가능" />
                        <FormControlLabel value="2" control={<Radio />} label="선택 사용자만 사용 가능" />
                    </RadioGroup>
                </Grid>
                {
                    isShowSelectUser === true ?
                        <Grid container xs={12} spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={5}>{customList(left, <Typography></Typography>)}</Grid>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0 || left.length >= 1}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>{customList(filterMemData,
                                <CardHeader
                                    sx={{ px: 2, py: 1 }}
                                    title={<UserSearchBar placeholder={"사용자명 검색"} value={inputUser} handleInput={handleInputUser}></UserSearchBar>}
                                />
                            )}</Grid>
                        </Grid> : null
                }

            </Grid>


        </Box>
    );
}


// 실제 등록 페이지
const RegisterPage = ({ isAdminMode, setIsAdminMode }) => {

    // drawer 이벤트 처리
    const [drawerState, setDrawerState] = useState({
        right: false
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState({ ...drawerState, ['right']: open });
    };

    const tabData1 = [
        {
            "title": "차량 등록",
            "content": <CarRegisterFrom />
        }
    ]

    useEffect(() => {
        if (isAdminMode === false) {
            setIsAdminMode(true);
        }
    }, []);

    const [searchInput, setSearchInput] = useState('');

    const handleInput = (e) => {
        setSearchInput(e.target.value);
    }
    const handleSearchBtn = (e) => {
        e.preventDefault();
        alert("검색 : " + searchInput);
    }

    // car DataGrid 시작

    const [carInfo, setCarInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/admin/car/carList').then((res) => {
            setCarInfo(res.data);
        })
            .catch((error) => { // 에러 발생 시 코드 실행
                console.log(error);
            })
    }, [])


    const columns = [
        { id: 'type', label: '종류', minWidth: 170 },
        { id: 'car_code', label: '차량 번호', minWidth: 100 },
        {
            id: 'car_name',
            label: '차량명',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'latest_op',
            label: '최근운행',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'accum_mileage',
            label: '누적주행거리',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'memo',
            label: '메모',
            minWidth: 170,
            align: 'right',
        }
    ];


    return (
        <>
            {/* 캘린더 이벤트 전달은 객체 배열을 props로 전달하여 표시
            
        */}
            <SubHeader title={'차량'} />
            <Box sx={{ display: 'flex', height: '95%' }}>
                <SubSidebar content={<SubSidebarContent toggleDrawer={toggleDrawer} />} widthP={20} />
                <Box sx={{ width: '100%', padding: 3 }}>
                    <Drawer width={1000} drawerState={drawerState} toggleDrawer={toggleDrawer} tabData={tabData1} />
                    <Searchbar width={'40%'} placeholder={'차량명 검색'} value={searchInput} handleInput={handleInput} handleSearchBtn={handleSearchBtn} />
                    <StyledContainer>
                        <CommonTable columns={columns} rows={carInfo} />
                        {/* <DataGrid rows={carInnfo} columns={colums} width='100%' height={400} pageSize={5} pageSizeOptions={[5, 10]} checkbox={true} disableRow={false} /> */}
                    </StyledContainer>
                </Box>
            </Box>


        </>
    );
}

export default RegisterPage;


const StyledContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    width: '100%',
    height: "auto",
    marginTop: '20px',
    padding: "20px",
    borderRadius: 10
}));


