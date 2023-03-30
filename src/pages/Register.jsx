import { Button, createTheme, Grid, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axios from "axios";

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);

  const registerAction = (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    let payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    Register(payload)
      .then((r) => {
        setIsSubmiting(false);
        localStorage.setItem("token", r.data.token);
        navigate("/");
      })
      .catch((e) => {
        setIsSubmiting(false);
        if (e.response.data.errors != undefined) {
          setValidationErrors(e.response.data.errors);
        }
      });
  };

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
          type="text"
          id="firstName"
          variant="outlined"
          label="First Name"
          placeholder="Zeke"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></TextField>
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          required
          type="text"
          id="lastName"
          variant="outlined"
          label="Last Name"
          placeholder="Samson"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></TextField>
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
          placeholder="azazel@yahoo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></TextField>
        <Button onClick={(e) => registerAction(e)} variant="contained">
          Submit
        </Button>
        <Button onClick={goToLogin} variant="contained">
          Go back
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
