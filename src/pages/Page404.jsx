import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column'
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Container sx={{ mt: 20 }}>
      <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography variant="h1" paragraph>
          404
        </Typography>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="div"
          sx={{ height: 10, mx: 'auto', my: { xs: 5, sm: 10 } }}
        />

        <Button to="/" size="large" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </StyledContent>
    </Container>
  );
}
