import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { baseURL } from "../services/books";
import { BookPost } from "../components/BookPost";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Pagination } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";

export function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get("page") ? parseInt(searchParams.get("page"), 10) : 1;

  const [apiPostBooks, setApiPostBooks] = useState({
    results: [],
    totalCount: 0,
  });

  useEffect(() => {
    const limit = 8;
    const offset = (pageNumber - 1) * limit;

    axios
      .get(`${baseURL}/book/search?limit=${limit}&offset=${offset}`)
      .then((response) => {
        setApiPostBooks(response.data);
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
      <Box>
        {<BookPost booksDisplay={apiPostBooks.results} />}
        <Pagination sx={{ ml: 8 }} count={totalPages} page={pageNumber} onChange={handleChange}></Pagination>
      </Box>
    </AppLayout>
  );
}
