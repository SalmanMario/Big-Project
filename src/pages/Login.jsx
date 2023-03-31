import { Alert, Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import classes from "./login.module.css";
import { Stack } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import { UserLogin } from "../services/auth/login";
import { headers } from "../services/utils";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState("");

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordText, setErrorPasswordText] = useState("");

  const loginAction = (e) => {
    e.preventDefault();
    let payload = {
      email: email,
      password: password,
    };

    console.log(payload);
    UserLogin(payload)
      .then((r) => {
        localStorage.setItem("token", r.data.token);
        headers["Authorization"] = `Bearer ${r.data.token}`;
        navigate("/mainpage");
      })
      .catch((e) => {
        console.log(e);
      });

    if (email === "") {
      setErrorEmail(true);
      setErrorEmailText("Enter email");
    }
    if (password === "") {
      setErrorPassword(true);
      setErrorPasswordText("Enter password");
    }
  };

  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };

  return (
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
        value={email}
        error={errorEmail}
        helperText={errorEmailText}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
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
        value={password}
        error={errorPassword}
        helperText={errorPasswordText}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        onClick={(e) => {
          loginAction(e);
        }}
        variant="contained"
      >
        Login
      </Button>
      <Button onClick={goToRegister} variant="contained">
        Create Account
      </Button>
    </Stack>
  );
}
