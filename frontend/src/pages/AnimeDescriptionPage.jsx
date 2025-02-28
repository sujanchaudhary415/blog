import React, { useContext, useEffect } from "react";
import { AnimeContext } from "../context/AnimeContext";
import { useParams } from "react-router-dom";

const AnimeDetailsPage = () => {
  const { id } = useParams(); // Get the anime ID from the URL params
  const { animeDetails, loading, fetchAnimeDetails } = useContext(AnimeContext);

  // Fetch anime details when the component mounts or the `id` changes
  useEffect(() => {
    if (id) {
      fetchAnimeDetails(id); // Fetch the details of the anime using the ID from the URL
    }
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-xl font-semibold">
        Loading anime details...
      </p>
    );

  if (!animeDetails || !animeDetails.title) {
    return (
      <p className="text-center text-xl font-semibold">No details available.</p>
    );
  }

  const submitHandler = (e) => {
      e.preventDefault();
      
    };
  

  return (
    <div className="bg-gray-50 min-h-screen p-6 rounded-lg flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 py-4">
        {animeDetails.title_english || animeDetails.title}
      </h1>
      <p className="pb-2">{animeDetails.aired?.string}</p>
      <img
        src={animeDetails.images?.webp?.image_url}
        alt={animeDetails.title}
        className="w-full max-w-md mb-6 rounded"
      />

      <div className="text-center text-lg font-semibold text-gray-700">
        <p>
          <span className="font-bold">Total Episodes:</span>{" "}
          {animeDetails.episodes || "N/A"}
        </p>
        <p>
          <span className="font-bold">Genres:</span>{" "}
          {animeDetails.genres?.map((genre) => genre.name).join(", ") || "N/A"}
        </p>
        <p className="text-red-500">
          <span className="font-bold ">Rating:</span>{" "}
          {animeDetails.rating || "N/A"}
        </p>
        <p>
          <span className="font-bold">Rank:</span> {animeDetails.rank || "N/A"}
        </p>
        <p>
          <span className="font-bold">Score:</span>{" "}
          {animeDetails.score || "N/A"}
        </p>
        <p>
          <span className="font-bold text-yellow-600">Scored By:</span>{" "}
          {animeDetails.scored_by || "N/A"}
        </p>
        <p className="text-sm font-semibold text-gray-700 pt-4">3 Comments</p>
      </div>
      <div className="w-xs md:w-3xl">
        <form onSubmit={submitHandler} className="flex flex-col">
          <label htmlFor="comment" className="text-gray-800 font-semibold ">
            Comment
          </label>
          <textarea
            rows="6"
            id="comment"
            className="border rounded border-gray-400 mb-4 px-3  outline-red-500"
          />
          <button className="px-4 py-2 bg-red-400 rounded text-white cursor-pointer hover:bg-red-600 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnimeDetailsPage;
