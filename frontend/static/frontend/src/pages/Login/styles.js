import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  alert: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: 50,
    maxWidth: 450,
  },
  formField: {
    marginTop: theme.spacing(2),
  },
  register: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  }
}));

export default useStyles;
