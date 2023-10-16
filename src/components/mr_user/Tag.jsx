import styled from '@emotion/styled';
import { Chip } from '@mui/material';

const Tag = ({ text, isHashTag, bgColor }) => {
  const label = (isHashTag ? '#' : '') + text;
  return <StyledChip label={label} bgColor={bgColor} />;
};

export default Tag;

const StyledChip = styled(Chip)(({ theme, bgColor }) => ({
  borderRadius: '8px',
  backgroundColor: bgColor,
  color: theme.palette.common.white
}));
