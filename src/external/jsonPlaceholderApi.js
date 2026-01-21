const BASE_URL = "https://jsonplaceholder.typicode.com";

// lista post (tipo prodotti demo)
export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) {
    throw new Error("Errore caricamento posts");
  }
  return res.json();
}

// singolo post
export async function getPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) {
    throw new Error("Post non trovato");
  }
  return res.json();
}

// commenti del post
export async function getPostComments(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}/comments`);
  if (!res.ok) {
    throw new Error("Errore caricamento commenti");
  }
  return res.json();
}
