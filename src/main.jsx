import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { Web3ContextProvider } from "./context/Web3Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <Web3ContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Web3ContextProvider>
  </AuthContextProvider>
);
