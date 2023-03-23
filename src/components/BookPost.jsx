import { Box } from "@mui/system";
import { BookItem } from "./BookItem";

export function BookPost({ bookItem }) {
  return (
    <Box>
      {bookItem.map((book) => (
        <BookItem
          key={book.id}
          title={book.title}
          author={book.author}
          description={book.description}
          coverImageURL={book.coverImageURL}
        />
      ))}
    </Box>
  );
}
