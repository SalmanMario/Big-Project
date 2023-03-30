import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { BookComponent } from "./BookComponent";
import classes from "../styles/mainpage.module.css";

export function BookPost({ bookItem }) {
  return (
    <AppLayout>
      <Box>
        <Grid className={classes.container} container spacing={1}>
          {bookItem.map((book) => (
            <BookComponent key={book.id} book={book} />
          ))}
        </Grid>
      </Box>
    </AppLayout>
  );
}
