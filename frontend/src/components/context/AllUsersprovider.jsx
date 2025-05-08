import React, { useState, useEffect } from "react";
import AllUserscontext from "./AllUserscontext";
import axios from "axios";

function AllUsersprovider({ children }) {
  const [AllUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getAllUsers`, {
          withCredentials: true,
        });
        setAllUsers(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AllUserscontext.Provider value={{ AllUsers, loading, setLoading, error }}>
      {children}
    </AllUserscontext.Provider>
  );
}

export default AllUsersprovider;
