import { useState, useEffect } from "react";

export const getSavedFavorites = () => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites"));

  // If there are saved favorites
  if (savedFavorites) return savedFavorites.favorites;

  // If there are no saved favorites
  return [];
};

export const checkIfSaved = (eventID, favorites) => {
  return favorites.find((event) => event.id === eventID);
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => getSavedFavorites());

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify({ favorites: [...favorites] })
    );
  }, [favorites]);

  return { favorites, setFavorites };
};
