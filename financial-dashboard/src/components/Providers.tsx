"use client";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { muiTheme } from "@/styles/muiTheme";
import GlobalStyles from "@/styles/GlobalStyles";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SCThemeProvider theme={theme}>
      <MuiThemeProvider theme={muiTheme}>
        <GlobalStyles />
        {children}
      </MuiThemeProvider>
    </SCThemeProvider>
  );
}
