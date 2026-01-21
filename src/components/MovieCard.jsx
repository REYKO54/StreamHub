import { useState } from "react";
import styles from "./MovieCard.module.css";
import placeholder from "../assets/posters/placeholder.jpg";

export default function MovieCard({ movie }) {
  const [loaded, setLoaded] = useState(false);

  const title = movie?.title ?? "Untitled";
  const year = movie?.year ?? null;
  const rating = movie?.rating ?? null;

  const posterSrc = movie?.posterKey
    ? `/src/assets/posters/${movie.posterKey}.jpg`
    : placeholder;

  return (
    <article className={styles.card}>
      <div
        className={styles.posterWrap}
        style={{
          backgroundImage: `url(${placeholder})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          className={styles.poster}
          src={posterSrc}
          alt={title}
          loading="lazy"
          decoding="async"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity .15s ease" }}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            if (e.currentTarget.dataset.fallback === "1") return;
            e.currentTarget.dataset.fallback = "1";
            e.currentTarget.src = placeholder;
            setLoaded(true);
          }}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title} title={title}>{title}</h3>
        <div className={styles.meta}>
          {year && <span>{year}</span>}
          {rating != null && <span>⭐ {rating}</span>}
        </div>
      </div>
    </article>
  );
}
