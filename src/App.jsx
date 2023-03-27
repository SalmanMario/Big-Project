import { Route, Router, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MainPage } from "./pages/MainPage";
import { Book } from "./components/Book";

function App() {
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
