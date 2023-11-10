import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';

const DateSelect = () => {
  const [opnColl2, setOpnColl2] = useState(false);
  return (
    <Box>
      <List>
        <ListItemButton>
          <ListItemText>최근</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>일주일 전</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>한달전</ListItemText>
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            setOpnColl2(!opnColl2);
          }}
        >
          <ListItemText>상세 입력</ListItemText>
        </ListItemButton>
        <Collapse in={opnColl2}>
          {' '}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                //   value={
                //     searchFilter.operation_sdate
                //       ? dayjs(searchFilter.operation_sdate)
                //       : null
                //   }
                //   onChange={(newValue) => {
                //     console.log(searchFilter.operation_sdate);
                //     setSearchFilter({
                //       ...searchFilter,
                //       operation_sdate: newValue.format('YYYY-MM-DD')
                //     });
                //   }}
              />
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
                //   value={dayjs(searchFilter.operation_edate)}
                //   onChange={(newValue) => {
                //     console.log(searchFilter.operation_edate);
                //     setSearchFilter({
                //       ...searchFilter,
                //       operation_edate: newValue.format('YYYY-MM-DD')
                //     });
                //   }}
              />
            </Box>
          </LocalizationProvider>
        </Collapse>
      </List>
    </Box>
  );
};
export default DateSelect;
