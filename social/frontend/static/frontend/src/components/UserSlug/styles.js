import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.custom,
  followsYou: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    fontSize: '12px',
    marginLeft: 8,
    padding: '2px 10px',
  },
  userSlug: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
  },
}));

export default useStyles;
