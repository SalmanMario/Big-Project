import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getBooks, getMyBooks } from "../services/books";
import { BookPost } from "../components/BookPost";

export function MainPage() {
  // pt getBooks
  const [apiPostBook, setApiPostBook] = useState([]);

  // cu search
  // const [apiPostBook, setApiPostBook] = useState({
  //   results: [],
  //   totalCount: 0,
  // });
  useEffect(() => {
    getBooks()
      .then((data) => {
        setApiPostBook(data);
      })
      .catch((err) => {
        console.log("ERROR!!!", err);
      });
  }, []);
  return <Box>{<BookPost bookItem={apiPostBook} />}</Box>;
}
