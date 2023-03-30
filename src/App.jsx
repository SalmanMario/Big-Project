import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MainPage } from "./pages/MainPage";
import { Book } from "./components/Book";
import { headers } from "./services/utils";
import { useEffect, useLayoutEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/book/:_id" element={<Book />} />
    </Routes>
  );
}

export default App;
