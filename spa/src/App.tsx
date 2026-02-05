import { BrowserRouter, Route, Routes } from "react-router";
import LoginForm from "./features/login/LoginForm";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="*" element={<LoginPage />} />  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
