import { useState, useEffect } from "react";

// const setInitValue = (bandEvent) => {
//   return bandEvent;
// };

export const useFavorites = () => {
  // By default, it looks like {favorites: []}
  const [bandEvent, setBandEvent] = useState({});

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));

    if (savedFavorites) {
      savedFavorites.favorites = [...savedFavorites.favorites, bandEvent];
      setFavorites(savedFavorites.favorites);
    } else {
      setFavorites([bandEvent]);
    }

    // When the hook receives a new event, useEffect updates the favorites object and adds it to the local storage
    localStorage.setItem("favorites", JSON.stringify({ favorites: favorites }));
  }, [bandEvent]);

  return [favorites, setBandEvent];
};
