import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MainPage } from "./pages/MainPage";
import { ViewBook } from "./pages/ViewBook";
import { headers } from "./services/utils";
import { useEffect } from "react";
import { ThemePalette } from "./theme/ThemePalette";
import { ManageBooks } from "./pages/ManageBooks";
import { AddBooks } from "./pages/AddBooks";
import { EditBooks } from "./pages/EditBooks";
import { Error404 } from "./pages/Error404";

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
        {/* <Route path="/mainpage/*" element={<MainPage />} /> */}
        <Route path="/book/:_id" element={<ViewBook />} />
        <Route path="/manageBooks/edit/:_id" element={<EditBooks />} />
        <Route path="/manageBooks" element={<ManageBooks />} />
        <Route path="/manageBooks/add" element={<AddBooks />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </ThemePalette>
  );
}

export default App;
