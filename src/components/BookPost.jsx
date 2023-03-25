import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { BookComponent } from "./BookComponent";

export function BookPost({ bookItem }) {
  return (
    <Box>
      <Grid container spacing={1}>
        {bookItem.map((book) => (
          <BookComponent key={book.id} book={book} />
        ))}
      </Grid>
    </Box>
  );
}
