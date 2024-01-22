import React, { useState } from 'react';
import { Box, Avatar, Typography, Container, Grid, Stack, InputAdornment, IconButton, useTheme } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

import FormattedMessage from 'components/FormattedMessage';
import { openSnackbar } from 'redux/slice/snackbar.slice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { authSelector } from 'redux/slice/auth.slice';
import { FormProvider, Input } from 'components/Form';
import { loginSchema } from 'libs/yup/login.schema';
import { login } from 'redux/thunk/auth.thunk';
import { routes } from 'navigations/routes';
import { LoginRequest } from 'types/user';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useAppSelector(authSelector);

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = async (values: LoginRequest) => {
    await dispatch(login(values));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Login succesfully',
        variant: 'alert',
        close: true,
        alert: { color: 'success' },
      }),
    );
    navigate(routes.Dashboard.path);
  };

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
          <FormattedMessage id="LOGIN" />
        </Typography>
        <FormProvider<LoginRequest>
          form={{
            defaultValues: {
              username: '',
              password: '',
            },
            resolver: yupResolver(loginSchema),
          }}
          onSubmit={onSubmit}>
          <Grid item container gap={3}>
            <Grid item xs={12}>
              <Input
                name="username"
                placeholder="username"
                textFieldProps={{
                  size: 'medium',
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="password"
                placeholder="password"
                textFieldProps={{
                  size: 'medium',
                  type: showPassword ? 'text' : 'password',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(prev => !prev)}
                          edge="end"
                          size="small">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" sx={{ mt: '35px' }}>
            <LoadingButton
              sx={{ background: '#036AFF' }}
              loading={loading[login.typePrefix]}
              variant="contained"
              size="large"
              type="submit"
              fullWidth>
              Login
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default Login;
