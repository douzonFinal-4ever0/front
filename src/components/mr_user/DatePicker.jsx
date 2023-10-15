import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker';
import styled from '@emotion/styled';

const DatePicker = () => {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <StyledPicker defaultValue={value} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;

const StyledPicker = styled(Picker)(({ theme }) => ({
  width: '100%',
  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5'
}));
