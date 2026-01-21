import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          padding: 12,
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/watchlist">Watchlist</Link>

        {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}

        <div style={{ marginLeft: "auto" }}>
          {user ? (
            <button onClick={logout} type="button">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
