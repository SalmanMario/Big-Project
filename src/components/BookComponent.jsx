import {
  Button,
  Card,
  CardActions,
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
import { BookItem } from "./BookItem";

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
      <Grid sx={{ my: 2 }} item lg={3} md={4} sm={6} xs={12}>
        <Box display="flex" justifyContent="center">
          <Card sx={{ maxWidth: 260 }}>
            <CardMedia
              sx={{ height: 320, objectFit: "cover", imageRendering: "high-quality" }}
              image={book.coverImageURL}
              title="book"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {book.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {book.author}
              </Typography>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <Typography variant="body1">
                  {showFullText ? book.description : `${book.description.slice(0, 150)}...`}
                </Typography>
              </div>
              <Grid>
                <Button variant="contained" onClick={handleShowFullText}>
                  {showFullText ? "Hide Description" : "Show Description"}
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
