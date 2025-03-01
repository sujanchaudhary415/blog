import React, { useState, useContext } from "react";
import { BlogContext } from "../context/BlogContext"; // Import context

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    aired: "",
    score: "",
  });
  const [imagePreview, setImagePreview] = useState(null)

  const { createPost } = useContext(BlogContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("synopsis", formData.synopsis);
    formDataToSend.append("aired", formData.aired);
    formDataToSend.append("score", formData.score);
    
    // Append image file if selected
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    try {
      await createPost(formDataToSend);  // Send form data using context function
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create Blog</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Synopsis
          </label>
          <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={(e) =>
              setFormData({ ...formData, synopsis: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="Enter blog synopsis"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Aired</label>
          <input
            type="text"
            name="aired"
            value={formData.aired}
            onChange={(e) =>
              setFormData({ ...formData, aired: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="Enter aired date"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Score</label>
          <input
            type="text"
            name="score"
            value={formData.score}
            onChange={(e) =>
              setFormData({ ...formData, score: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="Enter blog score"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-lg"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData({ ...formData, image: file });
                setImagePreview(URL.createObjectURL(file));  // Set preview
              }
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
