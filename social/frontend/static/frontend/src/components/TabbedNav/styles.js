import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  root: {
    ...theme.custom.borders,
    display: 'flex',
    borderBottomWidth: 2,
  },
}));

export default useStyles;
