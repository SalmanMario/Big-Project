import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getBooks } from "../services/books";
import { BookPost } from "../components/BookPost";

export function MainPage() {
  const [apiPostBook, setApiPostBook] = useState([]);
  useEffect(() => {
    getBooks().then((data) => {
      setApiPostBook(data);
    });
  }, []);
  return <Box>{<BookPost bookItem={apiPostBook} />}</Box>;
}
