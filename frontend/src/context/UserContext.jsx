import { createContext, useState } from "react";
import React from "react";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize state
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/user/check"); // Ensure `withCredentials` is enabled
      console.log("Auth Response:", res.data);
      setUser(res.data); // Store user data if authenticated
      setIsCheckingAuth(false);
    } catch (error) {
      console.log("Error in auth check", error);
      setUser(null); // Ensure user state is set to null if not authenticated
    } finally {
      setIsCheckingAuth(false);
    }
  };
  

  const registerUser = async (userData) => {
    try {
      const response = await axiosInstance.post("/user/register", userData);
      setUser(response.data);
      toast.success("Registration successful!");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed!");
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axiosInstance.post("/user/login", userData);
      setUser(response.data);
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error("Login failed!");
    }
  };

  const logoutUser = async () => {
    try {
      await axiosInstance.post("/user/logout");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed!");
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      const response = await axiosInstance.put("/user/updateProfile", userData);
      setUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed!");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        checkAuth,
        isCheckingAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
