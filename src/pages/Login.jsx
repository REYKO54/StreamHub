import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/login.css";

export default function Login() {
  const { user, login, logout } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [err, setErr] = useState("");

  const canSubmit = useMemo(() => username.trim().length >= 3, [username]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    const u = username.trim();
    if (u.length < 3) {
      setErr("Username must be at least 3 characters.");
      return;
    }
    if (role !== "user" && role !== "admin") {
      setErr("Invalid role.");
      return;
    }

    login(u, role);
    nav("/", { replace: true });
  };

  return (
    <div className="login">
      <h1>Login</h1>

      {user ? (
        <div className="login-logged">
          <p>
            Logged in as <b>{user.username}</b> ({user.role})
          </p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="login-form">
          {err && (
            <p role="alert" className="error">
              {err}
            </p>
          )}

          <label className="login-field">
            <span>Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="min 3 characters"
              required
            />
          </label>

          <label className="login-field">
            <span>Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </label>

          <button type="submit" disabled={!canSubmit}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}

