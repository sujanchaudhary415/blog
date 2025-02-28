import React, { createContext, useState, useEffect } from "react";
import md5 from "crypto-js/md5";

// Create the MarvelContext
export const MarvelContext = createContext();

// Provider Component
export const MarvelProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const publicKey = "789fedca4484fb6baa60ae11043f3353"; // Your public key
  const privateKey = "789fbdc8c97343a46c98b6cf750b9e0d3961c778"; // Your private key
  const timestamp = new Date().getTime(); // Get current timestamp
  const hash = md5(timestamp + privateKey + publicKey).toString(); // Generate MD5 hash

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
        );
        const data = await response.json();
        const filteredCharacters = data.data.results.filter(character => character.description && character.description.trim() !== '');
        // Store the API data for reference in other components
        console.log(filteredCharacters)
        setCharacters(data.data.results); // Store fetched characters
      } catch (error) {
        setError(error); // Store the error if it happens
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCharacters();
  }, []);

  return (
    <MarvelContext.Provider value={{ characters, loading, error }}>
      {children}
    </MarvelContext.Provider>
  );
};
