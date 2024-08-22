import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import MenuAppBar from "./components/MenuAppBar";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ConditionalMenuAppBar />
      <Routes>
        {/* Redirect root path to login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protecting the tasks page */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

const ConditionalMenuAppBar = () => {
  const location = useLocation();
  const showMenuAppBar =
    location.pathname !== "/login" && location.pathname !== "/register";

  return showMenuAppBar ? <MenuAppBar /> : null;
};

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("mobily-infotech-token");
  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
