import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

// Material UI
import Snackbar from '@material-ui/core/Snackbar';

import Alert from '@material-ui/lab/Alert';

// Local
import { unsetToast } from '../../redux/ui';

const Toast = ({ message, severity }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(unsetToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        onClose={handleClose}
        severity={severity}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

Toast.defaultProps = {
  severity: 'success',
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf([
    'error',
    'info',
    'success',
    'warning',
  ]),
};

export default Toast;
