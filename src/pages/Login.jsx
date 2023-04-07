import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import classes from "./login.module.css";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import { useForm } from "../hooks/useForm";

export function Login() {
  const { user, login } = useAuthContext();
  const navigate = useNavigate();
  const { formValues, registerField } = useForm({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    setServerError("");

    login(formValues)
      .then(() => {
        navigate("/mainpage");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          {...registerField("email")}
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
          {...registerField("password")}
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
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Button onClick={goToRegister} variant="contained">
          Create Account
        </Button>
      </Box>
    </Stack>
  );
}
