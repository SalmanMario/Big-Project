import { createTheme, ThemeProvider } from "@mui/material";
import { palette } from "./palette";
export function ThemePalette({ children }) {
  const theme = createTheme({
    ...palette,
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
