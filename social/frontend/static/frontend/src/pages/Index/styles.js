import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  asideContainer: {
    alignItems: 'center',
    backgroundColor: fade(theme.palette.primary.main, 0.8),
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),

    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / 2',
      gridRow: 1,
      height: '100%',
    },
  },
  asideList: {
    '& .MuiListItem-root': {
      alignItems: 'flex-start',
      color: theme.palette.common.white,
      display: 'flex',
    },
    '& .MuiTypography-root': {
      fontSize: 20,
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white,
      fontSize: 30,
      marginTop: theme.spacing(0.5),
    },
  },
  branding: {
    fontSize: 40,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      marginTop: 0,
    },
  },
  content: {
    maxWidth: 380,
  },
  ctaItem: {
    marginBottom: theme.spacing(2),
  },
  ctaContainer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
  indexLayout: {
    width: '100%',

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '50% 50%',
    },
  },
  mainContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    position: 'relative',

    [theme.breakpoints.up('md')]: {
      gridColumn: '2 / 2',
      gridRow: 1,
      height: '100%',
    },
  },
}));

export default useStyles;
