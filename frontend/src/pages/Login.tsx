import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { validateUser } from "../utils/validation";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate user input
    const errors = validateUser(user);
    if (errors.length > 0) {
      errors.forEach(error => {
        toast.error(`${error.field}: ${error.message}`);
      });
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "/users/login",
        user
      );
      
      if (response.data.token) {
        localStorage.setItem("email", JSON.stringify(user.email));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        toast.success("Login successful! Redirecting...", { id: loadingToast });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        (error as any)?.response?.data?.message || "Invalid credentials", 
        { id: loadingToast }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Welcome Back
        </span>
      </h2>

      <p className="text-gray-300 text-center mb-8">
        Log in to continue your blogging journey
      </p>

      <div className="space-y-6 sm:max-w-[50%] mx-auto">
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 disabled:opacity-50"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute right-3 top-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            disabled={isSubmitting}
            onChange={handleChange}
            required
            className="block w-full p-3 pl-5 pr-10 bg-slate-800/50 border border-violet-800 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 disabled:opacity-50"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute right-3 top-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !user.email || !user.password}
        className="w-full sm:max-w-[50%] mx-auto block mt-8 py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
            Logging in...
          </div>
        ) : (
          "Login"
        )}
      </button>

      <p className="mt-8 text-center text-gray-300">
        Don't have an account?{" "}
        <Link 
          to="/register" 
          className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
          tabIndex={isSubmitting ? -1 : 0}
        >
          Register
        </Link>
      </p>
    </form>
  );

}

export default Login;
