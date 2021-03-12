import React, { useEffect, useState } from "react";
import { getFavorites, updateFavorites } from "./localStorage";

export const SaveButton = ({ event }) => {
  const [favorites, setFavorites] = useState([]);
  const [click, setClick] = useState(false);

  const checkIfSaved = (eventID, favorites) => {
    return favorites.find((event) => event.id === eventID);
  };

  useEffect(() => {
    try {
      getFavorites(Object.entries(localStorage), setFavorites);
    } catch (e) {
      console.log(e);
    }
  }, [click]);

  return (
    <>
      {checkIfSaved(event.id, favorites) ? (
        <button
          id={`save-btn-active`}
          onClick={() =>
            updateFavorites("delete", event, () => setClick(!click))
          }
        />
      ) : (
        <button
          id={`save-btn`}
          onClick={() => updateFavorites("add", event, () => setClick(!click))}
        />
      )}
    </>
  );
};
