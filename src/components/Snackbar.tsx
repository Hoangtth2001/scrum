import React, { SyntheticEvent } from 'react';
import { Alert, Button, Fade, Grow, IconButton, Slide, SlideProps, Snackbar as MuiSnackbar } from '@mui/material';
import { Close } from '@mui/icons-material';

import { snackbarSelector, closeSnackbar } from 'redux/slice/snackbar.slice';
import { useAppDispatch, useAppSelector } from 'hooks';
import FormattedMessage from './FormattedMessage';

const TransitionSlideLeft = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

const TransitionSlideUp = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

const TransitionSlideRight = (props: SlideProps) => {
  return <Slide {...props} direction="right" />;
};

const TransitionSlideDown = (props: SlideProps) => {
  return <Slide {...props} direction="down" />;
};

const GrowTransition = (props: SlideProps) => {
  return <Grow {...props} />;
};

const animation: { [key: string]: (props: SlideProps) => JSX.Element } = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade,
};

const Snackbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const matches = true;
  const { actionButton, anchorOrigin, alert, close, message, open, transition, variant } =
    useAppSelector(snackbarSelector);

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return variant === 'default' ? (
    <MuiSnackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={<FormattedMessage id={message} />}
      TransitionComponent={animation[transition]}
      action={
        <>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} sx={{ mt: 0.25 }}>
            <Close fontSize="small" />
          </IconButton>
        </>
      }
    />
  ) : variant === 'alert' ? (
    <MuiSnackbar
      TransitionComponent={animation[transition]}
      anchorOrigin={
        !matches
          ? {
              vertical: 'top',
              horizontal: 'center',
            }
          : anchorOrigin
      }
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}>
      <Alert
        variant={alert.variant}
        color={alert.color}
        severity={alert.color}
        action={
          <>
            {actionButton !== false && (
              <Button size="small" onClick={handleClose} sx={{ color: 'background.paper' }}>
                <FormattedMessage id="undo" />
              </Button>
            )}
            {close !== false && (
              <IconButton sx={{ color: 'background.paper' }} size="small" aria-label="close" onClick={handleClose}>
                <Close fontSize="small" />
              </IconButton>
            )}
          </>
        }
        sx={{
          ...(alert.variant === 'outlined' && {
            bgcolor: 'background.paper',
          }),
        }}>
        <FormattedMessage id={message} />
      </Alert>
    </MuiSnackbar>
  ) : null;
};

export default Snackbar;
