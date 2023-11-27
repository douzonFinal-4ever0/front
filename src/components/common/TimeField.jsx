import * as React from 'react';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import 'dayjs/locale/ko';
import TimePickerClock from './TimePickerClock';
import MultiTimePicker from './MultiTimePicker';

const TimeField = ({ withMonth, label, onChange, name, timeValue }) => {
  const inputTimeValue = timeValue !== null ? dayjs(timeValue) : null;

  /**date time picker 써야할때 쓰는거 */
  // const [value, setValue] = useState(inputTimeValue);
  const value = inputTimeValue;
  /*-----------------------------------------------------------------------*/

  /**시간과 분을 필터링 할 때 쓰는거*/
  const shouldDisableTime = (value, view) => {
    const hour = value.hour();
    if (view === 'hours') {
      return hour < 9 || hour > 21;
    }
    if (view === 'minutes') {
      const minute = value.minute();
      return minute % 30;
    }
  };
  /*-----------------------------------------------------------------------*/

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      {withMonth ? (
        <MultiTimePicker
          shouldDisableTime={shouldDisableTime}
          label={label}
          onChange={onChange}
          name={name}
          value={value}
        />
      ) : (
        <TimePickerClock
          shouldDisableTime={shouldDisableTime}
          label={label}
          value={value}
        />
      )}
    </LocalizationProvider>

    /**시간만 픽하고 싶을때 쓰는거 */
    // <TimePickerClock/>

    // /**날짜와 시간 전부 픽 할 수 있는거 */
    // <MultiTimePicker/>
  );
};

export default TimeField;
