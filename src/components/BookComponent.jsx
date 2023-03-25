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
    },
  });

  const handleShowFullText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid sx={{ mb: 2 }} item lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" justifyContent="center">
          <Card sx={{ maxWidth: 240 }}>
            <CardMedia sx={{ height: 320 }} image={book.coverImageURL} title="book" />
            <CardContent>
              <Typography textAlign="center" gutterBottom variant="h4">
                {book.title}
              </Typography>
              <Typography textAlign="center" gutterBottom variant="h6">
                {book.author}
              </Typography>
              <Typography variant="body1">
                {showFullText ? book.description : `${book.description.slice(0, 150)}...`}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Button variant="contained" onClick={handleShowFullText}>
                  {showFullText ? "Hide Description" : "Show Description"}
                </Button>
                <Button variant="contained">View Book</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
