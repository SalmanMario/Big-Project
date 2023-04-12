import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
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
      <Box>
        <Card>
          <CardMedia
            sx={{
              height: 400,
            }}
            image={book.coverImageURL}
            title={book.title}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                height: "4rem",
                lineHeight: "2rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              gutterBottom
              variant="h4"
            >
              {book.title}
            </Typography>
            <Typography
              sx={{
                height: "4rem",
                lineHeight: "2rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              gutterBottom
              variant="h5"
            >
              {book.author}
            </Typography>
            <Typography variant="body1">
              {showFullText ? book.description : `${book.description.slice(0, 50)}...`}
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
