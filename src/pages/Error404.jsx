import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Error404() {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/mainpage");
  };
  return (
    <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", my: 2 }}>
      <Typography variant="h2">Page not found</Typography>
      <Typography mt={2} variant="body1">
        The requested URL was not found on this server. That's all we know
      </Typography>
      <img
        className="errorPage"
        src="https://img.freepik.com/free-vector/hand-drawn-404-error_23-2147736555.jpg?size=626&ext=jpg&ga=GA1.2.1266655490.1679133202&semt=ais"
      />
      <Button onClick={goToMainPage} variant="contained">
        Go to Mainpage
      </Button>
    </Container>
  );
}
