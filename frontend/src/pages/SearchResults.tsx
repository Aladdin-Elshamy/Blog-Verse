import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Blog } from "../interfaces";

function SearchResults() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/search?q=${query}`)
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {blogs.length > 0 ? (
        blogs.map(blog => <BlogCard key={blog._id} {...blog} />)
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
