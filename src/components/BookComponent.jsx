import { Button, Card, CardContent, CardMedia, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function BookComponent({ book }) {
  const [showFullText, setShowFullText] = useState(false);

  const handleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const navigate = useNavigate();
  const handleGoToBook = () => {
    navigate(`/book/${book._id}`);
  };
  return (
    <Grid sx={{ mb: 2 }} item lg={3} md={4} sm={6} xs={12}>
      <Box display="flex" justifyContent="center">
        <Card sx={{ maxWidth: 320 }}>
          <CardMedia
            sx={{
              height: 400,
              minWidth: 320,
              objectFit: "cover",
              display: "block",
              backgroundPosition: "center center",
            }}
            className="test"
            image={book.coverImageURL}
            title="book"
          />
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
  );
}
