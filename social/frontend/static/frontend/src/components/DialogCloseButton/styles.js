import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  button: {
    margin: theme.spacing(0, 0.5, 0, -1.5),
  },
}));

export default useStyles;
