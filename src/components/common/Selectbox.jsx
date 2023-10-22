import styled from '@emotion/styled';
import { MenuItem, Select } from '@mui/material';

const Selectbox = ({ value, handleSelectBox, menuList }) => {
  return (
    <StyledSelect value={value} onChange={handleSelectBox} displayEmpty>
      <MenuItem value="">선택</MenuItem>
      {menuList.map((item) => (
        <MenuItem key={item.index} value={item.value}>
          {item.value}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default Selectbox;

const StyledSelect = styled(Select)(({ theme }) => ({
  '&.MuiInputBase-root': {
    width: '100%'
  }
}));
