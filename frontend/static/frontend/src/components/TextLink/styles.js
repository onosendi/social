import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    fontWeight: (bold) => (bold ? 'bold' : 'normal'),
    textDecoration: 'none',
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  },
}));

export default useStyles;
