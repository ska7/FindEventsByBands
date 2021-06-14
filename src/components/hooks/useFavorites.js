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
  const [favorites, setFavorites] = useState(() => getSavedFavorites());

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify({ favorites: [...favorites] })
    );
  }, [favorites]);

  return { favorites, setFavorites };
};

// import { useState, useEffect } from "react";

// export const checkIfSaved = (eventID, favorites) => {
//   return favorites.find((event) => event.id === eventID);
// };

// const getUpdatedFavorites = (event, favorites) => {
//   console.log("Got updated favorites");
//   const isPresent = checkIfSaved(event.id, favorites);

//   if (isPresent) {
//     return favorites.filter((favoriteEvent) => favoriteEvent.id !== event.id);
//   } else {
//     return [...favorites, event];
//   }
// };

// export const getSavedFavorites = () => {
//   console.log("Got saved favorites");
//   const savedFavorites = JSON.parse(localStorage.getItem("favorites"));

//   // If there are saved favorites
//   if (savedFavorites) return savedFavorites.favorites;

//   // If there are no saved favorites
//   return [];
// };

// export const useFavorites = () => {
//   const [event, setEvent] = useState({});
//   const [favorites, setFavorites] = useState(() => getSavedFavorites());

//   useEffect(() => {
//     if (event && Object.keys(event).length) {
//       setFavorites(getUpdatedFavorites(event, favorites));
//       localStorage.setItem(
//         "favorites",
//         JSON.stringify({ favorites: [...favorites] })
//       );
//     }
//   }, [event]);

//   return { favorites, setEvent };
// };
