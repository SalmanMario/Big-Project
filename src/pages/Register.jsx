import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { UserRegister } from "../services/auth/register";
import { Box } from "@mui/system";

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPaswordErrorText] = useState(false);

  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorText, setLastNameErrorText] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorText, setFirstNameErrorText] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState(false);

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };

  const registerAction = (e) => {
    e.preventDefault();
    let payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const emailRegex = /^[a-z0-9_.+%#-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    if (emailRegex.test(email) || password !== confirmPassword || confirmPassword !== password) {
      setEmailError(true);
      setEmailErrorText("Your email is invalid!");
      setPasswordError(true);
      setPaswordErrorText("Password is invalid or does not match!");
    } else {
      UserRegister(payload)
        .then((r) => {
          localStorage.setItem("token", r.data.token);
          navigate("/");
        })
        .catch((e) => {
          // if (e.response.data.errors != undefined) {
          // }
        });
    }
    if (password === "" && confirmPassword === "") {
      setPasswordError(true);
      setPaswordErrorText("Please enter a password");
    }
    if (firstName === "") {
      setFirstNameError(true);
      setFirstNameErrorText("Please enter your first name");
    } else if (firstName.length > 0) {
      setFirstNameError(false);
      setFirstNameErrorText(false);
    }
    if (lastName === "") {
      setLastNameError(true);
      setLastNameErrorText("Please enter your last name");
    } else if (lastName.length > 0) {
      setLastNameError(false);
      setLastNameErrorText(false);
    }
    if (email === "") {
      setEmailError(true);
      setEmailErrorText("Please enter a valid email");
    }
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
        error={firstNameError}
        helperText={firstNameErrorText}
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
        error={lastNameError}
        helperText={lastNameErrorText}
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
        error={emailError}
        helperText={emailErrorText}
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
        error={passwordError}
        helperText={passwordErrorText}
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
        error={passwordError}
        helperText={passwordErrorText}
        onChange={(e) => setConfirmPassword(e.target.value)}
      ></TextField>
      <Button
        onClick={(e) => {
          registerAction(e);
        }}
        variant="contained"
      >
        Submit
      </Button>
      <Button onClick={goToLogin} variant="contained">
        Go back
      </Button>
    </Stack>
  );
}
