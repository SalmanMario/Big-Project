import { Box, Button, Container, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { fetchAndParse } from "../services/utils";
import { baseURL, getBookById } from "../services/books";
import { useNavigate, useParams } from "react-router-dom";

export function EditBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const { _id } = useParams();

  useEffect(() => {
    if (_id) {
      getBookById(_id)
        .then((book) => {
          setTitle(book.title);
          setAuthor(book.author);
          setDescription(book.description);
          setSelectedImage(book.coverImageURL);
        })
        .catch((error) => {
          navigate("/404");
        });
    }
  }, [_id]);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const navigate = useNavigate();

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  async function editBook(payload) {
    const formData = new FormData();
    const localStorageToken = localStorage.getItem("token");

    formData.append("title", payload.title);
    formData.append("author", payload.author);
    formData.append("description", payload.description);
    formData.append("file", payload.file);

    console.log(payload);

    try {
      await fetchAndParse(`${baseURL}/book/${_id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      });
      navigate("/manageBooks");
    } catch (error) {
      console.log(error, "Eu is");
    }
  }

  return (
    <AppLayout>
      <Container>
        <Typography sx={{ my: 4 }} variant="h4">
          Edit a book
        </Typography>
        <Grid container>
          <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "baseline" }} item md={6} xs={12}>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={author}
              placeholder="Author"
              onChange={(e) => setAuthor(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
            <Button onClick={() => editBook({ title, author, description, file })} variant="contained">
              Edit The book
            </Button>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
              onChange={handleFileChange}
            >
              <Button component="label" variant="contained">
                Upload Book Image
                <input id="file-upload" required accept="image/*" type="file" onChange={imageChange} />
              </Button>
              {selectedImage === file ? (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <img style={{ width: 150, height: 120 }} src={URL.createObjectURL(selectedImage)} alt="photo" />
                  <Button variant="contained" onClick={removeSelectedImage}>
                    Remove This Image
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <img style={{ width: 120, height: 180 }} src={selectedImage} alt="photo" />
                  <Button variant="contained" onClick={removeSelectedImage}>
                    Remove This Image
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
}
