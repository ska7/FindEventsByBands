import React, { useContext, useState } from "react";

export const GlobalContext = React.createContext();

export const FavoritesContext = ({ children }) => {
  // Flags
  const [matchedBandsVisible, showMatchedBands] = useState(false);
  const [bandEventsVisible, showBandEvents] = useState(false);

  // Data
  const [chosenBandID, setChosenBandID] = useState("");
  const [favorites, setFavorites] = useState([]);

  const providerValues = {
    setFavorites,
    showMatchedBands,
    showBandEvents,
    setChosenBandID,
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
