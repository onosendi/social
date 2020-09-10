import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputInput: {
    color: 'inherit',
    padding: theme.spacing(1, 2, 1, 1.5),
    flexGrow: 1,
  },
  root: {
    margin: theme.spacing(0.75, 0, 2, 0),
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  inputRoot: {
    flexGrow: 1,
  },
  searchContainer: {
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.custom.border.color,
    borderStyle: theme.custom.border.style,
    borderWidth: 1,
    display: 'flex',
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  searchFocus: {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.primary.main,
  },
  searchIcon: {
    color: theme.palette.grey[400],
  },
  searchIconFocus: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
