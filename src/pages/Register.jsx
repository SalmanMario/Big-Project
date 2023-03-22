import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };
  return (
    <Box>
      <Typography variant="h3">Register</Typography>
      <TextField
        required
        type="email"
        id="email"
        variant="outlined"
        label="Email"
        placeholder="gigel@yahoo.com"
      ></TextField>
      <TextField
        required
        type="email"
        id="confirmEmail"
        variant="outlined"
        label="Confirm Email"
        placeholder="gigel@yahoo.com"
      ></TextField>
      <TextField
        required
        type="password"
        id="password"
        variant="outlined"
        label="Password"
        placeholder="************"
      ></TextField>
      <TextField
        required
        type="password"
        id="confirmPassword"
        variant="outlined"
        label="Confirm Password"
        placeholder="************"
      ></TextField>
      <Button onClick={goToLogin} variant="contained">
        Go back
      </Button>
    </Box>
  );
}
