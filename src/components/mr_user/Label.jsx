import styled from '@emotion/styled';

const Label = ({ htmlFor, text }) => {
  return <StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>;
};

export default Label;

const StyledLabel = styled('label')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightBold
}));
