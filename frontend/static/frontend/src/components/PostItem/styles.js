import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  avatarContainer: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10,
  },
  cardActionsRoot: {
    paddingTop: 0,
  },
  likeContainer: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
  },
  post: {
    width: '100%',
  },
  postAction: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
  },
  postContainer: {
    display: 'flex',
    padding: theme.spacing(2, 2, 0.5, 2),
  },
  repeatIcon: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 3,
  },
  replyContent: {
    paddingBottom: `${theme.spacing(2)}px !important`,
  },
  root: {
    ...theme.custom.borders,
    borderBottomWidth: 1,
    position: 'relative',
  },
}));

export default useStyles;
