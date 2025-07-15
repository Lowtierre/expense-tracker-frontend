import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10 text-white">Caricamento...</div>;
  }

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
