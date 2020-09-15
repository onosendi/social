import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginBottom: theme.spacing(2),
  },
  buttonAvatar: {
    cursor: 'pointer',
    marginRight: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  follow: {
    color: theme.palette.text.secondary,
    '&:last-child': {
      marginLeft: theme.spacing(2),
    },
  },
  followContainer: {
    display: 'flex',
    padding: theme.spacing(0, 2),
  },
  followCount: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
  list: {
    width: 250,
  },
  logout: {
    borderTopColor: theme.custom.border.color,
    borderTopStyle: theme.custom.border.style,
    borderTopWidth: 1,
  },
  title: {
    flexGrow: 1,
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomColor: theme.custom.border.color,
    borderBottomStyle: theme.custom.border.style,
    borderBottomWidth: 1,
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  userInfoContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
}));

export default useStyles;
