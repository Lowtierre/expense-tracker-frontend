import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import Profile from "./pages/Profile";
import EditExpense from "./pages/EditExpense";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* ✅ Expenses è ora la pagina di default */}
              <Route
                index
                element={
                  <PrivateRoute>
                    <Expenses />
                  </PrivateRoute>
                }
              />

              {/* rotte pubbliche */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />

              {/* rotte private */}
              <Route
                path="add-expense"
                element={
                  <PrivateRoute>
                    <AddExpense />
                  </PrivateRoute>
                }
              />
              <Route
                path="edit-expense/:id"
                element={
                  <PrivateRoute>
                    <EditExpense />
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
