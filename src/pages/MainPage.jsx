import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getBooks, getMyBooks } from "../services/books";
import { BookPost } from "../components/BookPost";

export function MainPage() {
  // pt getBooks
  const [apiPostBooks, setApiPostBooks] = useState([]);

  // cu search
  // const [apiPostBooks, setApiPostBooks] = useState({
  //   results: [],
  //   totalCount: 8,
  // });
  useEffect(() => {
    getBooks()
      .then((data) => {
        setApiPostBooks(data);
      })
      .catch((err) => {
        console.log("ERROR!!!", err);
      });
  }, []);
  return <Box>{<BookPost booksDisplay={apiPostBooks} />}</Box>;
}
