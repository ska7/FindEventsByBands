import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/FavoritesContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { EventInfoModal } from "./EventInfoModal";

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
      <TransitionGroup component={null}>
        {eventInfoModal && (
          <CSSTransition in={eventInfoModal} timeout={300} classNames="scale">
            <EventInfoModal
              event={chosenEvent}
              closeModal={() => showEventInfoModal(false)}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
};
