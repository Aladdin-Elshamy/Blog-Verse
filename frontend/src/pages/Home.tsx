import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { Blog } from "../interfaces";
import toast, { Toaster } from "react-hot-toast";

function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingToast = toast.loading("Loading blogs...");
    
    axios
      .get("/blogs/all")
      .then((response) => {
        setBlogs(response.data);
        setFilteredBlogs(response.data);
        toast.success("Blogs loaded successfully!", { id: loadingToast });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load blogs: " + (error as Error).message, { id: loadingToast });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setIsSearching(true);
      const loadingToast = toast.loading("Searching blogs...");

      try {
        const response = await axios.get(
          `/blogs/search?query=${encodeURIComponent(
            searchQuery
          )}`
        );
        setFilteredBlogs(response.data);
        toast.success(
          `Found ${response.data.length} result${response.data.length !== 1 ? 's' : ''}`, 
          { id: loadingToast }
        );
        navigate(`/?search=${encodeURIComponent(searchQuery)}`, {
          replace: true,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to search blogs: " + (error as Error).message, { id: loadingToast });
      } finally {
        setIsSearching(false);
      }
    } else {
      setFilteredBlogs(blogs);
      navigate("/", { replace: true });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredBlogs(blogs);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-violet-950 py-24 px-4">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#9533e8',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 pt-20 sm:pt-10 text-white text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Discover Amazing Blogs
          </span>
        </h1>

        <div className="max-w-lg mx-auto mb-12 text-center">
          <p className="text-gray-300 text-lg mb-6">
            Explore the latest articles from our community of writers and
            thinkers
          </p>

          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-lg mx-auto mb-8 min-w-0"
          >
            <input
              type="text"
              placeholder="Search blogs..."
              className="min-w-0 flex-grow px-4 py-3 rounded-l-lg border-0 outline-none bg-gray-800 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              type="submit"
              className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-r-lg hover:from-purple-600 hover:to-pink-600 transition duration-200"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Search Status */}
          {searchQuery && (
            <div className="text-gray-300 mb-6 flex justify-center items-center space-x-2">
              <span>Showing results for "{searchQuery}"</span>
              <button
                onClick={handleClearSearch}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white text-xl">Loading blogs...</div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-300 py-12">
            <p className="text-xl mb-2">No blogs found</p>
            <p className="text-gray-400">
              {searchQuery ? "Try a different search term" : "Be the first to create a blog!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
