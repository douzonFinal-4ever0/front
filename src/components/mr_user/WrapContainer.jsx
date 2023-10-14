import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { PAGE_INNER_PADDING, BORDER_RADIUS } from '../../config';

const WrapContainer = ({ bgColor, children }) => {
  return <StyledContainer bgColor={bgColor}>{children}</StyledContainer>;
};

export default WrapContainer;

const StyledContainer = styled(Container)(({ theme, bgColor }) => ({
  padding: PAGE_INNER_PADDING,
  borderRadius: BORDER_RADIUS,
  backgroundColor: bgColor,
  [theme.breakpoints.up('md')]: {
    minWidth: '100%'
  }
}));
