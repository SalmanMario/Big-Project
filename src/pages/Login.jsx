import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import classes from "./login.module.css";
import { Stack } from "@mui/system";

export function Login() {
  const theme = createTheme({
    palette: {
      primary: {
        main: green["A400"],
        contrastText: "#fff",
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
      <Stack
        className={classes.loginPage}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, color: green["A400"] }} variant="h3">
          Login
        </Typography>
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          required
          type="email"
          id="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
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
      </Stack>
    </ThemeProvider>
  );
}
