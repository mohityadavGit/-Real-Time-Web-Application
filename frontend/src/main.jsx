import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Authprovider from "./components/context/Authprovider.jsx";
import AllUsersprovider from "./components/context/AllUsersprovider.jsx";
import Socketprovider from "./components/context/Socketprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <AllUsersprovider>
        <Socketprovider>
          <App />
        </Socketprovider>
      </AllUsersprovider>
    </Authprovider>
  </StrictMode>
);
