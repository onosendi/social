import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  root: {
    height: (size) => size,
    width: (size) => size,
  },
}));

export default useStyles;
