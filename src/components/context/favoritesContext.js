import React from "react";
import { useFavorites } from "../hooks/useFavorites";

export const FavoritesContext = React.createContext(null);

export const FavoritesContextProvider = ({ children }) => {
  const { favorites, setFavorites } = useFavorites();

  return (
    <FavoritesContext.Provider
      value={{
        favorites: favorites,
        setFavorites: setFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
