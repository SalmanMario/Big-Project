import { useNavigate, useParams } from "react-router-dom";
import { getUsersBooks } from "../services/books";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { BookComponent } from "../components/BookComponent";
import { AppLayout } from "../layouts/AppLayout";
import { useFetchData } from "../hooks/useFetchData";

export function UserBooks() {
  const { _id } = useParams();
  const navigate = useNavigate("");

  const {
    data: usersBooks,
    loading,
    error,
  } = useFetchData({
    fetcher: () => getUsersBooks(_id),
    initialData: [],
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    navigate("/404");
  }

  // console.log(usersBooks);

  return (
    <AppLayout>
      <Box>
        <Typography sx={{ my: 4 }} variant="h4">
          Books owned by: {usersBooks.user.firstName} {usersBooks.user.lastName}
        </Typography>
        <Grid container spacing={4}>
          {usersBooks.books.map((books) => (
            <BookComponent key={books.id} book={books} />
          ))}
        </Grid>
      </Box>
    </AppLayout>
  );
}
