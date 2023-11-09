import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
const TimePickerClock = ({ shouldDisableTime, label, value }) => {
  return (
    <TimePicker
      label={label}
      skipDisabled
      format="HH:mm"
      shouldDisableTime={shouldDisableTime}
      ampm={false}
      timeSteps={30}
      defaultValue={value}
    />
  );
};

export default TimePickerClock;
