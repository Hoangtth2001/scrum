import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';

const ErrorBoundary: React.FC = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid2
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: 150,
            lineHeight: '150px',
            fontWeight: 700,
            color: '#252932',
            textShadow:
              'rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;fontSize: 150',
          }}
          align="center"
          variant={mobileDevice ? 'h4' : 'h1'}
          color="textPrimary">
          404
        </Typography>
        <Typography align="center" variant="subtitle2" color="textSecondary">
          Sorry, page not found
        </Typography>
        <Box mt={6} display="flex" justifyContent="center">
          <Button color="secondary" component={Link} to="/" variant="outlined">
            Back to home
          </Button>
        </Box>
      </Container>
    </Grid2>
  );
};

export default ErrorBoundary;
