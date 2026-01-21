import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function ProtectedRoute() {
  const { user } = useAuth();

  // utente non loggato → login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
