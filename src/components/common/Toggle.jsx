import PropTypes from 'prop-types';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { palette } from '../../theme/palette';

const Toggle = (props) => {
  const { data, handleToggleBtn, selectBtn, sx } = props;
  return (
    <ToggleButtonGroup value={selectBtn} exclusive onChange={handleToggleBtn}>
      {data.map((item, index) => (
        <ToggleButton
          key={index}
          value={item.value}
          sx={{
            '&$checked': {
              backgroundColor: 'your_custom_checked_color' // 토글이 활성화된 경우 배경색
            },

            border: `1px solid ${palette.grey['500']}`,
            ...sx
          }}
        >
          {item.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

Toggle.propTypes = {
  data: PropTypes.array.isRequired,
  selectBtn: PropTypes.number.isRequired,
  handleToggleBtn: PropTypes.func.isRequired
};

export default Toggle;
