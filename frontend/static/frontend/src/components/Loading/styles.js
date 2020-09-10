import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: (spacing) => theme.spacing(spacing),
  },
}));

export default useStyles;
