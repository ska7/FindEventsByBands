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
  const [bandEvent, setBandEvent] = useState({});
  const [favorites, setFavorites] = useState(() => getSavedFavorites());

  const updateEvent = (event) => {
    const favs = getSavedFavorites();
    const isPresent = checkIfSaved(event.id, favs);

    if (isPresent) {
      const updatedFavorites = favs.filter(
        (favoriteEvent) => favoriteEvent.id !== event.id
      );
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favs, event];
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify({ favorites: [...favorites] })
    );
  }, [favorites]);

  return { favorites, updateEvent };
};
