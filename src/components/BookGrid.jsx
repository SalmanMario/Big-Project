import { getMyBooks } from "../services/books";
import { useFetchData } from "../hooks/useFetchData";
import { headers } from "../services/utils";
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

export function BookGrid() {
  const { data: bookGrid } = useFetchData(getMyBooks, []);
  const localStorageToken = localStorage.getItem("token");
  headers["Authorization"] = `Bearer ${localStorageToken}`;
  const columns = [
    {
      field: "image",
      headerName: "Book",
      width: 90,
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    // { field: "createdAt", headerName: "Created At", width: 150 },
    // { field: "firstName", headerName: "First Name", width: 150 },
    // { field: "lastName", headerName: "Last Name", width: 150 },
    // { field: "createdAt", headerName: "Created At", width: 105 },
    // { field: "updatedAt", headerName: "Updated At", width: 105 },
  ];

  return (
    <Container>
      <h1>Welcome to your Manage Books page</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid autoHeight rows={bookGrid} columns={columns} />
      </div>
    </Container>
  );
}

// {
//   bookGrid.map((book) => (
//     <div key={book.id}>
//       <h2>{book.title}</h2>
//       <img src={book.coverImageURL} alt={book.title} />
//       <h2>{book.author}</h2>
//       <h2>{book.description}</h2>
//       <h2>{book.owner.firstName}</h2>
//       <h2>{book.owner.lastName}</h2>
//       <h2>{book.createdAt}</h2>
//       <h2>{book.updatedAt}</h2>
//     </div>
//   ));
// }
