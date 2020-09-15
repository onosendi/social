import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Local
import CircularProgress from '../CircularProgress';

import useUI from '../../hooks/useUI';

import { editUser, key, selectUser } from '../../redux/user';

import useStyles from './styles';

const SettingsAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [formData, setFormData] = React.useState({
    email: user.email,
    name: user.name,
    username: user.username,
  });

  const { errors, loading } = useUI(key.editUser, null, false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editUser(formData));
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <TextField
        autoComplete="name"
        className={classes.formField}
        error={Boolean(errors.name)}
        fullWidth
        helperText={errors.name}
        id="name"
        label="Name"
        name="name"
        onChange={handleChange}
        type="text"
        value={formData.name}
      />
      <TextField
        autoComplete="username"
        className={classes.formField}
        error={Boolean(errors.username)}
        fullWidth
        helperText={errors.username}
        id="username"
        label="Username"
        name="username"
        onChange={handleChange}
        type="text"
        value={formData.username}
      />
      <TextField
        autoComplete="email"
        className={classes.formField}
        error={Boolean(errors.email)}
        fullWidth
        id="email"
        helperText={errors.email}
        label="Email"
        name="email"
        onChange={handleChange}
        type="text"
        value={formData.email}
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
  );
};

export default SettingsAccount;
