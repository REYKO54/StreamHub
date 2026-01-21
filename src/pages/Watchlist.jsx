import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/watchlist.css";

const KEY = "exam_favorites_v1";

function loadFavIds() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
function saveFavIds(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

export default function Watchlist() {
  const posts = useSelector((s) => s.posts.items);

  const [favIds, setFavIds] = useState([]);
  const [postId, setPostId] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setFavIds(loadFavIds());
  }, []);

  const parsedId = useMemo(() => {
    const t = postId.trim();
    if (!t) return null;
    const n = Number(t);
    if (!Number.isFinite(n) || n <= 0) return null;
    return String(n);
  }, [postId]);

  const favPosts = useMemo(() => {
    const set = new Set(favIds.map(String));
    return posts.filter((p) => set.has(String(p.id)));
  }, [posts, favIds]);

  const onAdd = (e) => {
    e.preventDefault();
    setErr("");

    if (!parsedId) {
      setErr("Insert a valid numeric postId (e.g. 1).");
      return;
    }

    const existsInApi = posts.some((p) => String(p.id) === parsedId);
    if (!existsInApi) {
      setErr("That postId does not exist in the loaded posts.");
      return;
    }

    const next = Array.from(new Set([...favIds.map(String), parsedId]));
    setFavIds(next);
    saveFavIds(next);
    setPostId("");
  };

  const onRemove = (id) => {
    const next = favIds.filter((x) => String(x) !== String(id));
    setFavIds(next);
    saveFavIds(next);
  };

  return (
    <div className="watchlist">
      <h1>Favorites</h1>

      {err && (
        <p role="alert" className="error">
          {err}
        </p>
      )}

      <form onSubmit={onAdd} className="watchlist-form">
        <input
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          placeholder="postId (e.g. 1)"
          inputMode="numeric"
          aria-label="postId"
        />
        <button type="submit" disabled={!postId.trim()}>
          Add
        </button>
      </form>

      {favPosts.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="watchlist-list">
          {favPosts.map((p) => (
            <li key={p.id} className="watchlist-item">
              <span>{p.title}</span>
              <button type="button" onClick={() => onRemove(p.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
