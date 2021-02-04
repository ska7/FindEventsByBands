import React, { useContext, useState } from "react";

export const GlobalContext = React.createContext();

export const FavoritesContext = ({ children }) => {
  // Flags
  const [matchedBandsVisible, showMatchedBands] = useState(false);
  const [bandEventsVisible, showBandEvents] = useState(false);

  // Data
  const [inputValue, setInputValue] = useState("");
  const [chosenBandID, setChosenBandID] = useState("");
  const [favorites, setFavorites] = useState([]);

  const updateFavorites = (newFavoriteEvent) => {
    setFavorites([...favorites, newFavoriteEvent]);
  };

  const providerValues = {
    updateFavorites,
    showMatchedBands,
    showBandEvents,
    setChosenBandID,
    setInputValue,
    inputValue,
    chosenBandID,
    favorites,
    matchedBandsVisible,
    bandEventsVisible,
  };
  return (
    <div>
      <GlobalContext.Provider value={providerValues}>
        {children}
      </GlobalContext.Provider>
    </div>
  );
};
