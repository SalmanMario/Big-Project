import { Box } from "@mui/system";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { baseURL } from "../services/books";
import { BookPost } from "../components/BookPost";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Grid, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import SearchIcon from "@mui/icons-material/Search";
import classes from "../styles/mainpage.module.css";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import { fetchAndParse } from "../services/utils";
export function MainPage() {
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get("page") ? parseInt(searchParams.get("page"), 10) : 1;

  const [apiPostBooks, setApiPostBooks] = useState({
    results: [],
    totalCount: 0,
  });

  useEffect(() => {
    const limit = 8;
    const offset = (pageNumber - 1) * limit;
    const page = searchParams.get("page") || 1; // set default page to 1

    fetchAndParse(`${baseURL}/book/search?limit=${limit}&offset=${offset}`)
      .then((response) => {
        setApiPostBooks(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNumber]);

  const totalPages = Math.ceil(apiPostBooks.totalCount / 8);

  const handleChange = (event, value) => {
    setSearchParams((query) => {
      const key = "page";
      const newValue = value.toString();
      const resetOn = "1";
      const transformer = (v) => v.toString();

      if (query.has(key)) {
        query.set(key, newValue);
      } else {
        query.append(key, newValue);
      }
      if (resetOn === transformer(newValue)) {
        query.delete(key);
      }

      return query;
    });
  };

  return (
    <AppLayout>
      <Box className={classes.containerColor} sx={{ px: 10 }}>
        <Grid container>
          <Grid sx={{ my: 2 }} item md={6}>
            <Typography variant="h4">
              Welcome to your page {user.firstName} {user.lastName}
            </Typography>
          </Grid>
          <Grid sx={{ my: 3, display: "flex", justifyContent: "end" }} item md={6}>
            <TextField
              label="search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flex: "1 1 0%",
          flexDirection: "column",
        }}
      >
        {apiPostBooks.results.length > 0 ? (
          <BookPost booksDisplay={apiPostBooks.results} />
        ) : (
          <Box className="bookNotFoundCenter">
            <Typography variant="h3">Books not found</Typography>
          </Box>
        )}
        <Pagination
          color="primary"
          sx={{ ml: 8, my: 1 }}
          count={totalPages}
          page={pageNumber}
          onChange={handleChange}
        ></Pagination>
      </Box>
    </AppLayout>
  );
}
