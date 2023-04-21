import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
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

  return (
    <Stack
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
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          {...register("firstName")}
          {...displayErrors("firstName")}
          required
          type="text"
          variant="outlined"
          label="First Name"
          placeholder="Zeke"
        ></TextField>
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          required
          {...register("lastName")}
          {...displayErrors("lastName")}
          type="text"
          variant="outlined"
          label="Last Name"
          placeholder="Samson"
        ></TextField>
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          {...register("email")}
          {...displayErrors("email")}
          required
          type="email"
          variant="outlined"
          label="Email"
          placeholder="azazel@yahoo.com"
        ></TextField>

        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: 340 }}
          {...register("password")}
          {...displayErrors("password")}
          required
          type="password"
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
          {...register("confirmPassword")}
          {...displayErrors("confirmPassword")}
          type="password"
          variant="outlined"
          label="Confirm Password"
          placeholder="************"
        ></TextField>
        {serverError && (
          <Alert sx={{ my: 2 }} severity="error">
            {serverError}
          </Alert>
        )}
        <Button sx={{ width: 150 }} type="submit" variant="contained">
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
    </Stack>
  );
}
