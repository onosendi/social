import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  root: {
    marginLeft: -5,
    marginRight: 10,
  },
}));

export default useStyles;
