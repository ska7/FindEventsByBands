import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const FavoritesContext = ({ children }) => {
  // Flags
  const [matchedBandsVisible, showMatchedBands] = useState(false);
  const [bandEventsVisible, showBandEvents] = useState(false);

  // Data
  const [inputValue, setInputValue] = useState("");
  const [chosenBandID, setChosenBandID] = useState("");
  const [favorites, setFavorites] = useState([]);

  const updateFavorites = (action, event) => {
    switch (action) {
      case "add":
        setFavorites([...favorites, event]);
        break;
      case "delete":
        setFavorites(
          favorites.filter((e) => {
            return e.id !== event.id;
          })
        );
        break;
      default:
        break;
    }
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
