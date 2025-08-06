import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === "/blog/:id") console.log("hi");
  console.log(location.pathname.includes("/blog/"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    
    toast.success("Logged out successfully!", {
      style: {
        background: '#333',
        color: '#fff',
      },
      iconTheme: {
        primary: '#9533e8',
        secondary: '#fff',
      },
    });
    
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  if (location.pathname.includes("/blog/")) {
    return (
      <nav className="flex-col sm:flex-row bg-gradient-to-r from-violet-900 to-purple-800 px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold block text-white hover:text-purple-200 transition-colors duration-300"
        >
          <span className="text-purple-300">Blog</span>Verse
        </Link>

        {token ? (
          <div className="flex items-center gap-4 pt-4 sm:pt-0">
            <Link
              to="/my-blogs"
              className="text-white hover:text-purple-200 transition-colors"
            >
              My Blogs
            </Link>
            <Link
              to="/create"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Regitser
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-purple-200 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 pt-4 sm:pt-0">
            <Link
              to="/login"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    );
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <nav
        className={`flex-col sm:flex-row container mx-auto max-w-6xl bg-gradient-to-r from-violet-900 to-purple-900 backdrop-blur-lg rounded-xl shadow-2xl flex items-center justify-between p-4`}
      >
        <Link
          to="/"
          className="text-xl font-bold block text-white hover:text-purple-200 transition-colors duration-300"
        >
          <span className="text-purple-300">Blog</span>Verse
        </Link>

        <div className="flex items-center pt-4 sm:pt-0 gap-2 md:gap-4">
          {token ? (
            <>
              <Link
                to="/my-blogs"
                className="px-3 py-2 text-white hover:text-purple-200 transition-colors duration-300 text-sm md:text-base"
              >
                My Blogs
              </Link>
              <Link
                to="/create"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 text-sm md:text-base"
              >
                Create Blog
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-white hover:text-purple-200 transition-colors duration-300 text-sm md:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 text-sm md:text-base"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
