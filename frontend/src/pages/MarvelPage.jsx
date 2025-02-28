import React, {  useContext } from "react";
import { MarvelContext } from "./../context/MarvelContext";
import { formatDate } from './../lib/formatDate';

const MarvelPage = () => {
  const { characters } = useContext(MarvelContext);
  

  return (
    <div className="bg-gray-50 min-h-screen p-6 rounded-lg flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8 py-4">
        Marvel Highlights
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-white rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {character.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {character.description || "No description available."}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {formatDate(character.modified)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarvelPage;
