import { Alert, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBook } from "../services/books";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const AddSchemaBook = z.object({
  title: z.string().min(2, "Title is required"),
  author: z.string().min(2, "Author is required"),
  description: z.string().min(2, "Description is required"),
  file: z
    .any()
    .refine((file) => file !== null, "Image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), ".jpg, .jpeg, .png and .webp files are accepted."),
});

export function AddBooks() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      file: null,
    },
    resolver: zodResolver(AddSchemaBook),
  });

  function displayErrors(key) {
    const error = errors[key];
    return {
      error: Boolean(error),
      helperText: error && error.message,
    };
  }

  function onSubmit(data) {
    // console.log("Submitting", data);
    setLoading(true);
    setServerError("");
    addBook(data)
      .then((book) => {
        // console.log("Success", book);
        navigate("/manageBooks");
        toast.success("Book successfully added");
      })
      .catch((err) => {
        setServerError(err.data.message);
        // console.log("err", err);
        // console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <AppLayout>
      <Container>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ my: 4 }} variant="h4">
            Add a book
          </Typography>
          <Grid container>
            <Grid
              sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              item
              md={6}
              xs={12}
            >
              <TextField
                InputLabelProps={{
                  style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
                }}
                sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: "100%" }}
                required
                type="text"
                id="title"
                variant="outlined"
                label="Title"
                placeholder="Title"
                {...register("title")}
                {...displayErrors("title")}
              ></TextField>
              <TextField
                InputLabelProps={{
                  style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
                }}
                sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: "100%" }}
                required
                type="text"
                id="author"
                variant="outlined"
                label="Author"
                placeholder="Author"
                {...register("author")}
                {...displayErrors("author")}
              ></TextField>
              <TextField
                InputLabelProps={{
                  style: { color: green["A400"], fontFamily: "Montserrat", fontSize: 16, fontWeight: 700 },
                }}
                sx={{ input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 }, m: 2, width: "100%" }}
                required
                type="text"
                id="author"
                multiline
                rows={5}
                variant="outlined"
                label="Description"
                placeholder="Description"
                {...register("description")}
                {...displayErrors("description")}
              ></TextField>
              <Button type="submit" disabled={loading} variant="contained">
                Add Book
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name="file"
                render={({ field: { onChange, value: selectedImage }, fieldState: { error } }) => (
                  <Box
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
                  >
                    {error && <Box>{error.message}</Box>}
                    {!selectedImage && (
                      <Button component="label" variant="contained">
                        Upload Book Image
                        <input
                          accept="image/*"
                          type="file"
                          hidden
                          onChange={(e) => {
                            // console.log("Change");
                            if (e.target.files && e.target.files.length > 0) {
                              // console.log(e.target.files[0]);
                              onChange(e.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                    )}
                    {selectedImage && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img style={{ width: 120, height: 180 }} src={URL.createObjectURL(selectedImage)} alt="photo" />
                        <Button
                          variant="contained"
                          onClick={() => {
                            onChange(null);
                            // console.log("remove");
                          }}
                        >
                          Remove This Image
                        </Button>
                        {serverError && (
                          <Alert sx={{ my: 2 }} severity="error">
                            {serverError}
                          </Alert>
                        )}
                      </Box>
                    )}
                  </Box>
                )}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </AppLayout>
  );
}
