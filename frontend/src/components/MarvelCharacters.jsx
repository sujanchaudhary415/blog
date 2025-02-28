import React, { useState, useEffect, useContext } from "react";
import { MarvelContext } from "./../context/MarvelContext";

const MarvelCharacters = () => {
  const { characters } = useContext(MarvelContext);

  // State for time
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to format the date as "February 20, 2025"
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Marvel Highlights
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-white  rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
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

export default MarvelCharacters;
