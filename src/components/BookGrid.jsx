import { getMyBooks } from "../services/books";
import { useFetchData } from "../hooks/useFetchData";
import { headers } from "../services/utils";
import { Button, Container, Grid, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function BookGrid() {
  const { data: bookGrid } = useFetchData(getMyBooks, []);
  const localStorageToken = localStorage.getItem("token");
  headers["Authorization"] = `Bearer ${localStorageToken}`;

  const navigate = useNavigate();

  const addBook = () => {
    navigate("/manageBooks/add");
  };

  const handleDetele = async (_id) => {
    try {
      const localStorageToken = localStorage.getItem("token");
      const response = await fetch(`https://itschool-library.onrender.com/book/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
      });
      if (response.status) {
        console.log("Ok");
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(() => [
    {
      field: "coverImageURL",
      headerName: "Book",
      width: 100,
      height: 100,
      renderCell: (params) => <img className="bookImagesGrid" src={params.value} />,
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
      valueFormatter: (params) => moment(params.value).format("DD.MM.Y"),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 105,
      valueFormatter: (params) => moment(params?.value).format("DD.MM.Y"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => <button onClick={() => handleDetele(params.row._id)}>Delete</button>,
    },
  ]);

  return (
    <Container>
      <Grid container>
        <Grid item md={10}>
          <Typography sx={{ my: 4 }} variant="h3">
            Welcome to your Manage Books page
          </Typography>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} item md={2}>
          <Button onClick={addBook} variant="contained">
            Add Book
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        {bookGrid.length === 0 ? (
          "You have no books added"
        ) : (
          <DataGrid autoHeight getRowHeight={() => 90} rows={bookGrid} columns={columns} />
        )}
      </div>
    </Container>
  );
}
