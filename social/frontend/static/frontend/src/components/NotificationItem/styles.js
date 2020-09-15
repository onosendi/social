import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
  },
  headerItem: {
    marginLeft: 4,

    '&:first-child': {
      marginLeft: 0,
    },
  },
  notification: {
    flexGrow: 1,
  },
  removeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  root: {
    borderBottomWidth: 1,
    borderColor: theme.custom.border.color,
    borderStyle: theme.custom.border.style,
    borderWidth: 0,
    display: 'flex',
    padding: theme.spacing(2),
    position: 'relative',
  },
}));

export default useStyles;
