import { Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { BookComponent } from "./BookComponent";
import { BookItem } from "./BookItem";
import { ShowButton } from "./ShowButton";

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
