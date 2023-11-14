import styled from '@emotion/styled';
import { Chip } from '@mui/material';

const Tag = ({ text, isHashTag, sx }) => {
  const label = (isHashTag ? '#' : '') + text;
  return <StyledChip label={label} sx={sx} />;
};

export default Tag;

const StyledChip = styled(Chip)(({ theme, sx }) => ({
  backgroundColor: theme.palette.grey['700'],
  color: theme.palette.common.white,
  ...sx
}));
