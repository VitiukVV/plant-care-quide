import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container>
      {/* Developer 1's block */}
      <Box component="section" sx={{ mb: 2 }}>
        <Typography variant="h1"></Typography>
      </Box>

      {/* Developer 2's block */}
      <Box component="section" sx={{ mb: 2 }}>
        <Typography variant="h1"></Typography>
      </Box>
    </Container>
  );
};

export default Home;
