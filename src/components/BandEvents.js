import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EventInfoModal } from "./EventInfoModalLayout";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { SaveButton } from "./SaveButton";
import { Loader } from "./Loader";

export const BandEvents = ({ match }) => {
  const chosenBandID = match.params.bandID;

  const [events, setEvents] = useState([]);
  const [eventInfoModal, showEventInfoModal] = useState(false);

  const formatEvent = (eventName) => {
    return eventName.length > 90 ? `${eventName.slice(0, 90)}...` : eventName;
  };

  const closeEventInfoModal = () => showEventInfoModal(false);

  useEffect(() => {
    if (chosenBandID) {
      try {
        axios
          .get(
            `https://api.songkick.com/api/3.0/artists/${chosenBandID}/calendar.json?apikey=K0cI0s0IC8ii7i2w`
          )
          .then((res) => {
            console.log(res);
            const events = res.data.resultsPage.results.event;
            if (events !== undefined) {
              setEvents(events);
            } else {
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [match.params.bandID]);

  // useEffect(() => {

  // }, []);

  return (
    <ul className="band-events-wrapper">
      <ul className="band-events-list">
        {events.length ? (
          events.map((event) => {
            return (
              <li className="events-list-item" key={event.id}>
                <Link key={event.id} to={`/event/${event.id}`}>
                  <span className="events-list-item-name">
                    {formatEvent(event.displayName)}
                  </span>
                </Link>
                <SaveButton event={event} />
              </li>
            );
          })
        ) : (
          <Loader />
        )}
      </ul>
    </ul>
  );
};
