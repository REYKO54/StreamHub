const KEY = "exam_movies_v1";

function seed() {
  if (!localStorage.getItem(KEY)) {
    saveItems([
      { id: 1, title: "Interstellar", year: 2014, rating: 8.6, posterKey: "interstellar" },
      { id: 2, title: "Inception", year: 2010, rating: 8.8, posterKey: "inception" },
      { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, posterKey: "darkknight" },
      { id: 4, title: "Dune", year: 2021, rating: 8.0, posterKey: "dune" },
    ]);
  }
}

export function loadItems() {
  seed();
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export async function fetchTrendingMovies() {
  return loadItems();
}

export async function fetchMovieById(id) {
  const items = loadItems();
  return items.find((m) => String(m.id) === String(id)) ?? null;
}
