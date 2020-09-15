import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    alignSelf: 'center',
  },
  textField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  form: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      maxWidth: 600,
      padding: theme.spacing(0, 2),
      position: 'absolute',
      top: theme.spacing(2),
      width: '100%',
    },
  },
}));

export default useStyles;
