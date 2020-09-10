import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  formField: {
    marginTop: theme.spacing(3),
    '&:first-child': {
      marginTop: theme.spacing(1),
    },
  },
  submit: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export default useStyles;
