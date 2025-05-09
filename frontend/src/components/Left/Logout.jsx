import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f766e] text-white w-full h-[10vh] flex items-center justify-between px-6 shadow-inner">
      <span className="text-lg font-bold text-teal-200">Connected</span>
      <button
        onClick={handleLogout}
        className="bg-slate-800 p-3 rounded-full hover:bg-red-700 transition duration-200 text-2xl text-teal-400"
        title="Logout"
      >
        <BiLogOutCircle />
      </button>
    </div>
  );
}

export default Logout;
