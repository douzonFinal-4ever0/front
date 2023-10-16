import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const MultiTimePicker = ({
  shouldDisableTime,
  value,
  label,
  onChange,
  name
}) => {
  return (
    <>
      <DateTimePicker
        label={label}
        format="YYYY-MM-DD HH:mm"
        defaultValue={value}
        showDaysOutsideCurrentMonth
        skipDisabled
        shouldDisableTime={shouldDisableTime}
        ampm={false}
        onChange={onChange}
        name={name}
      />
    </>
  );
};

export default MultiTimePicker;
