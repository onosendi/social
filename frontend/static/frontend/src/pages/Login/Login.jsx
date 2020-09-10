import React from 'react';
import { useDispatch } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Alert from '@material-ui/lab/Alert';

// Local
import CircularProgress from '../../components/CircularProgress';
import PageTitle from '../../components/PageTitle';
import TextLink from '../../components/TextLink';

import { route } from '../../constants';

import useUI from '../../hooks/useUI';

import { key, loginUser } from '../../redux/user';

import { isEmpty } from '../../utils';

import useStyles from './styles';

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { errors, loading } = useUI(key.login, null, false);

  const [formData, setFormData] = React.useState({
    login: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleChange = (event) => {
    const value = event.target.type !== 'checkbox'
      ? event.target.value
      : event.target.checked;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  return (
    <>
      <PageTitle title="Login" />

      <Container className={classes.container}>
        <Card>
          <CardContent>
            {!isEmpty(errors)
              && (
                <Alert
                  className={classes.alert}
                  severity="error"
                >
                  Invalid username/email or password
                </Alert>
              )}
            <Typography
              className={classes.toUpper}
              color="primary"
              variant="h6"
            >
              Login
            </Typography>
            <form
              onSubmit={handleSubmit}
              noValidate
            >
              <TextField
                autoComplete="email"
                className={classes.formField}
                error={!isEmpty(errors)}
                fullWidth
                id="login"
                label="Username or email"
                name="login"
                onChange={handleChange}
                type="text"
                value={formData.login}
              />
              <TextField
                autoComplete="current-password"
                className={classes.formField}
                error={!isEmpty(errors)}
                fullWidth
                id="password"
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
                value={formData.password}
              />
              <FormControlLabel
                className={classes.formField}
                control={(
                  <Switch
                    checked={formData.rememberMe}
                    color="primary"
                    name="rememberMe"
                    onChange={handleChange}
                  />
                )}
                label="Remember me"
              />
              <Button
                className={classes.button}
                color="primary"
                fullWidth
                disabled={loading}
                type="submit"
                variant="contained"
              >
                Login
                {loading && <CircularProgress />}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography className={classes.register}>
          Not a member?
          {' '}
          <TextLink to={route.register}>Register</TextLink>.
        </Typography>
      </Container>
    </>
  );
};

export default Login;
