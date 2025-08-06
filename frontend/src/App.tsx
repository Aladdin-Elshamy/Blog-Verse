import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import BlogDetails from "./pages/BlogDetails";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/my-blogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
