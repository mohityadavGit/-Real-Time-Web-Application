import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Context
import Authcontext from "./components/context/Authcontext";

// Pages & Components
import Left from "./components/Left";
import Right from "./components/Right";
import Signup from "./components/AuthPages/Signup";
import Login from "./components/AuthPages/Login";
import Loading from "./components/Loading";

const App = () => {
  const [Authuser, setAuthuser, loading] = useContext(Authcontext);
  console.log("ye mera auth user hai ", Authuser);

  // Wait for loading to finish before rendering anything
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Protected Home Route */}
          <Route
            path="/"
            element={
              Authuser ? (
                <div className="flex flex-row h-screen">
                  <Left />
                  <Right />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={Authuser ? <Navigate to="/" replace /> : <Login />}
          />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster></Toaster>
    </>
  );
};

export default App;
