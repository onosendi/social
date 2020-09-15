import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  avatar: {
    marginRight: theme.spacing(1),
  },
  displayName: {
    fontWeight: 'bold',
    marginBottom: 0,
  },
  followButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
  userList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  userListItem: {
    ...theme.custom.borders,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    position: 'relative',
  },
  listItemText: {
    marginTop: 0,
    marginBottom: 0,
  },
  slug: {
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
