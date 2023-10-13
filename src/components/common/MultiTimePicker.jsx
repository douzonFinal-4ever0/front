import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const MultiTimePicker = ({ shouldDisableTime, value }) => {
  return (
    <>
      <DateTimePicker
        label="달력 + 시간"
        format="YYYY-MM-DD HH:mm"
        defaultValue={value}
        showDaysOutsideCurrentMonth
        skipDisabled
        shouldDisableTime={shouldDisableTime}
        ampm={false}
      />
    </>
  );
};

export default MultiTimePicker;
