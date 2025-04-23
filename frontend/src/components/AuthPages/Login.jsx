import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Authcontext from "../context/Authcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import toast from "react-hot-toast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [Authuser, setAuthuser] = useContext(Authcontext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    try {
      // Login request
      const response = await axios.post(
        "http://localhost:3001/login",
        loginData,
        { withCredentials: true } // Ensure cookies are sent
      );

      // Store user data and token in localStorage
      localStorage.setItem("LoginUserData", JSON.stringify(response.data));
      localStorage.setItem("authToken", response.data.token); // Store token if available in response

      // Update Authuser context with the user data
      setAuthuser(response.data);

      // Optionally, you can refresh the page after login to load protected data
      window.location.reload();

      toast.success("Login successful ✅");
    } catch (error) {
      console.error("Error occurred during Login:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/10 shadow-lg rounded-3xl p-10 w-full max-w-sm border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">
          Welcome Back 👋
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm text-indigo-100 mb-1 block"
            >
              Email Address
            </label>
            <input
              type="email"
              id="login-email"
              name="email"
              {...register("email", { required: true })}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-pink-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {errors.email && <p>Email is required.</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm text-indigo-100 mb-1 block"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
              placeholder="••••••••"
              name="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 text-white placeholder-pink-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-indigo-100 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
            {errors.password && <p>Password is required.</p>}
          </div>

          <div className="text-sm text-gray-600 mt-4 text-center">
            <p>
              New user?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
