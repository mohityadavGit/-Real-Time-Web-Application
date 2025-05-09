import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Authcontext from "./components/context/Authcontext";
import Left from "./components/Left";
import Right from "./components/Right";
import Signup from "./components/AuthPages/Signup";
import Login from "./components/AuthPages/Login";
import Loading from "./components/Loading";

const App = () => {
  const [Authuser, , loading] = useContext(Authcontext);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              Authuser ? (
                <div className="flex flex-col md:flex-row h-screen">
                  <Left />
                  <Right />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={Authuser ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
