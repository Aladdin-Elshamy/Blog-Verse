import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children } : { children: ReactNode }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
