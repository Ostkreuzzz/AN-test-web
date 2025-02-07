import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

export default function LoadingCircular() {
  return (
    <Container maxWidth='md' sx={{ textAlign: 'center', mt: 5 }}>
      <CircularProgress color='inherit' size='3rem' />
    </Container>
  );
}
