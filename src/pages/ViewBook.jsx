import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { getBookById } from "../services/books";
import classes from "../styles/mainpage.module.css";

export function ViewBook() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [book, setBook] = useState([null]);
  useEffect(() => {
    getBookById(_id)
      .then((books) => {
        setBook(books);
      })
      .catch((error) => {
        navigate("/404");
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
      <Container className={[classes.bookPage, classes.containerColor]}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <img className={classes.bookImage} height="600" src={book.coverImageURL} alt="poza" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Box sx={{ marginLeft: "2rem" }}>
              <Typography sx={{ mb: 4 }} variant="h4">
                {book.title}
              </Typography>
              <Typography sx={{ mb: 4 }} variant="h5">
                by: {book.author}
              </Typography>
              <Typography sx={{ mb: 4 }} variant="h6">
                Owner: {book.owner?.firstName} {book.owner?.lastName}
              </Typography>
              <Typography sx={{ mb: 4 }}>Created At: {convertDate(book.createdAt)}</Typography>
              <Typography sx={{ mb: 4 }} variant="body1">
                {book.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}

// <img height="600" src={book.coverImageURL} alt="poza" />
//           <Box sx={{ marginLeft: "2rem" }}>
//             <Typography sx={{ mb: 4 }} variant="h4">
//               {book.title}
//             </Typography>
//             <Typography sx={{ mb: 4 }} variant="h5">
//               by:{book.author}
//             </Typography>
//             <Typography sx={{ mb: 4 }} variant="h6">
//               Owner:
//               {book.owner?.firstName} {book.owner?.lastName}
//             </Typography>
//             <Typography sx={{ mb: 4 }}>Created At: {convertDate(book.createdAt)}</Typography>
//             <Typography sx={{ mb: 4 }} variant="body1">
//               {book.description}
//             </Typography>
//           </Box>
