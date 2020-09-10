import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  adornment: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing(1.3),
  },
  avatar: {
    alignSelf: 'flex-start',
  },
  input: {
    paddingRight: 0,
  },
  notchedOutline: {
    borderColor: theme.palette.grey[300],
  },
  replyForm: {
    alignItems: 'center',
    display: 'flex',
  },
  textField: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;
