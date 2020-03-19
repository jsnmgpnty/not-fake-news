import { createMuiTheme } from '@material-ui/core/styles';
import themeColors from './lib/themeColors';

const AppTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Myriad', 'Helvetica Neue', 'Lucida Console'],
    fontSize: 14,
    fontWeightLight: 100,
    fontWeightMedium: 200,
    fontWeightRegular: 200,
    fontWeightBold: 200,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: themeColors.red,
      },
    },
    MuiToolbar: {
      root: {
        backgroundColor: themeColors.red,
      },
      regular: {
        backgroundColor: themeColors.red,
      },
    },
    MuiInput: {
      root: {
        backgroundColor: themeColors.white,
        color: themeColors.gray800,
      },
      underline: {
        '&:after': {
          borderBottom: `2px solid ${themeColors.green}`,
        },
      },
    },
    MuiAppBar: {
      root: {
        zIndex: 1000,
        backgroundColor: themeColors.white,
        color: themeColors.gray200,
      },
    },
    MuiInputLabel: {
      root: {
        color: themeColors.white,
      },
      animated: {
        color: themeColors.gray800,
        zIndex: 1000,
        '&$focused': {
          color: themeColors.white,
          zIndex: 0,
        },
        '&$shrink': {
          color: themeColors.white,
          zIndex: 0,
        },
      },
      formControl: {
        color: themeColors.white,
        zIndex: 0,
        '&$focused': {
          color: themeColors.gray200,
        },
        focused: {},
        '&$disabled': {
          color: themeColors.gray400,
        },
        disabled: {},
      },
    },
    MuiFormLabel: {
      root: {
        color: themeColors.gray800,
        padding: '0 0.5rem',
      },
    },
    MuiInputBase: {
      input: {
        backgroundColor: themeColors.white,
        padding: '0.375rem 0.5rem',
        borderRadius: '0.5rem',
      },
    },
    MuiInputAdornment: {
      root: {
        margin: '0 0.5rem',
        padding: 0,
      },
    },
    MuiButton: {
      root: {
        colors: themeColors.white,
        borderRadius: '2rem',
      },
      flat: {
        color: themeColors.white,
      },
      text: {
        color: themeColors.white,
      },
      containedPrimary: {
        color: themeColors.white,
        backgroundColor: themeColors.primaryColor,
      },
      containedSecondary: {
        color: themeColors.white,
        backgroundColor: themeColors.secondaryColor,
      },
    },
    MuiPickersCalendarHeader: {
    },
    MuiPickersModal: {
      dialogAction: {
        color: themeColors.secondaryColor,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: themeColors.gray800,
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
      },
    },
  },
  palette: {
    primary: {
      main: themeColors.primaryColor,
      dark: themeColors.primaryColor,
      contrastText: themeColors.white,
    },
    secondary: {
      main: themeColors.secondaryColor,
      dark: themeColors.secondaryColor,
      contrastText: themeColors.white,
    },
    type: 'dark'
  },
});

export default AppTheme;
