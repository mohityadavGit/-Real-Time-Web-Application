import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      // ✅ Redirect to login page
      navigate("/login");

      // 🔃 Optional: Full reload if you want to clear app state
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#1e1e1e] via-gray-900 to-black text-white w-full h-[10vh] flex items-center justify-center space-x-3 shadow-inner">
      <button
        onClick={handleLogout}
        className="bg-slate-700 p-3 rounded-full hover:bg-red-700 transition duration-200 text-2xl text-green-400"
        title="Logout App unauthorized ho jaenge"
      >
        <BiLogOutCircle />
      </button>
      <span className="text-sm font-bold text-green-200">Logout</span>
    </div>
  );
}

export default Logout;
