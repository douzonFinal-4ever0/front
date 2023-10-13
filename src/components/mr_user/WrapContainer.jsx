import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { PAGE_INNER_PADDING, BORDER_RADIUS } from '../../config';

const WrapContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default WrapContainer;

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: PAGE_INNER_PADDING,
  borderRadius: BORDER_RADIUS,
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    minWidth: '100%'
  }
}));
