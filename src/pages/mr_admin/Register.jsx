import React from 'react';
import Pagination from '../../components/common/Pagination';
import { useState } from 'react';
import TimeField from '../../components/common/TimeField';
import { Stack, display } from '@mui/system';
import { Container, Grid, Paper, styled, Box } from '@mui/material';
import Calendar from '../../components/common/Calendar';
import SubSidebar from '../../components/common/SubSidebar';
import SubHeader from '../../components/common/SubHeader';

function Register() {
  return (
    <Item>
      <SubHeader title={'회의실 예약 상황'} />
      <Box sx={{ display: 'flex' }}>
        <SubSidebar />
        <Container>
          <Grid spacing={2}>
            <TimeField withMonth={false} label={'start-time'} />
            <TimeField withMonth={false} label={'end-time'} />
          </Grid>
          <Calendar />
        </Container>
      </Box>
    </Item>
  );
}

export default Register;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%',
  padding: '10px'
}));
