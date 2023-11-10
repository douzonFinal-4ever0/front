import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// -------------------------------------------------------------
import styled from '@emotion/styled';
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
// -------------------------------------------------------------
import { setRezData } from '../../../redux/reducer/mrUserSlice';
import { setMrRecommendData } from '../../../redux/reducer/MrRecommendSlice';
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import SubHeader from '../../../components/common/SubHeader';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SectionTitle from '../../../components/mr_user/SectionTitle';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { palette } from '../../../theme/palette';
import RezInfo from './section/RezInfo';

const MrRezConfirmPage = () => {
  const rezData = useSelector(setRezData).payload.mrUser;
  const mrRecommendData = useSelector(setMrRecommendData).payload.mrRecommend;
  const {
    m_name,
    rez_date,
    rez_end_time,
    rez_start_time,
    mr_pt_list,
    mr_code
  } = rezData;
  const { list } = mrRecommendData;
  const mr = list.filter((item) => item.mr_code === mr_code);
  const { mr_name, location } = mr[0];

  return (
    <>
      <SubHeader title="회의실 예약" />
    </>
  );
};

export default MrRezConfirmPage;

const StyledDoneIcon = styled(CheckCircleRoundedIcon)(({ theme }) => ({
  width: '60px',
  height: '60px',
  color: theme.palette.primary.main
}));

const StyledDoneTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 'bold'
}));

const StyledDoneText = styled(Typography)(({ theme }) => ({
  marginTop: '20px',
  display: 'flex',
  textAlign: 'center',
  color: '#777'
}));

const StyledLink = styled(Link)(({ theme }) => ({
  padding: '8px 14px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  backgroundColor: theme.palette.grey['500'],
  fontWeight: 'bold',
  // fontSize: '18px',
  color: '#fff',
  textDecoration: 'none'
}));

const StyledLinkOutline = styled(StyledLink)(({ theme }) => ({
  backgroundColor: '#fff',
  border: `2px solid ${theme.palette.grey['500']}`,
  color: theme.palette.grey['500']
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold'
}));

const StyledStepText = styled(Typography)(({ theme }) => ({
  paddingBottom: '6px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderBottom: '3px solid black'
}));
