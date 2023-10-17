import { useState } from 'react';

import styled from '@emotion/styled';
import { Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SelectBox = ({ value, list, handleSelectBox }) => {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <StyledSelect id="category" value={value} onChange={handleSelectBox}>
        <option value="">선택</option>
        {list.map((item) => (
          <option value={item.value}>{item.name}</option>
        ))}
      </StyledSelect>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '12px',
          transform: 'translateY(-50%)'
        }}
      >
        <ArrowDropDownIcon className="arrow-icon" />
      </Box>
    </Box>
  );
};

export default SelectBox;

const StyledSelect = styled('select')(({ theme }) => ({
  padding: '16px 14px',
  display: 'flex',
  width: '100%',
  height: '56px',
  flexGrow: 1,
  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  appearance: 'none',
  fontSize: '14px',
  '&:hover': {
    outline: `1px solid ${theme.palette.grey['900']}`
  }
}));
