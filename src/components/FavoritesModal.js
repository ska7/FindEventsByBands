import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/FavoritesContext";

export const FavoritesModal = () => {
  const [eventInfoModal, showEventInfoModal] = useState(false);
  const [chosenEvent, setChosenEvent] = useState({});

  const { favorites, updateFavorites } = useContext(GlobalContext);

  return (
    <>
      <div className="favorites-modal-overlay">
        <ul className="favorites-modal">
          {favorites.length ? (
            favorites.map((event) => {
              return (
                <li key={event.id} className="favorites-item events-list-item">
                  <span
                    onClick={() => {
                      setChosenEvent(event);
                      showEventInfoModal(true);
                    }}
                  >
                    {event.displayName}
                  </span>
                  <button onClick={() => updateFavorites("delete", event)}>
                    &times;
                  </button>
                </li>
              );
            })
          ) : (
            <p>You don't have any favorite events yet</p>
          )}
        </ul>
      </div>
    </>
  );
};
