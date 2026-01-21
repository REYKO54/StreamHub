import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function AdminRoute() {
  const { user } = useAuth();

  // non loggato
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // loggato ma non admin
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
