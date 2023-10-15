import * as React from 'react';

import { Button, Checkbox, Paper, styled } from '@mui/material';
import { useState } from 'react';

const DashBoard = () => {
  return <Item></Item>;
};

export default DashBoard;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera'
  }
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%',
  margin: '1%'
}));
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});
const daysOfWeek = ['월', '화', '수', '목', '금', '토'];
