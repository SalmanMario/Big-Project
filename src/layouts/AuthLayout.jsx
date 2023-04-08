import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function () {
  return (
    <Box sx={{ backgroundColor: "#e8f5e9" }}>
      <Container maxWidth="xs">
        <Outlet />
      </Container>
    </Box>
  );
}
