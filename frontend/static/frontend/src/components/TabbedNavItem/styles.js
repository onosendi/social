import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  root: {
    alignItems: 'center',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: (active) => (active
      ? theme.palette.primary.main
      : 'transparent'),
    borderRadius: 0,
    borderStyle: 'solid',
    color: (active) => (active
      ? theme.palette.primary.main
      : theme.palette.text.primary),
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing(1, 2),
    transitionDuration: theme.transitions.duration.short,
    transitionProperty: 'all',
    transitionTimingFunction: theme.transitions.easing.easeInOut,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
