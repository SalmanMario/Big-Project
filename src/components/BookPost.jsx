import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { BookComponent } from "./BookComponent";

export function BookPost({ bookItem }) {
  return (
    <AppLayout>
      <Box>
        <Grid container spacing={1}>
          {bookItem.map((book) => (
            <BookComponent key={book.id} book={book} />
          ))}
        </Grid>
      </Box>
    </AppLayout>
  );
}
