import { useState, useEffect } from "react";

const storageEvents = localStorage.getItem("favorites");

export const getSavedFavorites = (storageEvents) => {
  const savedFavorites = JSON.parse(storageEvents);

  // If there are saved favorites
  if (savedFavorites) return savedFavorites.favorites;

  // If there are no saved favorites
  return [];
};

export const checkIfSaved = (eventID, favorites) => {
  return favorites.find((event) => event.id === eventID);
};

export const updateFavorites = (event, favorites, setFavorites) => {
  const isPresent = checkIfSaved(event.id, favorites);

  if (isPresent) {
    const updatedFavorites = favorites.filter(
      (favoriteEvent) => favoriteEvent.id !== event.id
    );
    setFavorites([...updatedFavorites]);
  } else {
    const updatedFavorites = [...favorites, event];
    setFavorites([...updatedFavorites]);
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() =>
    getSavedFavorites(storageEvents)
  );

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify({ favorites: [...favorites] })
    );
  }, [favorites]);

  return { favorites, setFavorites };
};
