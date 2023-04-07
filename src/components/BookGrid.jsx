import { getMyBooks } from "../services/books";
import { useFetchData } from "../hooks/useFetchData";
import { headers } from "../services/utils";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export function BookGrid() {
  const { data: bookGrid } = useFetchData(getMyBooks, []);
  const localStorageToken = localStorage.getItem("worldOfBooks");
  const tokenObject = JSON.parse(localStorageToken);
  const token = tokenObject.token;
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const addBook = () => {
    navigate("/manageBooks/add");
  };

  const editBook = (_id) => {
    // to get the id for every book we need to accces the params.row._id
    navigate(`/manageBooks/edit/${_id}`);
    console.log(bookGrid);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetele = async (_id) => {
    try {
      const response = await fetch(`https://itschool-library.onrender.com/book/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status) {
        console.log("Ok");
        setOpen(false);
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
    { field: "title", headerName: "Title", width: 175 },
    { field: "author", headerName: "Author", width: 125 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "owner",
      headerName: "Owner",
      width: 125,
      renderCell: (params) => (
        <div>
          <span>{params.value.firstName}</span> <span>{params.value.lastName}</span>
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
      valueFormatter: (params) => moment(params.value).format("DD.MM.Y"),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 120,
      valueFormatter: (params) => moment(params?.value).format("DD.MM.Y"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 105,
      renderCell: (params) => (
        <div>
          <IconButton onClick={handleClickOpen} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Do you want to delete this book?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this book? This process cannot be undone once you clicked "delete"
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Disagree
              </Button>
              <Button variant="outlined" onClick={() => handleDetele(params.row._id)} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <IconButton onClick={() => editBook(params.row._id)} aria-label="delete" size="large">
            <EditIcon fontSize="inherit" />
          </IconButton>
        </div>
      ),
    },
  ]);

  // onClick={() => handleDetele(params.row._id)}

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
