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
          sx={{ border: `1px solid ${palette.grey['500']}`, ...sx }}
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
