import React from "react";
import { Link } from "react-router-dom";
import { SaveButton } from "./SaveButton";

export const BandEvents = ({ events }) => {
  const formatEvent = (eventName) => {
    return eventName.length > 90 ? `${eventName.slice(0, 90)}...` : eventName;
  };

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
        <li id="no-events">This artist has no upcoming events!</li>
      )}
    </ul>
  );
};
