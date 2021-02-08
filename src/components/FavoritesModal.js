import React, { useContext } from "react";
import { GlobalContext } from "../context/FavoritesContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { EventInfoModal } from "./EventInfoModal";

export const FavoritesModal = () => {
  const {
    favorites,
    updateFavorites,
    chosenEvent,
    showEventInfoModal,
    eventInfoModal,
    handleBandNameClick,
  } = useContext(GlobalContext);

  return (
    <div className="favorites-modal-overlay">
      <ul className="favorites-modal">
        {favorites.length ? (
          favorites.map((event) => {
            return (
              <li key={event.id} className="favorites-item events-list-item">
                <span onClick={() => handleBandNameClick(event)}>
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
      <TransitionGroup component={null}>
        {eventInfoModal && (
          <CSSTransition in={eventInfoModal} timeout={300} classNames="scale">
            <EventInfoModal
              event={chosenEvent}
              closeModal={showEventInfoModal}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
