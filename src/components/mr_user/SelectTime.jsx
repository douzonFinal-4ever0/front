import { useState } from 'react';

import styled from '@emotion/styled';
import { Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SelectTime = ({ value, handleSelectTime }) => {
  // 시간 데이터 (9시 - 18시)
  const avlRezTime = [
    {
      index: 0,
      value: '9.0',
      name: '9:00'
    },
    {
      index: 1,
      value: '9.5',
      name: '9:30'
    },
    {
      index: 2,
      value: '10.0',
      name: '10:00'
    },
    {
      index: 3,
      value: '10.5',
      name: '10:30'
    },
    {
      index: 4,
      value: '11.0',
      name: '11:00'
    },
    {
      index: 5,
      value: '11.5',
      name: '11:30'
    },
    {
      index: 6,
      value: '12.0',
      name: '12:00'
    },
    {
      index: 7,
      value: '12.5',
      name: '12:30'
    },
    {
      index: 8,
      value: '13.0',
      name: '13:00'
    },
    {
      index: 9,
      value: '13.5',
      name: '13:30'
    },
    {
      index: 10,
      value: '14.0',
      name: '14:00'
    },
    {
      index: 11,
      value: '14.5',
      name: '14:30'
    },
    {
      index: 12,
      value: '15.0',
      name: '15:00'
    },
    {
      index: 13,
      value: '15.5',
      name: '15:30'
    },
    {
      index: 14,
      value: '16.0',
      name: '16:00'
    },
    {
      index: 15,
      value: '16.5',
      name: '16:30'
    },
    {
      index: 16,
      value: '17.0',
      name: '17:00'
    },
    {
      index: 17,
      value: '17.5',
      name: '17:30'
    },
    {
      index: 18,
      value: '18.0',
      name: '18:00'
    }
  ];

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <StyledSelect id="category" value={value} onChange={handleSelectTime}>
        <option value="">선택</option>
        {avlRezTime.map((item) => (
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

export default SelectTime;

const StyledSelect = styled('select')(({ theme }) => ({
  padding: '16px 14px',
  display: 'flex',
  width: '100%',
  flexGrow: 1,
  height: '56px',
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
