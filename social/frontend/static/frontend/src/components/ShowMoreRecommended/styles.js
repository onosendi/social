import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    backgroundColor: 'transparent',
    borderTopColor: theme.custom.border.color,
    borderTopStyle: theme.custom.border.style,
    borderTopWidth: 1,
    color: theme.palette.primary.main,
    display: 'block',
    padding: theme.spacing(1),
    textAlign: 'center',
    textDecoration: 'none !important',

    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[100],
      outline: 'none',
    },
  },
}));

export default useStyles;
