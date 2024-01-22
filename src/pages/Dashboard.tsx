import React from 'react';
import { Box, useTheme, Avatar, Typography, Container, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import FormattedMessage from 'components/FormattedMessage';
import { logout } from 'redux/slice/auth.slice';
import { useAppDispatch } from 'hooks';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage id="DASHBOARD" />
        </Typography>
      </Box>
      <Button
        onClick={() => dispatch(logout())}
        sx={{ background: '#036AFF' }}
        variant="contained"
        size="large"
        fullWidth>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
