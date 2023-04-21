import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import moment from "moment/moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { getBookById } from "../services/books";
import classes from "../styles/mainpage.module.css";
import { green } from "@mui/material/colors";
import { useFetchData } from "../hooks/useFetchData";

export function ViewBook() {
  const { _id } = useParams();

  const navigate = useNavigate();

  const {
    data: book,
    loading,
    error,
  } = useFetchData({
    fetcher: () => getBookById(_id),
    initialData: [],
  });

  function convertDate() {
    return moment(book.createdAt).calendar();
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    navigate("/404");
  }

  return (
    <AppLayout>
      <Container className={[classes.bookPage]}>
        <Grid container>
          <Grid item md={5} xs={12}>
            <img className={classes.bookImage} height="500" src={book.coverImageURL} alt="poza" />
          </Grid>
          <Grid item md={7} xs={12}>
            <Box sx={{ marginLeft: "1rem" }}>
              <Typography variant="h4">{book.title}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5">by: {book.author}</Typography>
              <Divider sx={{ my: 2 }} />
              <Link style={{ color: green["A400"] }} to={`/users-books/${book.owner._id}`} variant="h5">
                Owner: {book.owner?.firstName} {book.owner?.lastName}
              </Link>
              <Divider sx={{ my: 2 }} />
              <Typography>Created At: {convertDate(book.createdAt)}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">{book.description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
