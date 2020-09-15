import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  avatarContainer: {
    marginRight: theme.spacing(2),
  },
  contentContainer: {
    display: 'flex',
  },
  iconButtonRoot: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    display: 'none',
    height: 45,
    padding: 0,
    width: 45,

    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },

    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  input: {
    padding: theme.spacing(2, 0),
  },
  inputContainer: {
    flexGrow: 1,
  },
  postButtonContainer: {
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
    },
  },
  postButtonLarge: {
    marginTop: theme.spacing(2),
    width: '90%',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export default useStyles;
