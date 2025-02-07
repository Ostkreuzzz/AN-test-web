import { Typography, Container } from '@mui/material';

export const NotFound: React.FC = () => {
  return (
    <Container maxWidth='md' sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant='h5'>Page not found</Typography>
    </Container>
  );
};
