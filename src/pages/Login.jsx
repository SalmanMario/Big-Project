import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Login() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4caf50",
        contrastText: "#fff",
      },
      secondary: {
        main: "#d50000",
      },
    },
    typography: {
      button: {
        marginBottom: "0.5rem",
        marginTop: "1rem",
        fontFamily: "Montserrat",
        fontWeight: 700,
      },
    },
  });

  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h3">Login</Typography>
        <TextField
          InputLabelProps={{ style: { color: "#00e676", fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 } }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2 }}
          required
          type="email"
          id="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          InputLabelProps={{ style: { color: "#00e676", fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 } }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2 }}
          required
          type="password"
          id="password"
          label="Password"
          variant="outlined"
        />
        <Button variant="contained">Login</Button>
        <Button onClick={goToRegister} variant="contained">
          Create Account
        </Button>
      </Box>
    </ThemeProvider>
  );
}
