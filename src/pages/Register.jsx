import { Button, createTheme, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { green } from "@mui/material/colors";

export function Register() {
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
  const goToLogin = () => {
    navigate("/");
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
          Register
        </Typography>
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          required
          type="email"
          id="email"
          variant="outlined"
          label="Email"
          placeholder="gigel@yahoo.com"
        ></TextField>
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          required
          type="email"
          id="confirmEmail"
          variant="outlined"
          label="Confirm Email"
          placeholder="gigel@yahoo.com"
        ></TextField>
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          required
          type="password"
          id="password"
          variant="outlined"
          label="Password"
          placeholder="************"
        ></TextField>
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          required
          type="password"
          id="confirmPassword"
          variant="outlined"
          label="Confirm Password"
          placeholder="************"
        ></TextField>
        <Button variant="contained">Submit</Button>
        <Button onClick={goToLogin} variant="contained">
          Go back
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
