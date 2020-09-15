import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  heading: {
    marginBottom: 0,
  },
}));

export default useStyles;
