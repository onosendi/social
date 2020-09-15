import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.custom.borders,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    display: 'flex',
    padding: theme.spacing(1, 2),
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
}));

export default useStyles;
