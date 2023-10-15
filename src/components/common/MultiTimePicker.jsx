import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const MultiTimePicker = ({ shouldDisableTime, value, label }) => {
  return (
    <DateTimePicker
      label={label}
      format="YYYY-MM-DD"
      defaultValue={value}
      showDaysOutsideCurrentMonth
      skipDisabled
      shouldDisableTime={shouldDisableTime}
      ampm={false}
      views={['year', 'month', 'day']} // 시와 분을 숨기는 설정
    />
  );
};

export default MultiTimePicker;
