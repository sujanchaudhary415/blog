import { createContext, useState } from "react";
import React from "react";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize state

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/user/check");
      setUser(res.data);
    } catch (error) {
      console.log("Error in auth check", error);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
