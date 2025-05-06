import React, { useState, useEffect } from "react";
import axios from "axios";
import Authcontext from "./Authcontext";

function Authprovider({ children }) {
  const [Authuser, setAuthuser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${apiUrl}/auth/check`, {
          withCredentials: true,
        });

        console.log("✅ Auth verified:", res.data);
        setAuthuser(res.data.user); // server ne user diya
      } catch (err) {
        console.warn("❌ Not authenticated:", err.response?.data);
        setAuthuser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Authcontext.Provider value={[Authuser, setAuthuser, loading]}>
      {children}
    </Authcontext.Provider>
  );
}

export default Authprovider;
