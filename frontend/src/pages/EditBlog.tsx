import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    body: "",
    photo: "",
    tags: [""],
  });
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
    try {
      await axios.put(`/blogs/${id}`, {
        ...blog,
      });
      alert(
        "You have successfully Updated a Blog and can go to my blogs Page to see it"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-violet-950 py-24 px-4"
    >
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
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          />
        </div>
        <div className="relative">
          <textarea
            name="body"
            placeholder="Body"
            onChange={handleChange}
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          ></textarea>
        </div>

        <div className="relative">
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            onChange={handleChange}
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            onChange={handleChange}
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          />
        </div>
      </div>
      <button
        disabled={
          blog.title === "" &&
          blog.body === "" &&
          blog.photo === "" &&
          blog.tags.join("") === ""
        }
        type="submit"
        className={`w-full sm:max-w-[50%] disabled:opacity-40 mx-auto block mt-8 py-3 px-6 ${
          blog.title === "" &&
          blog.body === "" &&
          blog.photo === "" &&
          blog.tags.join("") === ""
            ? "bg-purple-600 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        }`}
      >
        Save
      </button>
    </form>
  );
}

export default EditBlog;
