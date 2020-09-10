import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  cardHeader: {
    ...theme.custom.borders,
    borderBottomWidth: 1,
  },
  displayName: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
    textDecoration: 'none',

    '&:hover': {
      color: theme.palette.primary.main,
      transition: 'color 0.25s ease',
    },
  },
  header: {
    alignItems: 'center',
    display: 'flex',
  },
  list: {
    '& li': {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,

      '&:last-child': {
        borderBottom: 'none',
      },
    },
  },
  listItemAvatar: {
    marginRight: theme.spacing(2),
    minWidth: 'auto',
  },
  noPosts: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  refreshButton: {
    color: theme.palette.text.primary,
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
  },
  root: {
    ...theme.custom.borders,
    backgroundColor: theme.palette.grey[50],
    borderWidth: 1,
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
  },
}));

export default useStyles;
