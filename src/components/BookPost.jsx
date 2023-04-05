import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { BookComponent } from "./BookComponent";
import classes from "../styles/mainpage.module.css";

export function BookPost({ booksDisplay }) {
  return (
    <Box>
      <Grid className={classes.container} container spacing={1}>
        {booksDisplay.map((books) => (
          <BookComponent key={books.id} book={books} />
        ))}
      </Grid>
    </Box>
  );
}
