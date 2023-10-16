import styled from '@emotion/styled';

const PageTitle = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default PageTitle;

const StyledTitle = styled('h3')(({ theme }) => ({
  margin: 0,
  fontSize: '28px',
  fontWeight: theme.typography.fontWeightBold
}));
