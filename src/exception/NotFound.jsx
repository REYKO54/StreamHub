import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h1>404</h1>
      <p>Pagina non trovata.</p>
      <Link to="/">Torna alla Home</Link>
    </div>
  );
}
