import { useEffect, useMemo, useState } from "react";
import { loadItems, saveItems } from "../admin/adminRepo";
import "../styles/admin.css";

function validateTitle(title) {
  const t = title.trim();
  if (t.length < 3) return "Title must be at least 3 characters.";
  return "";
}
function validateDesc(desc) {
  const t = desc.trim();
  if (t.length < 10) return "Description must be at least 10 characters.";
  return "";
}

export default function AdminDashboard() {
  const [items, setItems] = useState([]);

  // Form #3: Create
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Form #4: Edit
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [err, setErr] = useState("");

  useEffect(() => {
    setItems(loadItems());
  }, []);

  const sorted = useMemo(
    () => [...items].sort((a, b) => b.createdAt - a.createdAt),
    [items]
  );

  const onCreate = (e) => {
    e.preventDefault();
    setErr("");

    const tErr = validateTitle(newTitle);
    const dErr = validateDesc(newDesc);
    if (tErr || dErr) {
      setErr(tErr || dErr);
      return;
    }

    const next = [
      {
        id: crypto.randomUUID(),
        title: newTitle.trim(),
        desc: newDesc.trim(),
        createdAt: Date.now(),
      },
      ...items,
    ];

    setItems(next);
    saveItems(next);
    setNewTitle("");
    setNewDesc("");
  };

  const startEdit = (item) => {
    setErr("");
    setEditId(item.id);
    setEditTitle(item.title);
    setEditDesc(item.desc);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
  };

  const onEdit = (e) => {
    e.preventDefault();
    setErr("");

    const tErr = validateTitle(editTitle);
    const dErr = validateDesc(editDesc);
    if (tErr || dErr) {
      setErr(tErr || dErr);
      return;
    }

    const next = items.map((it) =>
      it.id === editId
        ? { ...it, title: editTitle.trim(), desc: editDesc.trim() }
        : it
    );

    setItems(next);
    saveItems(next);
    cancelEdit();
  };

  const onDelete = (id) => {
    const next = items.filter((it) => it.id !== id);
    setItems(next);
    saveItems(next);
    if (editId === id) cancelEdit();
  };

  return (
    <div className="admin">
      <h1>Admin dashboard</h1>

      {err && (
        <p role="alert" className="error">
          {err}
        </p>
      )}

      <h2>Create announcement</h2>
      <form onSubmit={onCreate} className="admin-form">
        <label className="admin-field">
          <span>Title</span>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </label>

        <label className="admin-field">
          <span>Description</span>
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            rows={4}
            required
          />
        </label>

        <button type="submit">Create</button>
      </form>

      <hr className="admin-sep" />

      <h2>Existing announcements</h2>

      {sorted.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul className="admin-list">
          {sorted.map((it) => (
            <li key={it.id} className="admin-item">
              <b>{it.title}</b>
              <span>{it.desc}</span>

              <div className="admin-actions">
                <button type="button" onClick={() => startEdit(it)}>
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(it.id)}>
                  Delete
                </button>
              </div>

              {editId === it.id && (
                <form onSubmit={onEdit} className="admin-form admin-edit">
                  <label className="admin-field">
                    <span>Title</span>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                    />
                  </label>

                  <label className="admin-field">
                    <span>Description</span>
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      rows={4}
                      required
                    />
                  </label>

                  <div className="admin-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
