import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../context/FavoritesContext";
import { EventInfoModal } from "./EventInfoModal";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const BandEvents = () => {
  const [events, setEvents] = useState([]);
  const [chosenEvent, setChosenEvent] = useState({});
  const [eventInfoModal, showEventInfoModal] = useState(false);

  const { chosenBandID, updateFavorites, favorites } = useContext(
    GlobalContext
  );

  const formatEvent = (eventName) => {
    return eventName.length > 70 ? `${eventName.slice(0, 70)}...` : eventName;
  };

  const checkIfSaved = (eventID, favorites) => {
    return favorites.find((event) => event.id === eventID);
  };

  const handleBandNameClick = (event) => {
    setChosenEvent(event);
    showEventInfoModal(true);
  };

  const closeEventInfoModal = () => showEventInfoModal(false);

  useEffect(() => {
    chosenBandID &&
      axios
        .get(
          `https://api.songkick.com/api/3.0/artists/${chosenBandID}/calendar.json?apikey=K0cI0s0IC8ii7i2w`
        )
        .then((res) => {
          console.log(res);
          setEvents(res.data.resultsPage.results.event);
        });
  }, [chosenBandID]);

  return (
    <>
      <ul className="band-events-wrapper">
        {events.length
          ? events.map((event) => {
              return (
                <li className="events-list-item" key={event.id}>
                  <span
                    onClick={() => handleBandNameClick(event)}
                    className="events-list-item-name"
                  >
                    {formatEvent(event.displayName)}
                  </span>
                  {checkIfSaved(event.id, favorites) ? (
                    <button
                      id="save-btn-active"
                      onClick={() => updateFavorites("delete", event)}
                    />
                  ) : (
                    <button
                      id="save-btn"
                      onClick={() =>
                        updateFavorites("add", {
                          name: event.displayName,
                          id: event.id,
                        })
                      }
                    />
                  )}
                </li>
              );
            })
          : "loading"}
      </ul>
      <TransitionGroup>
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
