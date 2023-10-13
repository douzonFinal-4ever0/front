import PropTypes from 'prop-types';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const Toggle = (props) => {
  const { data, handleToggleBtn, selectBtn } = props;

  return (
    <ToggleButtonGroup value={selectBtn} exclusive onChange={handleToggleBtn}>
      {data.map((item) => (
        <ToggleButton value={item.value}>{item.name}</ToggleButton>
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
