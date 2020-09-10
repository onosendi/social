// Material UI
import red from '@material-ui/core/colors/red';
import { createMuiTheme, fade } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 520,
      md: 940,
      lg: 1260,
    },
  },

  palette: {
    primary: red,
  },

  props: {
    MuiAccordion: {
      square: true,
    },
    MuiDialog: {
      fullWidth: true,
    },
    MuiDialogTitle: {
      disableTypography: true,
    },
  },

  shape: {
    borderRadius: 15,
  },
});

//
// Custom styles
//
theme.custom = {
  border: {
    color: theme.palette.grey[300],
    style: 'solid',
  },
  borders: {
    borderColor: theme.palette.grey[300],
    borderStyle: 'solid',
    borderWidth: 0,
  },
};

//
// Overrides
//
theme.overrides = {
  MuiAccordion: {
    root: {
      ...theme.custom.borders,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderTop: 0,
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 0,
      },
    },
  },
  MuiAccordionSummary: {
    root: {
      ...theme.custom.borders,
      backgroundColor: theme.palette.grey[50],
      borderBottomWidth: 1,
      marginBottom: -1,
      minHeight: 'auto',
      '&$expanded': {
        minHeight: 'auto',
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
  },
  MuiButton: {
    contained: {
      boxShadow: 'none',
      '&:hover, &:focus': {
        boxShadow: 'none',
      },
      '&[disabled]': {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
        color: fade(theme.palette.primary.main, 0.5),
      },
    },
    root: {
      borderRadius: 9999,
      textTransform: 'normal',
    },
    sizeLarge: {
      lineHeight: 1,
      padding: theme.spacing(1.25, 3),
    },
    sizeSmall: {
      lineHeight: 1.5,
      padding: theme.spacing(0.5, 2),
    },
  },
  MuiCssBaseline: {
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
        height: '100%',
      },
      html: {
        height: '100%',
      },
    },
  },
  MuiDialogActions: {
    root: {
      padding: theme.spacing(2),
      '& > button': {
        padding: theme.spacing(1, 5),
      },
    },
  },
  MuiDialogContent: {
    dividers: {
      padding: theme.spacing(2),
    },
  },
  MuiDialogTitle: {
    root: {
      alignItems: 'center',
      display: 'flex',
      padding: theme.spacing(0.25, 2),
    },
  },
  MuiFilledInput: {
    root: {
      backgroundColor: theme.palette.grey[50],
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,

      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
    },
  },
  MuiListItemIcon: {
    root: {
      marginRight: 13,
      minWidth: 0,
    },
  },
  MuiMenu: {
    list: {
      padding: 0,
    },
  },
  MuiPaper: {
    elevation1: {
      boxShadow: 'none',
    },
    elevation24: {
      boxShadow: 'none',
    },
    root: {
      borderColor: theme.custom.borders.borderColor,
      borderStyle: 'solid',
      borderWidth: 1,
    },
  },
};

export default theme;
