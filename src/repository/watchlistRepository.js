const KEY = "exam_watchlist_v1";

export function loadWatchlistIds() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveWatchlistIds(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}
