import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { PAGE_INNER_PADDING } from '../../config';

const MainContainer2 = ({ children }) => {
  return <StyledMain component="main">{children}</StyledMain>;
};

export default MainContainer2;

const StyledMain = styled(Box)(({ theme }) => ({
  padding: PAGE_INNER_PADDING,
  width: '100%'
}));
