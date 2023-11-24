import {
  Box,
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useEffect } from 'react';
import { Await } from 'react-router-dom';
import RectangleBtn from '../common/RectangleBtn';

const DateSelect = ({ setDateRange, dateFilter, setDateFilter }) => {
  const [opnColl2, setOpnColl2] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [filter, setFilter] = useState({
  //   startDate: 0,
  //   endDate: 0
  // });
  const selectDate = () => {
    if (startDate !== null && endDate !== null) {
      setDateFilter({
        startDate: startDate,
        endDate: endDate
      });
    }
  };

  return (
    <Box>
      <List>
        <ListItemButton
          onClick={() => {
            setDateFilter({
              startDate: 0,
              endDate: 0
            });
            setDateRange(0);
          }}
        >
          <ListItemText>전체</ListItemText>
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setDateFilter({
              startDate: 0,
              endDate: 0
            });
            setDateRange(1);
          }}
        >
          <ListItemText>오늘</ListItemText>
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setDateFilter({
              startDate: 0,
              endDate: 0
            });
            setDateRange(2);
          }}
        >
          <ListItemText>일주일 전</ListItemText>
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setDateFilter({
              startDate: 0,
              endDate: 0
            });
            setDateRange(3);
          }}
        >
          <ListItemText>한달전</ListItemText>
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setOpnColl2(!opnColl2);
          }}
        >
          <ListItemText>상세 입력</ListItemText>
        </ListItemButton>
        <Collapse in={opnColl2} sx={{ mt: 1 }}>
          <Stack sx={{ rowGap: '10px' }}>
            <Grid item container spacing={0} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={1}></Grid>
                <Grid item xs={9}>
                  <Box>
                    <DatePicker
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '40px',
                          width: '100%'
                        },
                        '& .MuiInputBase-inputAdornedEnd': { fontSize: '15px' }
                      }}
                      format="YYYY-MM-DD"
                      size="small"
                      onChange={(e) => {
                        setStartDate(e.format('YYYY-MM-DD'));
                        // setFilter({
                        //   ...filter,
                        //   endDate: e.format('YYYY-MM-DD')
                        // });
                      }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: 1
                  }}
                >
                  <Typography variant="body2">부터</Typography>
                </Grid>
              </LocalizationProvider>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '0px 10px'
              }}
            >
              <Typography variant="h6">-</Typography>
            </Box>

            <Grid item container xs={12} spacing={0}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={1}></Grid>
                <Grid item xs={9}>
                  <Box>
                    <DatePicker
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '40px',
                          width: '100%'
                        },
                        '& .MuiInputBase-inputAdornedEnd': { fontSize: '15px' }
                      }}
                      format="YYYY-MM-DD"
                      size="small"
                      onChange={(e) => {
                        setEndDate(e.format('YYYY-MM-DD'));
                        // setFilter({
                        //   ...filter,
                        //   endDate: e.format('YYYY-MM-DD')
                        // });
                      }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: 1
                  }}
                >
                  <Typography variant="body2">까지</Typography>
                </Grid>
              </LocalizationProvider>
            </Grid>
            <Grid item container xs={12} spacing={3}>
              <Grid item xs={8}></Grid>
              <Grid item xs={3} sx={{ minWidth: '100px' }}>
                <RectangleBtn
                  text={'검색'}
                  category={'register'}
                  sx={{ padding: '14px 12px', width: '45%', height: '30px' }}
                  handlebtn={selectDate}
                />
              </Grid>
            </Grid>
          </Stack>
        </Collapse>
      </List>
    </Box>
  );
};
export default DateSelect;
