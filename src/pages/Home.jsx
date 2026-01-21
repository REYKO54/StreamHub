// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPosts } from "../external/jsonPlaceholderApi.js";
import { fetchTrendingMovies } from "../admin/adminRepo.js";

import MovieCard from "../components/MovieCard.jsx";
import styles from "../styles/home.module.css";

function MotionCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  // --- POSTS
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  // --- MOVIES
  const [movies, setMovies] = useState([]);
  const [moviesErr, setMoviesErr] = useState("");
  const [moviesLoading, setMoviesLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setErr("");
        setLoading(true);

        const data = await getPosts();
        if (!alive) return;
        setPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message ?? "Errore caricamento");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // Fetch trending movies (e-commerce style)
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setMoviesErr("");
        setMoviesLoading(true);

        const data = await fetchTrendingMovies();
        if (!alive) return;

        const list = Array.isArray(data) ? data : (data?.items ?? []);
        setMovies(Array.isArray(list) ? list.slice(0, 8) : []);
      } catch (e) {
        if (!alive) return;

        // fallback DEMO: così la Home funziona anche senza backend
        setMovies([
          { id: 1, title: "Interstellar", year: 2014, rating: 8.6, posterUrl: "" },
          { id: 2, title: "Inception", year: 2010, rating: 8.8, posterUrl: "" },
          { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, posterUrl: "" },
          { id: 4, title: "Dune", year: 2021, rating: 8.0, posterUrl: "" },
        ]);
        setMoviesErr(e?.message ?? "Errore caricamento film");
      } finally {
        if (!alive) return;
        setMoviesLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const featured = useMemo(() => posts.slice(0, 3), [posts]);
  const latest = useMemo(() => posts.slice(0, 8), [posts]);

  const searched = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return posts
      .filter((p) => (p?.title ?? "").toLowerCase().includes(t))
      .slice(0, 6);
  }, [posts, q]);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>StreamHub</h1>
        <p className={styles.subtitle}>
          Cerca contenuti, apri i dettagli e salva nella watchlist.
        </p>

        <div className={styles.searchRow}>
          <input
            type="search"
            aria-label="Cerca post per titolo"
            className={styles.input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca per titolo (min 2 caratteri)"
          />
          <Link to="/posts">Vai ai post</Link>
        </div>

        {q.length === 1 && (
          <div className={styles.inlineError}>Inserisci almeno 2 caratteri</div>
        )}

        {q.trim().length >= 2 && (
          <>
            <h3 className={styles.subTitle}>Risultati</h3>

            {searched.length === 0 ? (
              <p className={styles.inlineError}>
                Nessun risultato per “{q.trim()}”.
              </p>
            ) : (
              <div className={styles.grid}>
                {searched.map((p) => (
                  <MotionCard key={p.id}>
                    <Link to={`/posts/${p.id}`} className={styles.card}>
                      <div className={styles.cardTitle}>
                        {(p.title ?? "").slice(0, 60)}
                      </div>
                      <div className={styles.cardText}>
                        {(p.body ?? "").slice(0, 80)}...
                      </div>
                    </Link>
                  </MotionCard>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ✅ MOVIES SECTION */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>Trending Movies</h2>
          <span style={{ opacity: 0.85, fontSize: 14 }}>
            {moviesLoading ? "Caricamento..." : `${movies.length} titoli`}
          </span>
        </div>

        {moviesErr && (
          <p className={styles.error}>{moviesErr} (mostro dati demo)</p>
        )}

        <div className={styles.moviesGrid}>
          {movies.map((m) => {
            const movieId = m.id ?? m.movieId;
            return (
              <Link
                key={movieId}
                to={`/movies/${movieId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MovieCard movie={m} />
              </Link>
            );
          })}
        </div>
      </section>

      {loading && <p>Caricamento...</p>}
      {err && <p className={styles.error}>{err}</p>}

      {!loading && !err && (
        <>
          <section>
            <div className={styles.sectionHeader}>
              <h2 className={styles.h2}>Featured</h2>
              <Link to="/posts">Vedi tutti</Link>
            </div>

            <div className={`${styles.grid} ${styles.gridFeatured}`}>
              {featured.map((p) => (
                <MotionCard key={p.id}>
                  <div className={styles.cardBox}>
                    <div className={styles.cardTitleStrong}>
                      {(p.title ?? "").slice(0, 70)}
                    </div>
                    <div className={styles.cardText}>
                      {(p.body ?? "").slice(0, 110)}...
                    </div>
                    <Link to={`/posts/${p.id}`}>Apri dettaglio</Link>
                  </div>
                </MotionCard>
              ))}
            </div>
          </section>

          <section>
            <h2 className={styles.h2}>Ultimi aggiunti</h2>
            <div className={styles.list}>
              {latest.map((p) => (
                <MotionCard key={p.id}>
                  <Link to={`/posts/${p.id}`} className={styles.card}>
                    <div className={styles.cardTitle}>{p.title}</div>
                    <div className={styles.cardText}>
                      {(p.body ?? "").slice(0, 90)}...
                    </div>
                  </Link>
                </MotionCard>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
