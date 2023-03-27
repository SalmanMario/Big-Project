import {
  Button,
  Card,
  CardContent,
  CardMedia,
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";

export function BookComponent({ book }) {
  const [showFullText, setShowFullText] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: green["A400"],
        contrastText: "#fff",
      },
    },
    typography: {
      button: {
        marginBottom: "0.5rem",
        marginTop: "1rem",
        fontFamily: "Montserrat",
        fontWeight: 700,
      },
      h4: {
        fontFamily: "Montserrat",
        fontWeight: 700,
      },
      h5: {
        fontFamily: "Montserrat",
        fontWeight: 500,
      },
      body1: {
        fontFamily: "Inter",
      },
    },
  });

  const handleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const navigate = useNavigate();
  const handleGoToBook = () => {
    navigate(`/book/${book._id}`);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid sx={{ mb: 2 }} item lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" justifyContent="center">
          <Card sx={{ maxWidth: 320 }}>
            <CardMedia sx={{ height: 440 }} image={book.coverImageURL} title="book" />
            <CardContent>
              <Typography textAlign="center" gutterBottom variant="h4">
                {book.title}
              </Typography>
              <Typography textAlign="center" gutterBottom variant="h5">
                {book.author}
              </Typography>
              <Typography variant="body1">
                {showFullText ? book.description : `${book.description.slice(0, 150)}...`}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Button variant="contained" onClick={handleShowFullText}>
                  {showFullText ? "Hide Description" : "Show Description"}
                </Button>
                <Button variant="contained" onClick={handleGoToBook}>
                  View Book
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
