import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

const Progress = ({ open, handleClose }) => {
  return (
    <Backdrop
      sx={{ color: '#eee', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '40px',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ color: '#fff' }}>
          최적의 회의실 탐색 중.. 🧐
        </Typography>
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  );
};

export default Progress;
