import React, { useContext } from "react";
import { GlobalContext } from "../context/FavoritesContext";

export const SaveButton = ({ event }) => {
  const { updateFavorites, favorites } = useContext(GlobalContext);

  const checkIfSaved = (eventID, favorites) => {
    return favorites.find((event) => event.id === eventID);
  };

  return (
    <>
      {checkIfSaved(event.id, favorites) ? (
        <button
          id={`save-btn-active`}
          onClick={() => updateFavorites("delete", event)}
        />
      ) : (
        <button id={`save-btn`} onClick={() => updateFavorites("add", event)} />
      )}
    </>
  );
};
