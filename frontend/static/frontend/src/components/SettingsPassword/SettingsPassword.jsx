import React from 'react';
import { useDispatch } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Alert from '@material-ui/lab/Alert';

// Local
import CircularProgress from '../CircularProgress';

import useUI from '../../hooks/useUI';

import { editPassword, key } from '../../redux/user';

import useStyles from './styles';

const SettingsPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    currentPassword: '',
    password: '',
    password2: '',
  });

  const { errors, loading } = useUI(key.editPassword, null, false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editPassword(formData));
  };

  return (
    <div>
      <Alert
        className={classes.alert}
        severity="warning"
      >
        You will be automatically logged out of your session.
      </Alert>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          autoComplete="current-password"
          className={classes.formField}
          error={Boolean(errors.current_password)}
          fullWidth
          helperText={errors.current_password}
          id="password"
          label="Current password"
          name="currentPassword"
          onChange={handleChange}
          type="password"
          value={formData.currentPassword}
        />
        <TextField
          autoComplete="new-password"
          className={classes.formField}
          error={Boolean(errors.password)}
          fullWidth
          helperText={errors.password}
          id="new-password"
          label="New password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formData.password}
        />
        <TextField
          autoComplete="new-password"
          className={classes.formField}
          error={Boolean(errors.password2)}
          fullWidth
          helperText={errors.password2}
          id="new-password2"
          label="Confirm new password"
          name="password2"
          onChange={handleChange}
          type="password"
          value={formData.password2}
        />
        <Button
          className={`${classes.formField} ${classes.submit}`}
          color="primary"
          disabled={loading}
          type="submit"
          variant="contained"
        >
          Save
          {loading && <CircularProgress />}
        </Button>
      </form>
    </div>
  );
};

export default SettingsPassword;
