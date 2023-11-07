import { Autocomplete, Button, Paper } from '@mui/material';
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
import { subDays } from 'date-fns';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const MileageLogModal = ({ style, handleModalClose }) => {
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);

  const dateBefore = subDays(new Date(), 7);
  const before = dateBefore.toISOString().slice(0, 10); // Day.js 객체로 변경

  const [mileageLogData, setMileageLogData] = useState({
    sdate: before,
    edate: today
  });

  const [carOptions, setCarOptions] = useState([]);

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

  const renderOption = (option) => (
    <Box display="flex">
      <Typography variant="subtitle2">
        {option.car_code}
        <Typography variant="caption" sx={{ marginLeft: '8px', color: 'gray' }}>
          {option.car_name}
        </Typography>
      </Typography>
    </Box>
  );

  // useEffect(() => {
  //   axiosInstance.axiosInstance
  //     .get('/manager/car/operationListOne', {
  //       params: {
  //         car_code: '222가2222'
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       downloadMileageLog(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const downloadMileageLog = (result) => {
    const excelFilePath = process.env.PUBLIC_URL + '/test.xlsx';

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
            h: Math.floor(item.bef_mileage)
          };
          sheet[`T${num + index}`] = {
            v: Math.floor(item.aft_mileage),
            h: Math.floor(item.aft_mileage)
          };
          sheet[`Z${num + index}`] = {
            v: Math.floor(item.distance),
            h: Math.floor(item.distance)
          };
          sheet[`AF${num + index}`] = {
            v: Math.floor(item.commute_mileage),
            h: Math.floor(item.commute_mileage)
          };
          sheet[`AL${num + index}`] = {
            v: Math.floor(item.nomal_biz_mileage),
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
        saveAs(blob, 'modified_excel.xlsx');
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
        <Box display="flex" height="300px" padding="25px 0px">
          <Grid container xs={8} spacing={2} height="fit-content">
            <StyledLabelGrid item xs={3}>
              <Label htmlFor={'carMaint'} text={'차량 선택'} />
            </StyledLabelGrid>
            <Grid item xs={8.4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={carOptions}
                getOptionLabel={(option) =>
                  `${option.car_code} - ${option.car_name}`
                }
                // renderOption={renderOption}
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
            <StyledLabelGrid item xs={3}>
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
              sx={{ border: '1px solid black' }}
            ></Box>
            <Button
              variant="contained"
              sx={{
                margin: '10px 0px',
                height: 'auto',
                width: '100%',
                borderRadius: '4px',
                backgroundColor: '#1b6c44',
                '&:hover': { backgroundColor: '#145434' }
              }}
            >
              다운로드
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
