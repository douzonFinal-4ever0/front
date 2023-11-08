import { Autocomplete, Button, ImageListItem, Paper } from '@mui/material';
import axiosInstance from '../../../utils/axios';
import { useEffect, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import RectangleIcon from '@mui/icons-material/Rectangle';
import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';
import Label from '../../common/Label';
import dayjs from 'dayjs';
import { subMonths } from 'date-fns';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import format from 'date-fns/format';
import { useDispatch } from 'react-redux';
import {
  openSanckbar,
  setSnackbarContent
} from '../../../redux/reducer/SnackbarSlice';

const MileageLogModal = ({ style, handleModalClose }) => {
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);

  const dateBefore = subMonths(new Date(), 1);
  const before = dateBefore.toISOString().slice(0, 10); // Day.js 객체로 변경

  const [autoCompleteValue, setAutoCompleteValue] = useState(null);

  const [mileageLogData, setMileageLogData] = useState({
    car_code: '',
    car_name: '',
    sdate: before,
    edate: today
  });

  const [carOptions, setCarOptions] = useState([]);

  const dispatch = useDispatch();

  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  const imageUrl = process.env.PUBLIC_URL + '/mileageLog.jpg';

  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/manager/car/carListGetAll')
      .then((res) => {
        console.log(res.data);
        setCarOptions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMileageDownloadBtn = () => {
    if (
      mileageLogData.car_code === '' ||
      mileageLogData.sdate === null ||
      mileageLogData.edate === null
    ) {
      handleSetSnackbarContent('입력하지 않은 데이터가 있습니다.');
      handleOpenSnackbar();
      return;
    }

    axiosInstance.axiosInstance
      .get('/manager/car/operationListOne', {
        params: {
          car_code: mileageLogData.car_code,
          sdate: mileageLogData.sdate,
          edate: mileageLogData.edate
        }
      })
      .then((res) => {
        console.log(res.data);
        downloadMileageLog(
          res.data,
          mileageLogData.car_code,
          mileageLogData.car_name
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadMileageLog = (result, car_code, car_name) => {
    const excelFilePath = process.env.PUBLIC_URL + '/test.xlsx';

    // 현재 년도의 첫날과 마지막 날을 Date 객체로 생성
    const startDate = new Date(dateNow.getFullYear(), 0, 1); // 0은 1월을 나타냄
    const endDate = new Date(dateNow.getFullYear(), 11, 31); // 11은 12월을 나타냄

    // Date 객체를 원하는 형식으로 문자열로 변환
    const startDateString = startDate.toLocaleDateString('ko-KR');
    const endDateString = endDate.toLocaleDateString('ko-KR');

    fetch(excelFilePath)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const readOptions = {
          type: 'array',
          cellStyles: true
        };
        const workbook = XLSX.read(data, readOptions);

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // 셀에 데이터 저장
        sheet['H2'] = { v: startDateString, startDateString };
        sheet['H5'] = { v: endDateString, h: endDateString };
        sheet['AQ2'] = { v: '더존비즈온', h: '더존비즈온' };
        sheet['AQ4'] = { v: '123-45-67890', h: '123-45-67890' };
        sheet['A9'] = { v: car_name, h: car_name };
        sheet['K9'] = { v: car_code, h: car_code };

        result.map((item, index) => {
          const num = 15;
          console.log(num + index);
          sheet[`A${num + index}`] = {
            v: new Date(item.created_at).toLocaleDateString(),
            h: new Date(item.created_at).toLocaleDateString()
          };
          sheet[`F${num + index}`] = {
            v: item.dept_name,
            h: item.dept_name
          };
          sheet[`J${num + index}`] = { v: item.name, h: item.name };
          sheet[`N${num + index}`] = {
            v: Math.floor(item.bef_mileage),
            t: 'n',
            h: Math.floor(item.bef_mileage)
          };
          sheet[`T${num + index}`] = {
            v: Math.floor(item.aft_mileage),
            t: 'n',
            h: Math.floor(item.aft_mileage)
          };
          sheet[`Z${num + index}`] = {
            v: Math.floor(item.distance),
            t: 'n',
            h: Math.floor(item.distance)
          };
          sheet[`AF${num + index}`] = {
            v: Math.floor(item.commute_mileage),
            t: 'n',
            h: Math.floor(item.commute_mileage)
          };
          sheet[`AL${num + index}`] = {
            v: Math.floor(item.nomal_biz_mileage),
            t: 'n',
            h: Math.floor(item.nomal_biz_mileage)
          };
        });

        // 스타일 지정
        const array = [
          'A2',
          'H3',
          'AK2',
          'AK4',
          'A8',
          'K8',
          'A11',
          'A12',
          'F12',
          'F13',
          'J13',
          'N12',
          'N13',
          'T13',
          'Z13',
          'AF13',
          'AF14',
          'AL14',
          'AR13',
          'N51',
          'AF51',
          'AR51'
        ];
        array.map((item) => {
          const currentValue = sheet[item].v; // 값
          const currentToolTip = sheet[item].h; // 툴팁
          sheet[item] = {
            v: currentValue,
            h: currentToolTip,
            s: {
              font: { sz: 10 },
              alignment: { horizontal: 'center', vertical: 'center' }
            }
          };
        });

        const currentP2Value = sheet['P2'].v;
        const currentP2ToolTip = sheet['P2'].h;
        sheet['P2'] = {
          v: currentP2Value,
          h: currentP2ToolTip,
          s: {
            font: { bold: true, sz: 18 },
            alignment: { horizontal: 'center', vertical: 'center' }
          }
        };

        const writeOptions = {
          bookType: 'xlsx',
          type: 'array',
          bookSST: false
        };

        const workbookData = XLSX.write(workbook, writeOptions);
        const blob = new Blob([workbookData], {
          type: 'application/octet-stream'
        });
        saveAs(blob, `${format(dateNow, 'yyMMdd')}_국세청운행기록부.xlsx`);
      })
      .catch((error) => {
        console.error('Error loading the Excel file:', error);
      });
  };

  return (
    <Box id="excelDisplay" sx={{ ...style, width: 800 }}>
      <IconButton
        aria-label="delete"
        size="large"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={handleModalClose}
      >
        <ClearIcon
          fontSize="inherit"
          color="#1E1E1E"
          width="20px"
          height="20px"
        />
      </IconButton>
      <Container sx={{ padding: '6px 0px !important' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            width: '100%',
            borderBottom: '3px solid black',
            padding: '15px 0px'
          }}
        >
          <Box display="flex">
            <RectangleIcon
              sx={{
                color: 'black',
                marginTop: 'auto',
                marginBottom: 'auto',
                width: '6px',
                height: '6px'
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                marginLeft: '10px',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              운행 기록부 다운로드
            </Typography>
          </Box>
        </Box>
        <Box display="flex" height="auto" padding="25px 0px">
          <Grid container xs={8} spacing={2} height="fit-content">
            <StyledLabelGrid item xs={2.5}>
              <Label htmlFor={'carMaint'} text={'차량 선택'} />
            </StyledLabelGrid>
            <Grid item xs={8.8}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={carOptions}
                value={autoCompleteValue}
                onChange={(event, newValue, clear) => {
                  if (clear === 'clear') {
                    setAutoCompleteValue(null);
                    setMileageLogData({
                      ...mileageLogData,
                      car_code: '',
                      car_name: ''
                    });
                  } else {
                    setAutoCompleteValue(newValue);
                    setMileageLogData({
                      ...mileageLogData,
                      car_code: newValue.car_code,
                      car_name: newValue.car_name
                    });
                  }
                }}
                getOptionLabel={(option) => option.car_code}
                noOptionsText="검색한 차량이 존재하지 않습니다"
                renderOption={(props, option) => (
                  <Box component="li" display="flex" {...props}>
                    <Typography variant="subtitle2" marginRight="4px">
                      {option.car_code}
                    </Typography>
                    <Typography variant="caption">{option.car_name}</Typography>
                  </Box>
                )}
                sx={{
                  width: 'auto',
                  '& .MuiInputBase-root': {
                    height: '40px',
                    backgroundColor: '#ffffff'
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '8px 10px !important'
                  }
                }}
                PopoverProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200
                    }
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <StyledLabelGrid item xs={2.5}>
              <Label htmlFor={'carMaint'} text={'기간 선택'} />
            </StyledLabelGrid>
            <Grid item xs={8}>
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
                          '& .MuiInputBase-inputAdornedEnd': {
                            fontSize: '15px'
                          }
                        }}
                        format="YYYY-MM-DD"
                        value={dayjs(mileageLogData.sdate)}
                        onChange={(newValue) => {
                          console.log(mileageLogData.sdate);
                          setMileageLogData({
                            ...mileageLogData,
                            sdate: newValue.format('YYYY-MM-DD')
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
                          '& .MuiInputBase-inputAdornedEnd': {
                            fontSize: '15px'
                          }
                        }}
                        format="YYYY-MM-DD"
                        size="small"
                        value={dayjs(mileageLogData.edate)}
                        onChange={(newValue) => {
                          console.log(mileageLogData.edate);
                          setMileageLogData({
                            ...mileageLogData,
                            edate: newValue.format('YYYY-MM-DD')
                          });
                        }}
                      />
                    </DemoItem>
                  </Box>
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
          <Grid flexGrow={1}>
            <Box
              width="100%"
              height="85%"
              sx={{ border: '1px solid #9e9e9e', borderRadius: '4px' }}
            >
              <ImageListItem>
                <img
                  src={imageUrl}
                  alt={'운행일지이미지'}
                  loading="lazy"
                  style={{
                    width: '300px',
                    height: '330px',
                    objectFit: 'cover'
                  }}
                />
              </ImageListItem>
            </Box>
            <Button
              variant="contained"
              sx={{
                margin: '10px 0px',
                height: 'auto',
                width: '100%',
                backgroundColor: '#1b6c44',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                '&:hover': { backgroundColor: '#145434' }
              }}
              endIcon={
                <DownloadForOfflineIcon
                  sx={{ width: '25px', height: '25px' }}
                />
              }
              onClick={handleMileageDownloadBtn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#ffffff"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: 'normal' }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M28.8125,0.03125l-28,5.3125c-0.47266,0.08984 -0.8125,0.51953 -0.8125,1v37.3125c0,0.48047 0.33984,0.91016 0.8125,1l28,5.3125c0.0625,0.01172 0.125,0.03125 0.1875,0.03125c0.23047,0 0.44531,-0.07031 0.625,-0.21875c0.23047,-0.19141 0.375,-0.48437 0.375,-0.78125v-48c0,-0.29687 -0.14453,-0.58984 -0.375,-0.78125c-0.23047,-0.19141 -0.51953,-0.24219 -0.8125,-0.1875zM32,6v7h2v2h-2v5h2v2h-2v5h2v2h-2v6h2v2h-2v7h15c1.10156,0 2,-0.89844 2,-2v-34c0,-1.10156 -0.89844,-2 -2,-2zM36,13h8v2h-8zM6.6875,15.6875h5.125l2.6875,5.59375c0.21094,0.44141 0.39844,0.98438 0.5625,1.59375h0.03125c0.10547,-0.36328 0.30859,-0.93359 0.59375,-1.65625l2.96875,-5.53125h4.6875l-5.59375,9.25l5.75,9.4375h-4.96875l-3.25,-6.09375c-0.12109,-0.22656 -0.24609,-0.64453 -0.375,-1.25h-0.03125c-0.0625,0.28516 -0.21094,0.73047 -0.4375,1.3125l-3.25,6.03125h-5l5.96875,-9.34375zM36,20h8v2h-8zM36,27h8v2h-8zM36,35h8v2h-8z"></path>
                  </g>
                </g>
              </svg>
              {`${format(dateNow, 'yyMMdd')}_국세청운행기록부.xlsx`}
            </Button>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default MileageLogModal;

const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));
