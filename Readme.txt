# StreamHub – Frontend Programming Project

## Descrizione
StreamHub è una web application sviluppata in React che consente di:
- visualizzare contenuti tramite API pubblica
- navigare tra pagine con React Router
- autenticarsi tramite login fake con ruoli USER / ADMIN
- gestire una watchlist
- accedere a una dashboard Admin protetta

Il progetto è stato realizzato seguendo le linee guida del corso di Frontend Programming.

---

## Tecnologie utilizzate
- React
- React Router DOM
- JavaScript (ES6+)
- CSS Modules
- API pubblica (JSONPlaceholder)
- LocalStorage (per autenticazione fake)

---

## Funzionalità principali
- Routing con pagine multiple
- Rotte dinamiche (`/posts/:id`)
- Login fake con ruoli (USER / ADMIN)
- Protezione delle rotte (AdminRoute, ProtectedRoute)
- Watchlist
- Form controllati con validazione
- Layout riutilizzabile
- CSS Modules per stile isolato

---

## Pagine
1. Home
2. Posts (listing + filtro + paginazione)
3. Post Detail
4. Watchlist
5. Login
6. Admin Dashboard (solo ADMIN)

---

## Ruoli
- USER: accesso a Home, Posts, Watchlist
- ADMIN: accesso anche alla pagina Admin

---

## Avvio del progetto
```bash
npm install
npm run dev
