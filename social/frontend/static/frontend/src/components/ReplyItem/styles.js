import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
  control: {
  },
  text: {
    backgroundColor: theme.palette.grey[50],
    marginBottom: theme.spacing(0.25),
    padding: theme.spacing(0.5, 2),
  },
  textAndControl: {
    display: 'flex',
  },
  displayName: {
    marginRight: theme.spacing(1),
  },
  likeContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  textAndInteractContainer: {
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
