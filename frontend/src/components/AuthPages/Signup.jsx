import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import Authcontext from "../context/Authcontext";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [Authuser, setAuthuser] = useContext(Authcontext);
  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const signupData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${apiUrl}/signup`, signupData, {
        withCredentials: true,
      });
      toast.success("Signup successful ✅");
      console.log("Server Response:", JSON.stringify(response.data));

      localStorage.setItem("SignupUserData", JSON.stringify(response.data));
      setAuthuser(response.data);
    } catch (error) {
      toast.error("Error occurred during signup:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4f46e5] via-[#ec4899] to-[#f97316] p-4">
      <div className="backdrop-blur-xl bg-white/10 shadow-xl rounded-3xl p-10 w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-[#311d0b] text-center mb-6 drop-shadow-lg">
          Create an Account
          {/* Branding Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[#663300]">
              Welcome to <span className="text-[#a0522d]">Sarathi Sandesh</span>
            </h1>
            <p className="text-sm text-[#7a5e3c] italic mt-2">
              Dialogue. Guidance. Clarity.
            </p>
          </div>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm mb-1 font-semibold  text-black"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Mohit Yadav"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-800 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {errors.name && (
              <p className="text-sm text-red-300 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold  text-black mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="yadavstuntboy@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-pink-100 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {errors.email && (
              <p className="text-sm text-red-300 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold  text-black mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="mohit@123#"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 pr-10 bg-white/20 text-white placeholder-pink-100 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-indigo-100 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
            {errors.password && (
              <p className="text-sm text-red-300 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold  text-black mb-1"
            >
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full px-4 py-2 pr-10 bg-white/20 text-white placeholder-pink-100 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-[42px] text-indigo-100 cursor-pointer"
            >
              {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
            {errors.confirmPassword && (
              <p className="text-sm text-red-300 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="text-sm text-gray-600 mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition duration-200"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
