import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import AnimePage from "./pages/AnimePage";
import AnimeDescriptionPage from "./pages/AnimeDescriptionPage";
import MarvelPage from "./pages/MarvelPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const { user,checkAuth } = useContext(UserContext);
  const location = useLocation(); // Hook to get the current location

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  // Conditionally render Navbar based on the path
  const showNavbar = !["/login", "/signup"].includes(location.pathname);

  return (
    <div className="relative">
      <ToastContainer />
      {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        {/* Routes for category pages and anime details */}
        <Route
          path="/category/marvel"
          element={
            <div className="absolute top-1/4 left-1/2 mt-12 transform -translate-x-1/2 w-full max-w-6xl">
               {user ? <MarvelPage /> : <Navigate to="/login"/>}
            </div>
          }
        />
        <Route
          path="/category/anime"
          element={
            <div className="absolute top-1/4 left-1/2 mt-12 transform -translate-x-1/2 w-full max-w-6xl">
              {user ? <AnimePage /> : <Navigate to="/login"/>}
            </div>
          }
        />
        <Route
          path="/anime/:id"
          element={
            <div className="absolute top-1/4 left-1/2 mt-12 transform -translate-x-1/2 w-full max-w-6xl">
              <AnimeDescriptionPage />
            </div>
          }
        />

        {/* HomePage and login/signup redirects */}
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />} 
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
};

export default App;
