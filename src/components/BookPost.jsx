import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { BookComponent } from "./BookComponent";
import classes from "../styles/mainpage.module.css";

export function BookPost({ booksDisplay }) {
  return (
    <AppLayout>
      <Box>
        <Grid className={classes.container} container spacing={1}>
          {booksDisplay.map((books) => (
            <BookComponent key={books.id} book={books} />
          ))}
        </Grid>
      </Box>
    </AppLayout>
  );
}
