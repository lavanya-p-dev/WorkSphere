import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./features/auth/pages/LoginPage";
import { useAuth } from "./features/auth/context/authContext";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProjectsPage from "./features/projects/pages/ProjectsPage";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>WorkSphere Dashboard</h1>

      <p>
        Welcome, {user?.name}
      </p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const App = () => {

  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <LoginPage />
          }
        />
        <Route 
        path="/register"
        element={
          isAuthenticated
            ? <Navigate to="/dashboard" replace />
            : <RegisterPage />
        }
      />

        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <Dashboard />
              : <Navigate to="/login" replace />
          }
        />

        <Route 
        path="/projects/*"
        element={<ProjectsPage/>}
        />
        
        <Route
          path="*"
          element={
            <Navigate
              to={
                isAuthenticated
                  ? "/dashboard"
                  : "/login"
              }
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;