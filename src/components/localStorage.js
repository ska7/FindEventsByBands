const checkIfSaved = (eventID, favorites) => {
  return favorites.find((event) => event.id === eventID);
};

export const updateFavorites = (action, event) => {
  const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || {
    favorites: [],
  };

  const saved = checkIfSaved(event.id, existingFavorites.favorites);

  if (saved) {
    const updatedFavorites = existingFavorites.favorites.filter(
      (favoriteEvent) => favoriteEvent.id !== event.id
    );
    localStorage.setItem(
      "favorites",
      JSON.stringify({
        favorites: updatedFavorites,
      })
    );
  } else {
    existingFavorites.favorites.push(event);
    localStorage.setItem(
      "favorites",
      JSON.stringify({
        favorites: existingFavorites.favorites,
      })
    );
  }
};

export const getFavorites = (entries, cb) => {
  const res = entries.map((entry) => {
    return JSON.parse(entry[1]);
  });

  cb(res);
};
