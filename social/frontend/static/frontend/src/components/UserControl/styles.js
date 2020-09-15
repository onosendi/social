import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  button: {
    height: 55,
    minWidth: 55,
    padding: 10,
    width: 45,

    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },

    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.1),
    },
  },
  container: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
      display: 'flex',
      textAlign: 'left',
      padding: 10,
      width: '100%',
    },
  },
  displayName: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  menuHeader: {
    alignItems: 'center',
    display: 'flex',
    textAlign: 'left',
    padding: 10,
  },
  text: {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 1.4,
  },
  userAndSlug: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    margin: theme.spacing(0, 2, 0, 1),
  },
}));

export default useStyles;
