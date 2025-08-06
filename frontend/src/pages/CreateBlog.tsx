import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { validateBlog } from "../utils/validation";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    body: "",
    photo: "",
    tags: [""],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState("");
  const email = localStorage.getItem("email")?.length
    ? JSON.parse(localStorage.getItem("email")!)
    : {};

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setBlog({ ...blog, tags: value.split(",").map((tag) => tag.trim()) });
    } else {
      setBlog({ ...blog, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate the blog data
    const errors = validateBlog(blog);
    if (errors.length > 0) {
      errors.forEach(error => {
        toast.error(`${error.field}: ${error.message}`);
      });
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating your blog...");

    try {
      await axios.post("/blogs/create", {
        ...blog,
        author: userId,
      });
      
      toast.success("Blog created successfully!", { id: loadingToast });
      setTimeout(() => {
        navigate("/my-blogs");
      }, 1000);
    } catch (error) {
      toast.error("Failed to create blog: " + (error as Error).message, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    axios
      .get("/users/getAll")
      .then((response) => {
        const user = response.data.find(
          (user: { email: string }) => user.email === email
        );
        setUserId(user._id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-violet-950 py-24 px-4"
    >
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
      <h2 className="font-bold mb-6 text-white text-3xl pt-20 sm:pt-10 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Welcome to BlogVerse
        </span>
      </h2>

      <p className="text-gray-300 text-center mb-8">
        Create a blog and share your thoughts with the world
      </p>

      <div className="space-y-6 sm:max-w-[50%] mx-auto">
        <div className="relative">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          />
        </div>
        <div className="relative">
          <textarea
            name="body"
            placeholder="Body"
            onChange={handleChange}
            required
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          ></textarea>
        </div>

        <div className="relative">
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            onChange={handleChange}
            required
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            onChange={handleChange}
            required
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full sm:max-w-[50%] disabled:opacity-40 mx-auto block mt-8 py-3 px-6 ${
          blog.title === "" &&
          blog.body === "" &&
          blog.photo === "" &&
          blog.tags.join("") === ""
            ? "bg-purple-600 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        }`}
      >
        {isSubmitting ? "Creating Blog..." : "Submit"}
      </button>
    </form>
  );
}

export default CreateBlog;
