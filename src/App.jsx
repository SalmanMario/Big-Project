import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MainPage } from "./pages/MainPage";
import { Book } from "./components/Book";
import { headers } from "./services/utils";
import { useEffect, useState } from "react";
import { ThemePalette } from "./theme/ThemePalette";
import { ManageBooks } from "./pages/ManageBooks";

function App() {
  const navigate = useNavigate();
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
      // setam headerele de autorizare
      headers["Authorization"] = `Bearer ${localStorageToken}`;
    } else {
      navigate("/");
      // daca nu avem token, trimitem utilizatorul la login
    }
    console.log(localStorage.getItem("token"));
  }, []);

  return (
    <ThemePalette>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/book/:_id" element={<Book />} />
        <Route path="/manageBooks" element={<ManageBooks />}></Route>
      </Routes>
    </ThemePalette>
  );
}

export default App;
