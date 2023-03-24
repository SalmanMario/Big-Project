import { Button, Grid } from "@mui/material";
import { useState } from "react";

export function ShowButton({ book }) {
  const [showFullText, setShowFullText] = useState(false);
  const handleShowFullText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <Grid>
      {showFullText ? book.description : `${book.description.slice(0, 150)}...`}
      <Button variant="contained" onClick={handleShowFullText}>
        {showFullText ? "Hide Description" : "Show Description"}
      </Button>
    </Grid>
  );
}
