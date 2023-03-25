import { Box } from "@mui/system";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
export function AppLayout({ children }) {
  return (
    <Box>
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
}
