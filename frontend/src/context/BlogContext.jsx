import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./../lib/axios";
import { toast } from "react-toastify";
import React from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [postData, setPostData] = useState([]); // Set default as empty array
  const [idData, setIdData] = useState([]);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/posts/get"); // Adjust the URL to match your backend endpoint
      setPostData(response.data); // Set the posts data in state
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error(error.response?.data?.message || "Failed to fetch posts!");
    }
  };

  // Function to create a new post
  const createPost = async (formData) => {
    try {
      const response = await axiosInstance.post("/posts/create", formData);

      toast.success("Post created successfully!");
      // Append the new post to the existing posts in state
      setPostData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.message || "Failed to create post!");
    }
  };

  const fetchPostById = async (id) => {
    try {
      const response = await axiosInstance.get(`/posts/${id}`);
      setIdData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error(error.response?.data?.message || "Failed to fetch post!");
      return null;
    }
  };

  const addComment = async (postId, commentData) => {
    try {
      const response = await axiosInstance.post(
        `/posts/${postId}/comments`,
        commentData
      );
      toast.success("Comment added successfully!"); 

      // Update the post data with the new comment in state
      setIdData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, response.data], // Assuming response.data contains the new comment
      }));
      console.log(response.data)
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(error.response?.data?.message || "Failed to add comment!");
    }
  };

  return (
    <BlogContext.Provider
      value={{
        createPost,
        fetchPosts,
        postData,
        fetchPostById,
        idData,
        setIdData,
        addComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
