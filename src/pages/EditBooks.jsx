import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { fetchAndParse } from "../services/utils";
import { baseURL, getBookById } from "../services/books";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBook } from "../services/books";
import { useCallback } from "react";
import { useFetchData } from "../hooks/useFetchData";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const editSchemaBook = z.object({
  title: z.string().min(2, "Title is required"),
  author: z.string().min(2, "Author is required"),
  description: z.string().min(2, "Description is required"),
  // dupa cum am zis si la structura, vom avea uniune intre string si File. Putem definii tipul asta de date folosind z.union
  file: z.union([
    // si avem uniune intre string
    z.string(),
    // si File
    z
      .any()
      .refine((file) => file !== null, "Image is required.")
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  ]),
});

export function EditBooks() {
  const { _id } = useParams(); // extract id from the URL
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // set loading to true initially
  // nu e nevoie de un state nou pentru fisier, foloseste useForm pentru a controla toate valorile :)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    /**
     * daca la defaultValues asa arata obiectul, va trebui sa respectam structura
     * Deci un book in formularul de editare va avea urmatoare structura
     *  - title: string
     *  - author: string
     *  - description: string
     *  - file: null | string | File
     *  Un fisier este o uniune intre mai multe tipuri, semnalat de operatia | . Cat timp nu avem date, imaginea nu exista deci tipul de date este null
     *  Daca vine un raspuns de la server, imaginea va fi un string (dat din book.coverImageURL)
     */
    defaultValues: {
      title: "",
      author: "",
      description: "",
      file: null,
    },
    resolver: zodResolver(editSchemaBook),
  });

  // vom folosi hook-ul deja definit pentru a incarca datele intr-un state. In momentul in care acel state exista va da trigger la un effect care va reseta formularul
  const { data: book, loading: bookLoading } = useFetchData(
    {
      fetcher: () => getBookById(_id),
    },
    [_id]
  );

  useEffect(() => {
    if (book) {
      // nu ar trebui sa resetam formularul cu date venite de pe server direct, poate nu sunt in formatul nostru definit mai sus
      // setam camp cu camp valorile, pentru a ne asigura ca respectam structura de date a formularului
      reset({
        file: book.coverImageURL,
        author: book.author,
        description: book.description,
        title: book.title,
      });
    }
  }, [book]);

  function displayErrors(key) {
    const error = errors[key];
    return {
      error: Boolean(error),
      helperText: error && error.message,
    };
  }

  function onSubmit(data) {
    console.log("Submitting", data);
    setServerError("");
    setLoading(true);
    editBook(_id, data)
      .then((book) => {
        console.log("Success", book);
        // daca navigam, nu e nevoie sa setam o stare in plus. Poate cauza un memory leak pentru ca nu este mounted componenta
        navigate("/manageBooks");
        toast.success("Book successfully added");
      })
      .catch((err) => {
        console.log("err", err);
        setServerError(err.data.message);
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function renderImageURL(selectedImage) {
    // avand in vedere ca selectedImage este fie un string, fie un File verificare este simpla
    // verificam daca e string
    if (typeof selectedImage === "string") {
      // daca e string, inseamna ca este URL-ul original
      return selectedImage;
    }
    // altfel, este un file si construim URL-ul folosind URL.createObjectURL
    return URL.createObjectURL(selectedImage);
  }

  console.log({book});

  // cat timp se incarca cartea, aratam un loader sa nu fie un formular
  if (bookLoading) {
    return <CircularProgress />;
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
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
              md={6}
              xs={12}
            >
              <TextField
                InputLabelProps={{
                  style: {
                    color: green["A400"],
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    fontWeight: 700,
                  },
                }}
                sx={{
                  input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 },
                  m: 2,
                  width: "100%",
                }}
                required
                type="text"
                id="title"
                variant="outlined"
                label="Title"
                placeholder="Title"
                {...register("title")}
                {...displayErrors("title")}
                focused
              ></TextField>
              <TextField
                InputLabelProps={{
                  style: {
                    color: green["A400"],
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    fontWeight: 700,
                  },
                }}
                sx={{
                  input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 },
                  m: 2,
                  width: "100%",
                }}
                required
                type="text"
                id="author"
                variant="outlined"
                label="Author"
                focused
                placeholder="Author"
                {...register("author")}
                {...displayErrors("author")}
              ></TextField>
              <TextField
                InputLabelProps={{
                  style: {
                    color: green["A400"],
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    fontWeight: 700,
                  },
                }}
                sx={{
                  input: { fontFamily: "Inter", fontWeight: 500, fontSize: 16 },
                  m: 2,
                  width: "100%",
                }}
                required
                type="text"
                id="author"
                multiline
                rows={5}
                focused
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
                render={({
                  field: { onChange, value: selectedImage },
                  fieldState: { error },
                }) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    {error && <Box>{error.message}</Box>}
                    {selectedImage && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          style={{ width: 120, height: 180 }}
                          // trebuie sa ne punem intrebarea "Care va fi sursa imaginii? Avand in vedere ca este o uniune intre mai multe tipuri de date"
                          // prin verificare de mai sus, am redus uniunea campului `file` la File | string. Astfel, vom face fix verificarea asta pentru randare.
                          src={renderImageURL(selectedImage)}
                          alt="photo"
                        />
                        {serverError && (
                          <Alert sx={{ my: 2 }} severity="error">
                            {serverError}
                          </Alert>
                        )}
                      </Box>
                    )}
                    {selectedImage !== book.coverImageURL ? (
                      <Button
                        variant="contained"
                        onClick={() => {
                          // la edit, oare vrem sa stergem poza? Ar fi ciudat sa il las pe utilziator sa stearga poza deja pusa si dupa sa nu il las sa trimita formularul
                          // am putea da revert la valoarea initiala
                          onChange(book.coverImageURL);
                          console.log("remove");
                        }}
                      >
                        Revert to the original
                      </Button>
                    ) : (
                      <Button component="label" variant="contained">
                        Change book image
                        <input
                          accept="image/*"
                          type="file"
                          hidden
                          onChange={(e) => {
                            console.log("Change");
                            if (e.target.files && e.target.files.length > 0) {
                              console.log(e.target.files[0]);
                              onChange(e.target.files[0]);
                            }
                          }}
                        />
                      </Button>
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
