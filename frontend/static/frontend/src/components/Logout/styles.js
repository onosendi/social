import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  menuItem: {
    borderColor: theme.palette.grey[200],
    borderStyle: 'solid',
    borderTopWidth: 1,
  },
}));

export default useStyles;
