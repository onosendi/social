import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  formField: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default useStyles;
