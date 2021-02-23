import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { EventInfoModal } from "./EventInfoModalLayout";
import { SaveButton } from "./SaveButton";

export const BandEvents = ({ events }) => {
  const formatEvent = (eventName) => {
    return eventName.length > 90 ? `${eventName.slice(0, 90)}...` : eventName;
  };

  useEffect(() => {
    console.log("yo", events);
  }, []);

  return (
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
        <h1>No events</h1>
      )}
    </ul>
  );
};
