import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Blog } from "../interfaces";
import toast, { Toaster } from "react-hot-toast";

function MyBlogs() {
  const [, setBlogs] = useState<string[]>([]);
  const [blogsData, setBlogsData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = localStorage.getItem("email")?.length
    ? JSON.parse(localStorage.getItem("email")!)
    : {};

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const loadingToast = toast.loading("Fetching your blogs...");
      try {
        const [usersResponse, blogsResponse] = await Promise.all([
          axios.get(`/users/getAll`),
          axios.get(`/blogs/all`)
        ]);

        const targetUser = usersResponse.data.find(
          (user: any) => user.email === email
        );

        if (!targetUser) {
          toast.error("User not found");
          return;
        }

        setBlogs(targetUser.blogs);
        
        const filteredBlogs = blogsResponse.data.filter((blog: Blog) => {
          return blog.author.email === email;
        });
        setBlogsData(filteredBlogs);
        toast.success("Blogs loaded successfully!", { id: loadingToast });
      } catch (error) {
        toast.error("Error loading blogs: " + (error as Error).message, { id: loadingToast });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

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
            My Blogs
          </span>
        </h1>
        <p className="text-gray-300 text-lg text-center mb-6">
          Welcome to your blog dashboard! Here you can manage and edit your own
          blogs.
        </p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white text-xl">Loading your blogs...</div>
          </div>
        ) : blogsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogsData.map((blog) => (
              <BlogCard
                key={blog._id}
                {...blog}
                canEdit={true}
                canDelete={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-white text-3xl w-full text-center">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
