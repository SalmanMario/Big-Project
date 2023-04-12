import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { BookComponent } from "./BookComponent";

export function BookPost({ booksDisplay }) {
  return (
    <Box>
      <Grid container spacing={4}>
        {booksDisplay.map((books) => (
          <BookComponent key={books.id} book={books} />
        ))}
      </Grid>
    </Box>
  );
}
