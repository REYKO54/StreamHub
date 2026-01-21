import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Posts from "./pages/Posts.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Login from "./pages/Login.jsx";
import Watchlist from "./pages/Watchlist.jsx";

// Security
import ProtectedRoute from "./security/ProtectedRoute.jsx";
import AdminRoute from "./security/AdminRoute.jsx";

// Other
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./exception/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },

      { path: "posts", element: <Posts /> },
      { path: "posts/:id", element: <PostDetail /> },

      { path: "movies/:id", element: <MovieDetail /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: "watchlist", element: <Watchlist /> }],
      },

      {
        element: <AdminRoute />,
        children: [{ path: "admin", element: <AdminDashboard /> }],
      },
    ],
  },
]);
