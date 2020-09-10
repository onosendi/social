import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  parentContainer: {
    backgroundColor: theme.palette.grey[50],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
}));

export default useStyles;
