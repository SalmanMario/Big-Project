import { Box, createTheme, Grid, Paper, Stack, styled, ThemeProvider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { getBookById } from "../services/books";
import classes from "../styles/mainpage.module.css";

export function Book() {
  const theme = createTheme({
    typography: {
      h4: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        marginBottom: "3rem",
      },
      h5: {
        fontFamily: "Montserrat",
        fontWeight: 500,
        marginBottom: "3rem",
      },
      h6: {
        fontFamily: "Inter",
        marginBottom: "3rem",
      },
      body1: {
        fontFamily: "Inter",
        fontSize: "1.1rem",
      },
    },
  });
  const { _id } = useParams();
  const [book, setBook] = useState([null]);
  useEffect(() => {
    getBookById(_id).then((books) => {
      setBook(books);
    });
  }, []);

  function convertDate() {
    return moment(book.createdAt).calendar();
  }

  if (!book) {
    return "Loading...";
  }

  return (
    <AppLayout>
      <ThemeProvider theme={theme}>
        <Box className={classes.bookPage}>
          <Container className={classes.bookImage}>
            <img height="600" src={book.coverImageURL} alt="poza" />
            <Box sx={{ marginLeft: "2rem" }}>
              <Typography variant="h4">{book.title}</Typography>
              <Typography variant="h5">by:{book.author}</Typography>
              <Typography variant="h6">
                Owner:
                {book.owner?.firstName} {book.owner?.lastName}
              </Typography>
              <Typography sx={{ mb: 4 }}>Created At: {convertDate(book.createdAt)}</Typography>
              <Typography variant="body1">{book.description}</Typography>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </AppLayout>
  );
}

{
  /* <img height="600" src={book.coverImageURL} alt="poza" />
      <Typography sx={{ mb: 4 }} variant="h4">
        Title: {book.title}
      </Typography>
      <Typography sx={{ mb: 4 }} variant="h5">
        Author: {book.author}
      </Typography>
      <Typography sx={{ mb: 4 }} variant="h6">
        Owner:
        {book.owner?.firstName}
        {book.owner?.lastName}
      </Typography>
      <Typography sx={{ mb: 4 }}>Created At: {convertDate(book.createdAt)}</Typography>
      <Typography variant="body1">{book.description}</Typography> */
}
