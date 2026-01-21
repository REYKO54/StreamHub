import { loadWatchlistIds, saveWatchlistIds } from "../repository/watchlistRepository.js";

export function getWatchlist() {
  return loadWatchlistIds();
}

export function isInWatchlist(movieId) {
  const id = String(movieId);
  return loadWatchlistIds().some((x) => String(x) === id);
}

export function addToWatchlist(movieId) {
  const id = String(movieId ?? "").trim();
  if (!id) throw new Error("movieId mancante");

  const list = loadWatchlistIds();
  if (list.some((x) => String(x) === id)) return; // già presente

  saveWatchlistIds([id, ...list]);
}

export function removeFromWatchlist(movieId) {
  const id = String(movieId ?? "").trim();
  if (!id) throw new Error("movieId mancante");

  const list = loadWatchlistIds().filter((x) => String(x) !== id);
  saveWatchlistIds(list);
}
