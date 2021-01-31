import React, { useContext, useState } from "react";

export const GlobalContext = React.createContext();

export const FavoritesContext = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  return (
    <div>
      <GlobalContext.Provider value={setFavorites}>
        {children}
      </GlobalContext.Provider>
    </div>
  );
};
