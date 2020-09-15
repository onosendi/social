import React from 'react';
import { useDispatch } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Alert from '@material-ui/lab/Alert';

// Local
import CircularProgress from '../../components/CircularProgress';
import PageTitle from '../../components/PageTitle';
import TextLink from '../../components/TextLink';

import { route } from '../../constants';

import useUI from '../../hooks/useUI';

import { createUser, key } from '../../redux/user';

import { isEmpty } from '../../utils';

import useStyles from './styles';

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { errors, loading } = useUI(key.createUser, null, false);

  const [formData, setFormData] = React.useState({
    email: '',
    name: '',
    password: '',
    password2: '',
    username: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser(formData));
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <PageTitle title="Register" />

      <Container className={classes.container}>
        <Card>
          <CardContent>
            {!isEmpty(errors)
              && (
                <Alert
                  className={classes.alert}
                  severity="error"
                >
                  Your form contains errors
                </Alert>
              )}
            <Typography
              className={classes.toUpper}
              color="primary"
              variant="h6"
            >
              Register
            </Typography>
            <form
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
                id="login"
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
                helperText={errors.email}
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
                type="email"
                value={formData.email}
              />
              <TextField
                autoComplete="new-password"
                className={classes.formField}
                error={Boolean(errors.password)}
                fullWidth
                helperText={errors.password}
                id="password"
                label="Password"
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
                id="password2"
                label="Confirm password"
                name="password2"
                onChange={handleChange}
                type="password"
                value={formData.password2}
              />
              <Button
                className={classes.button}
                color="primary"
                disabled={loading}
                fullWidth
                type="submit"
                variant="contained"
              >
                Register
                {loading && <CircularProgress />}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography className={classes.login}>
          Already a member?
          {' '}
          <TextLink to={route.login}>Login</TextLink>
          .
        </Typography>
      </Container>
    </>
  );
};

export default Register;
