import { Navigate, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { MainPage } from "../pages/MainPage";
import { ViewBook } from "../pages/ViewBook";
import { ThemePalette } from "../theme/ThemePalette";
import { ManageBooks } from "../pages/ManageBooks";
import { AddBooks } from "../pages/AddBooks";
import { EditBooks } from "../pages/EditBooks";
import { Error404 } from "../pages/Error404";
import { AuthContextProvider } from "../contexts/Auth/AuthContextProvider";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import { UserBooks } from "../pages/UserBooks";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export function RoutesPages() {
  const navigate = useNavigate();

  return (
    <AuthContextProvider>
      <ThemePalette>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/book/:_id" element={<ViewBook />} />
            <Route path="/manageBooks/edit/:_id" element={<EditBooks />} />
            <Route path="/manageBooks" element={<ManageBooks />} />
            <Route path="/manageBooks/add" element={<AddBooks />} />
            <Route path="/users-books/:_id" element={<UserBooks />} />
          </Route>
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ThemePalette>
    </AuthContextProvider>
  );
}
