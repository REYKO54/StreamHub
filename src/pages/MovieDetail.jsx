import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieById } from "../admin/adminRepo.js";
import * as watchlistService from "../service/watchlistService.js";

// Poster locali
import interstellar from "../assets/posters/interstellar.jpg";
import inception from "../assets/posters/inception.jpg";
import darkknight from "../assets/posters/darkknight.jpg"; 
import dune from "../assets/posters/dune.jpg";
import placeholder from "../assets/posters/placeholder.jpg";

const posters = {
  interstellar,
  inception,
  darkknight,
  dune,
};

export default function MovieDetail() {
  const { id } = useParams();
  const idStr = useMemo(() => String(id ?? "").trim(), [id]);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState("");

  const inWatchlist = useMemo(() => {
    if (!idStr) return false;
    return watchlistService.isInWatchlist(idStr);
  }, [idStr, info]);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!idStr) {
        setErr("ID non valido.");
        setMovie(null);
        setLoading(false);
        return;
      }

      try {
        setErr("");
        setLoading(true);
        const data = await fetchMovieById(idStr);
        if (!alive) return;
        setMovie(data ?? null);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message ?? "Errore caricamento film");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [idStr]);

  const onAdd = async () => {
    if (busy) return;
    try {
      setBusy(true);
      watchlistService.addToWatchlist(idStr);
      setInfo("Aggiunto alla watchlist ✅");
      setTimeout(() => setInfo(""), 1200);
    } catch (e) {
      setErr(e?.message ?? "Errore aggiunta");
    } finally {
      setBusy(false);
    }
  };

  const onRemove = async () => {
    if (busy) return;
    try {
      setBusy(true);
      watchlistService.removeFromWatchlist(idStr);
      setInfo("Rimosso dalla watchlist ✅");
      setTimeout(() => setInfo(""), 1200);
    } catch (e) {
      setErr(e?.message ?? "Errore rimozione");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p>Caricamento...</p>;

  if (err) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Movie Detail</h1>
        <p style={{ color: "crimson" }}>{err}</p>
        <Link to="/">← Home</Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Movie Detail</h1>
        <p style={{ color: "crimson" }}>Film non trovato.</p>
        <Link to="/">← Home</Link>
      </div>
    );
  }

  const title = movie.title ?? "Untitled";
  const year = movie.year ?? null;
  const rating = movie.rating ?? null;

  const posterSrc = posters[movie.posterKey] ?? placeholder;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Movie Detail</h1>
        <Link to="/">Home</Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 16,
          marginTop: 16,
        }}
      >
        <img
          src={posterSrc}
          alt={title}
          style={{
            width: "100%",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.1)",
            display: "block",
      }}
        onError={(e) => {
        // prevent loop: only swap once
        if (e.currentTarget.dataset.fallback === "1") return;
        e.currentTarget.dataset.fallback = "1";
        e.currentTarget.src = placeholder;
      }}
    />


        <div>
          <h2>{title}</h2>
          <p>
            {year && <span>Anno: {year} · </span>}
            {rating != null && <span>⭐ {rating}</span>}
          </p>

          {info && <p style={{ color: "limegreen" }}>{info}</p>}

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {!inWatchlist ? (
              <button onClick={onAdd} disabled={busy} type="button">
                {busy ? "..." : "Aggiungi alla watchlist"}
              </button>
            ) : (
              <button onClick={onRemove} disabled={busy} type="button">
                {busy ? "..." : "Rimuovi dalla watchlist"}
              </button>
            )}

            <Link to="/">← Torna</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
