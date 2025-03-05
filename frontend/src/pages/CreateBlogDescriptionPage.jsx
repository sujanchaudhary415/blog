import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";


const CreateBlogDescriptionPage = () => {
  const { fetchPostById, idData, loading, addComment } =
    useContext(BlogContext);
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  const { user } = useContext(UserContext);

  // Fetch the blog details using the ID from the URL
  useEffect(() => {
    if (id) {
      fetchPostById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold">
        Loading blog details...
      </p>
    );
  }

  if (!idData) {
    return (
      <p className="text-center text-xl font-semibold">No details available.</p>
    );
  }
  console.log(user)

  // Handle comment submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    const commentData = {
      text: commentText,
    };

    if (user?._id) {
      await addComment(id, commentData); // Wait for comment to be added
      setCommentText("");
      fetchPostById(id); // Refresh comments after submitting
    } else {
      toast.error("You need to be logged in to comment.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 rounded-lg flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 py-4">
        {idData.title}
      </h1>
      <p className="pb-2">{idData.aired}</p>
      <p className="flex items-center gap-2 py-4 font-semibold text-lg">
        Uploaded By: {idData.createdBy?.name}
        <span>
          <img
            src={user?.profilePicture}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </span>
      </p>
      {idData.image && (
        <img
          src={idData.image}
          alt={idData.title}
          className="w-full max-w-md mb-6 rounded"
        />
      )}
      <div className="text-center text-lg font-semibold text-gray-700">
        <p className="text-sm text-center">
          <span className="font-bold ">Synopsis:</span> {idData.synopsis}
        </p>
        <p className="text-red-500">
          <span className="font-bold">Score:</span> {idData.score || "N/A"}
        </p>
        <div className="flex items-center justify-center gap-6">
          <p className="mt-2 text-gray-400">
            Total comments: {idData.comments?.length || 0}
          </p>
          <p className="mt-2 text-gray-400">
            Total likes: {idData.likes?.length || 0}
          </p>
        </div>
      </div>

      {/* Comment Form */}
      <div className="w-full md:w-3xl mt-6">
        <form onSubmit={submitHandler} className="flex flex-col">
          <label htmlFor="comment" className="text-gray-800 font-semibold">
            Comment
          </label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="6"
            id="comment"
            className="border rounded border-gray-400 mb-4 px-3 outline-red-500"
          />
          <button className="px-4 py-2 bg-red-400 rounded text-white cursor-pointer hover:bg-red-600">
            Submit
          </button>
        </form>
      </div>

      {/* Display Comments */}
      <div className="w-full md:w-3xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {idData.comments?.length > 0 ? (
          <ul className="space-y-4">
            {idData.comments.map((comment, index) => (
              <li key={index} className="bg-white p-4 rounded shadow">
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={
                      comment.createdBy?.profilePicture ||
                      "/default-profile.png"
                    }
                    alt="Commenter"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                  <span className="font-semibold ">
                    {comment.createdBy?.name || "Unknown"}
                  </span>
                    <span className="text-gray-500">{comment.createdAt.substring(11, 16)}</span>
                  </div>
                </div>
                <p className="text-gray-700">{comment.text}</p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateBlogDescriptionPage;
