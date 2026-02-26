import { createTheme } from "@mui/material/styles";
import { theme } from "./theme";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.brand[500],
      light: theme.colors.brand[100],
      dark: theme.colors.brand[700],
    },
    error: {
      main: theme.colors.error[500],
    },
    success: {
      main: theme.colors.success[500],
    },
    warning: {
      main: theme.colors.warning[500],
    },
    background: {
      default: theme.colors.gray[50],
      paper: theme.colors.white,
    },
  },
  typography: {
    fontFamily: theme.fonts.outfit,
  },
  shape: {
    borderRadius: 8,
  },
});
