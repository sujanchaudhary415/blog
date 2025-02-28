import React, { useContext } from "react";
import { AnimeContext } from "../context/AnimeContext";
import { Link } from 'react-router-dom';

const AnimePage = () => {
  const { animeList, loading } = useContext(AnimeContext);

  if (loading) return <p className="text-center text-xl font-semibold">Loading anime...</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6 rounded-lg flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8 py-4">
        Anime Highlights
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {animeList.map((anime) => (
          <Link
            to={`/anime/${anime.mal_id}`}  
            key={anime.mal_id}
            className="bg-white rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {anime.title_english}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {anime.synopsis ? anime.synopsis : "No synopsis available."}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                <span className="font-semibold">Aired:</span> {anime.aired.string}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                <span className="font-semibold">Score:</span> {anime.score || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimePage;
