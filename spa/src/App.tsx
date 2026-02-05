import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import LoginForm from "./features/login/LoginForm";
import { ProfilePage } from "./pages/profile.page/profilepage";
import { useUserStore } from "./entities/user/UserStore";

function App() {
  const user = useUserStore((state) => state.user);
  const isAuth = user && user.status === true;

  return (
    <BrowserRouter>
      <Routes>
        {/* Страница логина — только если НЕ авторизован */}
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/profile" replace /> : <LoginForm />}
        />

        {/* Профиль — только если авторизован */}
        <Route
          path="/profile"
          element={isAuth ? <ProfilePage /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
