import { createContext, useState } from "react";
import { axiosInstance } from "./../lib/axios";
import { toast } from "react-toastify";
import React from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [postData, setPostData] = useState(null);

  const createPost = async (formData) => {
    try {
      const response = await axiosInstance.post("/posts/create", formData);

      toast.success("Post created successfully!");
      setPostData(response.data);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.message || "Failed to create post!");
    }
  };

  return (
    <BlogContext.Provider value={{ createPost, postData }}>
      {children}
    </BlogContext.Provider>
  );
};
