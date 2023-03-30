import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import classes from "./login.module.css";
import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserLogin } from "../services/auth/login";
import { headers } from "../services/utils";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);

  const loginAction = (e) => {
    setValidationErrors({});
    e.preventDefault();
    setIsSubmiting(true);
    let payload = {
      email: email,
      password: password,
    };
    console.log(payload);
    UserLogin(payload)
      .then((r) => {
        setIsSubmiting(false);
        localStorage.setItem("token", r.data.token);
        headers["Authorization"] = `Bearer ${r.data.token}`;
        navigate("/mainpage");
      })
      .catch((e) => {
        setIsSubmiting(false);
        if (e.response.data.errors != undefined) {
          setValidationErrors(e.response.data.erros);
        }
        if (e.response.data.error != undefined) {
          setValidationErrors(e.response.data.error);
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
  const goToRegister = () => {
    navigate("/register");
  };

  const goToMainPage = () => {
    navigate("/mainpage");
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
        <Button onClick={goToMainPage} variant="contained">
          MAIN PAGE BUTTON
        </Button>
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
    </ThemeProvider>
  );
}
