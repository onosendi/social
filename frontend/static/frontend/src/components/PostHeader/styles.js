import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  header: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  headerAvatar: {
    marginRight: 4,
  },
  headerItem: {
    marginLeft: 4,

    '&:first-child': {
      marginLeft: 0,
    },
  },
}));

export default useStyles;
