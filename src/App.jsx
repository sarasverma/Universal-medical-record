import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import New from "./pages/New";
import Access from "./pages/Access";
import Notification from "./pages/Notification";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        {currentUser && <Navbar />}
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <New />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Access"
            element={
              <ProtectedRoute>
                <Access />
              </ProtectedRoute>
            }
          />

          <Route
            path="/new/:email/"
            element={
              <ProtectedRoute>
                <New />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
