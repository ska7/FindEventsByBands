import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SaveButton } from "./SaveButton";

export const EventInfoModalContent = ({ event, close }) => {
  // If there's an end date and it's not the same as the start date, format as 'yyyy-mm-dd - yyyy-mm-dd'
  const formatEventDate = (event) => {
    if (!event.hasOwnProperty("end")) return event.start.date;
    return event.start.date === event.end.date
      ? event.start.date
      : `${event.start.date} - ${event.end.date}`;
  };

  return (
    <div className="event-info-modal">
      <div className="event-info-modal-buttons">
        <Link to="/">
          <button id="event-info-modal-close-btn" onClick={close}>
            SEARCH OTHER EVENTS
          </button>
        </Link>
        <SaveButton event={event} />
      </div>
      <h1>{event.displayName}</h1>
      <div className="location">
        <h3>{event.location.city}</h3>
        <h3>{event.venue.displayName}</h3>
        <h4>{formatEventDate(event)}</h4>
        {event.start.time && (
          <h4 className="center">
            Starts at &nbsp;&nbsp;&nbsp;
            <p>{event.start.time.slice(0, 5)}</p>
          </h4>
        )}
      </div>
      <div className="lineup">
        <h2>Line Up: </h2>
        <ul>
          {event.performance.map((artist) => {
            return <li key={artist.id}>{artist.displayName}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
