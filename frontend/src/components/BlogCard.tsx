import { Link } from "react-router-dom";
import type { Blog } from "../interfaces";
import axios from "axios";
import toast from "react-hot-toast";

interface BlogCardProps extends Blog {
  canEdit?: boolean;
  canDelete?: boolean;
}
function BlogCard({
  title,
  body,
  photo,
  _id,
  author,
  tags,
  createdAt,
  canEdit,
  canDelete,
}: BlogCardProps) {
  const blog = { title, body, photo, _id, author, tags, createdAt };
  
  async function handleDelete() {
    const loadingToast = toast.loading("Deleting blog...");
    try {
      await axios.delete(`/blogs/${_id}`);
      toast.success("Blog deleted successfully!", { id: loadingToast });
      // Use a small delay before reload to show the success message
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Error deleting blog: " + (error as Error).message, { id: loadingToast });
    }
  }
  return (
    <div className="bg-gradient-to-br from-violet-900 to-slate-900 rounded-xl overflow-hidden shadow-xl transform transition-transform hover:scale-105 duration-300">
      <div className="relative">
        <img src={photo} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
              {author?.name[0]}
            </div>
            <p className="text-white text-sm">{author?.name}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-3">
          {body.substring(0, 120)}...
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-violet-800/50 text-violet-200 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {canEdit && canDelete && (
          <div className="flex justify-center mb-2 gap-2">
            <Link
              to={`/edit/${_id}`}
              state={{ blog }}
              className="bg-indigo-400 flex-1 text-center hover:bg-indigo-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete()}
              className="bg-pink-400 flex-1 text-center hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        )}
        <Link
          to={`/blog/${_id}`}
          state={{ blog }}
          className={`inline-block ${
            canEdit || canDelete ? "w-full text-center" : ""
          } bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
