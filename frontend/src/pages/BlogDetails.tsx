import { useLocation } from "react-router-dom";

function BlogDetails() {
  const {
    state: { blog },
  } = useLocation();

  if (!blog) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="relative w-full h-96">
        <img
          src={blog.photo}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent"></div>

        {/* Title and author overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center mt-4 space-x-4">
            <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {blog.author?.name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-medium">{blog.author?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900/70 w-full py-4">
        <div className="container mx-auto px-8 flex flex-wrap gap-2">
          {blog.tags.map((tag:string, index:number) => (
            <span
              key={index}
              className="px-4 py-1 bg-purple-800/60 text-purple-200 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-grow bg-indigo-950 text-gray-200">
        <div className="container mx-auto px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed whitespace-pre-line break-words">
              {blog.body}
            </p>

            {/* Interactive elements */}
            <div className="mt-16 pt-6 border-t border-purple-800/30 flex justify-between items-center">
              <div className="text-gray-400">
                Published on {new Date(blog.createdAt).toDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
