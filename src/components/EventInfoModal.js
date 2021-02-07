import React, { useState, useEffect } from "react";

export const EventInfoModal = ({ event, closeModal }) => {
  // If there's an end date and it's not the same as the start date, format as 'yyyy-mm-dd - yyyy-mm-dd'
  const formatEventDate = (event) => {
    if (!event.hasOwnProperty("end")) return event.start.date;
    return event.start.date === event.end.date
      ? event.start.date
      : `${event.start.date} - ${event.end.date}`;
  };
  return (
    <div className="event-info-modal-layout">
      <div className="event-info-modal">
        <button onClick={closeModal}>BACK</button>
        <h1>{event.displayName}</h1>
        <div className="location">
          <h3>{event.location.city}</h3>
          <h3>{event.venue.displayName}</h3>
          <h4>{formatEventDate(event)}</h4>
          {event.start.time && (
            <h4 className="center">
              Starts at &nbsp;&nbsp;&nbsp;<p>{event.start.time.slice(0, 5)}</p>
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
    </div>
  );
};
