import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const Searchbar = (props) => {
  const { placeholder, value, handleInputChange, handleSearchBtnClick } = props;

  return (
    <StyledSearchbar component="form" onSubmit={handleSearchBtnClick}>
      <StyledInput
        placeholder={placeholder}
        inputProps={{ 'aria-label': '검색' }}
        value={value}
        onChange={handleInputChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </StyledSearchbar>
  );
};

export default Searchbar;

const StyledSearchbar = styled(Box)(({ theme }) => ({
  padding: '2px 4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.grey['500']}`,
  borderRadius: '2px',
  backgroundColor: theme.palette.common.white
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    border: 'none',
    backgroundColor: '#fff'
  },
  '&:hover fieldset, &:hover input': {
    border: 'none'
  },
  '& .Mui-focused fieldset': {
    border: 'none'
  }
}));
