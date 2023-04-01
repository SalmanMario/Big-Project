import { getBookById, getMyBooks } from "../services/books";
import { useFetchData } from "../hooks/useFetchData";
import { headers } from "../services/utils";
import { Container, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../styles/mainpage.module.css";

export function BookGrid() {
  const { data: bookGrid } = useFetchData(getMyBooks, []);
  const localStorageToken = localStorage.getItem("token");
  headers["Authorization"] = `Bearer ${localStorageToken}`;

  const navigate = useNavigate();

  function handleDelete({ id }) {
    const url = `https://itschool-library.onrender.com/book/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respone) => {
        if (!respone.ok) {
          throw new Error("Something went wrong");
        }
        navigate("/mainpage");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const columns = useMemo(() => [
    {
      field: "coverImageURL",
      headerName: "Book",
      width: 100,
      height: 100,
      renderCell: (params) => <img className="bookImagesGrid" src={params.value}></img>,
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "owner",
      headerName: "Owner",
      width: 150,
      renderCell: (params) => (
        <div>
          <span>{params.value.firstName}</span> <span>{params.value.lastName}</span>
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      valueFormatter: (params) => moment(params?.value).format("DD.MM.Y"),
    },
    // { field: "lastName", headerName: "Last Name", width: 150 },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 105,
      valueFormatter: (params) => moment(params?.value).format("DD.MM.Y"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      getActions: (params) => [<GridActionsCellItem icon={<DeleteIcon />} onClick={handleDelete} label="Delete" />],
    },
  ]);

  return (
    <Container>
      <Typography sx={{ my: 4 }} variant="h3">
        Welcome to your Manage Books page
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid autoHeight getRowHeight={() => 90} rows={bookGrid} columns={columns} />
      </div>
    </Container>
  );
}
