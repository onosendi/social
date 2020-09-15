import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  avatarContainer: {
    alignSelf: 'flex-start',
  },
  submitButtonContainer: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing(1),
  },
  inputBaseRoot: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(1.75),
  },
  postForm: {
    alignItems: 'center',
    display: 'flex',
    overflow: 'hidden',
  },
  root: {
    ...theme.custom.borders,
    borderBottomWidth: 10,
    padding: theme.spacing(2),
  },
  submitButton: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  textField: {
    flexGrow: 1,
    margin: theme.spacing(0, 3, 0, 2),
  },
}));

export default useStyles;
