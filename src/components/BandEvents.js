import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../context/FavoritesContext";
import { EventInfoModal } from "./EventInfoModal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { SaveButton } from "./SaveButton";
import { Loader } from "./Loader";

export const BandEvents = () => {
  const [events, setEvents] = useState([]);

  const {
    chosenBandID,
    chosenEvent,
    showEventInfoModal,
    eventInfoModal,
    setChosenEvent,
    handleBandNameClick,
  } = useContext(GlobalContext);

  const formatEvent = (eventName) => {
    return eventName.length > 90 ? `${eventName.slice(0, 90)}...` : eventName;
  };

  const closeEventInfoModal = () => showEventInfoModal(false);

  useEffect(() => {
    chosenBandID &&
      axios
        .get(
          `https://api.songkick.com/api/3.0/artists/${chosenBandID}/calendar.json?apikey=K0cI0s0IC8ii7i2w`
        )
        .then((res) => {
          setEvents(res.data.resultsPage.results.event);
        });
  }, [chosenBandID]);

  return (
    <>
      <ul className="band-events-wrapper">
        <ul className="band-events-list">
          {events.length ? (
            events.map((event) => {
              return (
                <li className="events-list-item" key={event.id}>
                  <span
                    onClick={() => handleBandNameClick(event)}
                    className="events-list-item-name"
                  >
                    {formatEvent(event.displayName)}
                  </span>
                  <SaveButton event={event} />
                </li>
              );
            })
          ) : (
            <Loader />
          )}
        </ul>
      </ul>
      <TransitionGroup component={null}>
        {eventInfoModal && (
          <CSSTransition in={eventInfoModal} timeout={300} classNames="scale">
            <EventInfoModal
              event={chosenEvent}
              closeModal={closeEventInfoModal}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
};
