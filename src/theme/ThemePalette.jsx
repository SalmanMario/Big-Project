import { createTheme } from "@mui/material";
import { palette } from "./palette";
import { ThemeProvider } from "@emotion/react";
export function ThemePalette({ children }) {
  const theme = createTheme({
    ...palette,
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
