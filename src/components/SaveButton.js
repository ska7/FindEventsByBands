import React, { useEffect, useState } from "react";
import { GlobalContext } from "../context/FavoritesContext";

export const SaveButton = ({ event }) => {
  const [click, setClick] = useState(false);
  const favorites = localStorage.getItem("favorites") || [];
  // const { updateFavorites, favorites } = useContext(GlobalContext);

  const checkIfSaved = (eventID, favorites) => {
    // return favorites.find((event) => event.id === eventID);
  };

  const updateFavorites = (action, event) => {
    switch (action) {
      case "add":
        localStorage.setItem(event.id, JSON.stringify(event));
        setClick(!click);
        break;
      case "delete":
        localStorage.removeItem(event.id);
        setClick(!click);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    try {
      console.log(JSON.parse(Object.entries(localStorage)[0][1]));
    } catch (e) {
      console.log(e);
    }
  }, [click]);

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
