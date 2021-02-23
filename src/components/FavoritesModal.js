import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, updateFavorites } from "./localStorage";

export const FavoritesModal = () => {
  const [eventInfoModal, showEventInfoModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    try {
      getFavorites(Object.entries(localStorage), setFavorites);
    } catch (e) {
      //
    }
  }, [click]);

  return (
    <>
      <div className="favorites-modal-overlay">
        <ul className="favorites-modal">
          {favorites.length ? (
            favorites.map((event) => {
              return (
                <li key={event.id} className="favorites-item">
                  <Link key={event.id} to={`/event/${event.id}`}>
                    {event.displayName}
                  </Link>
                  <button
                    onClick={() =>
                      updateFavorites("delete", event, () => setClick(!click))
                    }
                  >
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
