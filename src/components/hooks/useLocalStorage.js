import { useState, useEffect } from "react";

const getSavedFavorites = () => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites"));

  // If there are saved favorites
  if (savedFavorites) return savedFavorites.favorites;

  // If there are no saved favorites
  return [];
};

export const useFavorites = () => {
  const [bandEvent, setBandEvent] = useState({});
  const [favorites, setFavorites] = useState(() => {
    return getSavedFavorites();
  });

  const updateEvent = (event) => setBandEvent(event);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify({ favorites: [...favorites, bandEvent] })
    );

    setFavorites(getSavedFavorites());

    // When the hook receives a new event, useEffect updates the favorites object and adds it to the local storage
  }, [bandEvent]);

  return { favorites, updateEvent };
};
