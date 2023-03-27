import { Box } from "@mui/system";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
export function AppLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", flex: 1 }}>
      <Navbar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</Box>
      <Footer />
    </Box>
  );
}
