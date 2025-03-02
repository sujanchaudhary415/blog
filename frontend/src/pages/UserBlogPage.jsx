import React, { useContext, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const UserBlogPage = () => {
  const { fetchPosts, postData } = useContext(BlogContext); // Provide a fallback to an empty array

  useEffect(() => {
    fetchPosts(); // Fetch all posts when the component mounts
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">User Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {postData.length === 0 ? (
          <p className="text-center text-xl text-gray-500 col-span-full">No posts available.</p>
        ) : (
          postData.map((post, index) => (
            <Link to={`/userblog/${post._id}`} key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <img
                src={post.image}
                alt={post.title}
                className="rounded-lg mb-4  object-cover h-48 w-full"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.synopsis}</p>
              <p className="text-sm text-gray-500">Aired: {post.aired}</p>
              <p className="text-sm text-gray-500">Score: {post.score}</p>
              <p>comment:{post.comment}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default UserBlogPage;
