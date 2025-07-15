import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* rotte pubbliche */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* rotte private */}
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="expenses"
                element={
                  <PrivateRoute>
                    <Expenses />
                  </PrivateRoute>
                }
              />
              <Route
                path="add-expense"
                element={
                  <PrivateRoute>
                    <AddExpense />
                  </PrivateRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
