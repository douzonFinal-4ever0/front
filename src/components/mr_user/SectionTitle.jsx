import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';

const SectionTitle = ({ title, children, sx }) => {
  return (
    <Stack direction={'row'} sx={{ alignItems: 'center' }}>
      {children}
      <StyledTItle children={children} sx={sx}>
        {title}
      </StyledTItle>
    </Stack>
  );
};

export default SectionTitle;

const StyledTItle = styled(Typography)(({ theme, sx }) => ({
  marginLeft: '4px',
  fontSize: '20px',
  fontWeight: theme.typography.fontWeightBold,
  ...sx
}));
