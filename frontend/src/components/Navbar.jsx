import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaUserCircle, FaBars, FaTimes, FaBell } from "react-icons/fa";
import React from "react";

const Navbar = () => {
  const { user, setUser,logoutUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // New state for notifications

  return (
    <nav className="bg-[url('https://img.freepik.com/free-photo/silhouette-couple-standing-cityscape-sunset-skyscraper-skyline-generative-ai_188544-12597.jpg?ga=GA1.1.792090203.1740631651&semt=ais_hybrid')] bg-cover bg-center bg-no-repeat  text-white px-4 py-4 pb-32 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Logo & Home */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-md md:text-2xl font-bold">
            Marvel <span className="text-red-500">X</span> Anime
          </Link>
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="relative text-xs md:text-2xl px-3 py-1 rounded-lg hover:bg-gray-800 transition text-xl"
          >
            Categories
            {/* Dropdown for Categories */}
            {categoriesOpen && (
              <div className="absolute z-50 left-0 mt-2 w-48 bg-white text-black shadow-xl rounded-lg overflow-hidden border border-gray-200">
                <Link
                  to="/category/marvel"
                  className="block px-5 py-3 text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200"
                >
                  🔥 Marvel
                </Link>
                <Link
                  to="/category/anime"
                  className="block px-5 py-3 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  🎌 Anime
                </Link>
                <Link
                  to="/category/comics"
                  className="block px-5 py-3 text-gray-700 hover:bg-yellow-500 hover:text-white transition-all duration-200"
                >
                  📖 Comics
                </Link>
              </div>
            )}
          </button>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3">
          <input
            type="text"
            placeholder="Search blogs..."
            className="bg-transparent outline-none text-white px-2 py-1"
          />
          <button className="px-3 py-1 text-gray-400 hover:text-white">
            🔍
          </button>
        </div>

        {/* Right - Profile, Notifications & Buttons */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative"
          >
            <FaBell size={24} />
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {/* Badge count can be dynamic */}
            </span>
          </button>

          <Link
            to="/create"
            className="px-3 py-1 hidden md:block  rounded-lg border-2 border-purple-700"
          >
            Create Blog
          </Link>

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-1"
          >
            <FaUserCircle size={24} />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-4 mt-54 w-48 z-50 bg-white text-black shadow-lg rounded-lg">
              <Link
                to='/profile'
                className="block px-4 py-2 hover:bg-gray-200"
              >
                View Profile
              </Link>
              <Link
                to="/my-blogs"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                My Blogs
              </Link>
              <button
                onClick={logoutUser}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-500"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="fixed  inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setMenuOpen(false)} // Close when clicking outside
        >
          <div
            className={`bg-[url('https://img.freepik.com/free-photo/anime-landscape-person-traveling_23-2151038204.jpg?ga=GA1.1.792090203.1740631651&semt=ais_hybrid')] bg-cover bg-center bg-no-repeat  fixed top-0 right-0 h-screen w-64 bg-gray-900 text-white p-6 shadow-xl transform transition-transform ease-in-out duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes size={24} />
            </button>

            {/* Mobile Dropdown */}
            <nav className="relative mt-12 space-y-5 z-10">
              <Link
                to="/"
                className="block text-lg font-semibold hover:text-red-400 transition-all"
              >
                🏠 Home
              </Link>
              <Link
                to="/create"
                className="block text-lg font-semibold hover:text-red-400 transition-all"
              >
                ✍️ Create Blog
              </Link>
              <Link
                to='/profile'
                className="block text-lg font-semibold hover:text-red-400 transition-all"
              >
                👤 Profile
              </Link>
              <Link
                to="/my-blogs"
                className="block text-lg font-semibold hover:text-red-400 transition-all"
              >
                📑 My Blogs
              </Link>
              <button
                onClick={logoutUser}
                className="block w-full text-left text-lg text-red-500 font-semibold hover:text-red-600 transition-all mt-6"
              >
                🚪 Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
