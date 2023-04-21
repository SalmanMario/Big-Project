import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import classes from "./login.module.css";
import { Stack } from "@mui/system";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginServices } from "../services/auth";
import { toast } from "react-toastify";
import { useAuthContext } from "../contexts/Auth/AuthContext";

const LoginObjectSchema = z.object({
  email: z.string().min(8, "Email is required").email("Invalid Email"),
  password: z.string().min(4, "Password is required"),
});

export function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginObjectSchema),
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
    login(data)
      .then(() => {
        // console.log("Success", data);
        navigate("/mainpage");
        toast.info("Welcome to the main page");
      })
      .catch((err) => {
        // console.log("err", err);
        toast.error("Invalid email or password");
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
      <Typography sx={{ color: green["A400"] }} variant="h2">
        Login
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ m: 2, width: 340 }}
          required
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          {...register("email")}
          {...displayErrors("email")}
        />
        <TextField
          InputLabelProps={{
            style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
          }}
          sx={{ m: 2, width: 340 }}
          required
          type="password"
          id="password"
          label="Password"
          variant="outlined"
          {...register("password")}
          {...displayErrors("password")}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link
          style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 18, color: green["A400"] }}
          component={NavLink}
          to="/register"
          variant="contained"
        >
          You don't have an account? Click here!
        </Link>
      </Box>
    </Stack>
  );
}
