import { createContext, useState, useEffect } from "react";
import React from "react";

// Create Context
export const AnimeContext = createContext();

// Provider Component
export const AnimeProvider = ({ children }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animeDetails, setAnimeDetails] = useState(null);

  // Fetch Anime Data from Jikan API
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime");
        const data = await response.json();
        setAnimeList(data.data); // Set anime data
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  // Fetch Anime Details based on ID (You can pass `id` dynamically)
  const fetchAnimeDetails = async (id) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await response.json();
      console.log(data.data);
      setAnimeDetails(data.data); // Set anime details
    } catch (error) {
      console.error("Error fetching anime details:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <AnimeContext.Provider value={{ animeList, loading, animeDetails, fetchAnimeDetails }}>
      {children}
    </AnimeContext.Provider>
  );
};
