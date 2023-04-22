import { Alert, Box, Button, Checkbox, Grid, Stack, TextField, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { z } from "zod";
import { registerServices } from "../services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const UserRegisterSchema = z
  .object({
    firstName: z.string().min(2, "First Name is required"),
    lastName: z.string().min(2, "Last Name is required"),
    email: z.string().min(8, "Email is required").email("Invalid Email"),
    password: z.string().min(4, "Password is required"),
    confirmPassword: z.string().min(4, "Confirm Password is required"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export function Register() {
  const [serverError, setServerError] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(UserRegisterSchema),
  });

  function displayErrors(key) {
    const error = errors[key];
    return {
      error: Boolean(error),
      helperText: error && error.message,
    };
  }

  function onSubmit(data) {
    // console.log(data);
    setServerError("");
    registerServices(data)
      .then((user) => {
        // console.log("Success", user);
        navigate("/");
        toast.success("Account successfully created");
      })
      .catch((err) => {
        // console.log("err", err);
        setServerError(err.data.message);
      });
  }

  const checkBoxHandler = () => {
    setAgree(!agree);
  };

  return (
    <Box
      className={classes.loginPage}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, color: green["A400"] }} variant="h2">
        Register
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              InputLabelProps={{
                style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
              }}
              sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, my: 1 }}
              {...register("firstName")}
              {...displayErrors("firstName")}
              required
              type="text"
              variant="outlined"
              fullWidth
              label="First Name"
              placeholder="Gigel"
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              InputLabelProps={{
                style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
              }}
              sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, my: 1 }}
              required
              {...register("lastName")}
              {...displayErrors("lastName")}
              type="text"
              variant="outlined"
              fullWidth
              label="Last Name"
              placeholder="Ionut"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{
                style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
              }}
              sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, my: 1 }}
              {...register("email")}
              {...displayErrors("email")}
              required
              type="email"
              fullWidth
              variant="outlined"
              label="Email"
              placeholder="GigelIonut@yahoo.com"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{
                style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
              }}
              sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, my: 1 }}
              {...register("password")}
              {...displayErrors("password")}
              required
              type="password"
              fullWidth
              variant="outlined"
              label="Password"
              placeholder="************"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{
                style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
              }}
              sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, my: 1 }}
              required
              {...register("confirmPassword")}
              {...displayErrors("confirmPassword")}
              type="password"
              variant="outlined"
              label="Confirm Password"
              placeholder="************"
              fullWidth
            ></TextField>
          </Grid>
        </Grid>
        {serverError && (
          <Alert sx={{ my: 2 }} severity="error">
            {serverError}
          </Alert>
        )}
        <Link component={NavLink} to="/terms" target="_blank">
          <Checkbox sx={{ "&.Mui-checked": { color: green["A700"] } }} onClick={checkBoxHandler} />
          <span className="terms">I agree with terms & conditions</span>
        </Link>
        <Button sx={{ width: "100%" }} type="submit" variant="contained" disabled={!agree}>
          Submit
        </Button>
        <Link
          style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 18, color: green["A400"] }}
          component={NavLink}
          to="/"
          variant="contained"
        >
          Already got an account? Log in!
        </Link>
      </Box>
    </Box>
  );
}
