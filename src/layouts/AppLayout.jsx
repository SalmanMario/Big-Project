import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
export function AppLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", flex: 1 }}>
      <Navbar />
      <Container sx={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</Container>
      <Outlet />
      <Footer />
    </Box>
  );
}
