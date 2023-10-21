import styled from '@emotion/styled';

const Label = ({ htmlFor, text, sx }) => {
  return (
    <StyledLabel htmlFor={htmlFor} sx={sx}>
      {text}
    </StyledLabel>
  );
};

export default Label;

const StyledLabel = styled('label')(({ theme, sx }) => ({
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightBold,
  ...sx
}));
