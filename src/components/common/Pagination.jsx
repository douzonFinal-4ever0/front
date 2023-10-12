import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Pagination = ({ count, page, handleChange }) => {
  return (
    <Stack spacing={2}>
      <MuiPagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default Pagination;
