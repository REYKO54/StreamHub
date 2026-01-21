import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postsSlice";
import { Link } from "react-router-dom";
import "../styles/posts.css";

export default function Posts() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.posts);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.title.toLowerCase().includes(q));
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  const onPrev = () => setPage((p) => Math.max(1, p - 1));
  const onNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="posts">
      <h1>Posts</h1>

      <label className="posts-filter">
        <span>Filter by title</span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="type to filter..."
        />
      </label>

      {status === "loading" && <p>Loading...</p>}

      {status === "failed" && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {status === "succeeded" && (
        <>
          <p className="posts-meta">
            Showing {filtered.length} result(s) — page {safePage}/{totalPages}
          </p>

          <ul className="posts-list">
            {pageItems.map((p) => (
              <li key={p.id} className="posts-item">
                <Link to={`/posts/${p.id}`}>{p.title}</Link>
              </li>
            ))}
          </ul>

          <div className="posts-pagination">
            <button onClick={onPrev} disabled={safePage === 1}>
              Prev
            </button>
            <button onClick={onNext} disabled={safePage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
