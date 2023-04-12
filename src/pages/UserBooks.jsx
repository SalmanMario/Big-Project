import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsersBooks } from "../services/books";
import { Box, Grid, Typography } from "@mui/material";
import { BookComponent } from "../components/BookComponent";
import { AppLayout } from "../layouts/AppLayout";
import { useAuthContext } from "../contexts/Auth/AuthContext";

export function UserBooks() {
  const [usersBooks, setUsersBooks] = useState();
  const { _id } = useParams();
  useEffect(() => {
    getUsersBooks(_id)
      .then((data) => {
        setUsersBooks(data);
      })
      .catch((err) => {
        console.log(err, "Eroare");
      });
  }, []);
  return (
    <AppLayout>
      <Box>
        <Typography sx={{ my: 4 }} variant="h4">
          Books Owned by {usersBooks && usersBooks.user.firstName} {usersBooks && usersBooks.user.lastName}
        </Typography>
        <Grid container spacing={4}>
          {usersBooks && usersBooks.books.map((books) => <BookComponent key={books.id} book={books} />)}
        </Grid>
      </Box>
    </AppLayout>
  );
}
