import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const Searchbar = (props) => {
  const {
    placeholder,
    value,
    handleInputChange,
    handleSearchBtnClick,
    inputHeight
  } = props;

  return (
    <StyledSearchbar
      component="form"
      onSubmit={handleSearchBtnClick}
      height={inputHeight}
    >
      <StyledInput
        placeholder={placeholder}
        inputProps={{ 'aria-label': '검색' }}
        value={value}
        onChange={handleInputChange}
        inputHeight={inputHeight}
      />
      <IconButton
        type="submit"
        sx={{ p: '10px', cursor: 'pointer' }}
        aria-label="search"
      >
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

const StyledInput = styled(TextField)(({ theme, inputHeight }) => ({
  '& .MuiInputBase-root': {
    border: 'none',
    backgroundColor: '#fff'
  },
  '& .MuiOutlinedInput-input': {
    padding: '0px 10px !important'
  },
  '&:hover fieldset, &:hover input': {
    border: 'none'
  },
  '& .Mui-focused fieldset': {
    border: 'none'
  }
}));

Searchbar.defaultProps = {
  inputHeight: '40px'
};
