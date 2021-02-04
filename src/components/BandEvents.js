import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../context/FavoritesContext";
import { HeartIcon } from "./HeartIcon";

export const BandEvents = () => {
  const [events, setEvents] = useState([]);

  const { chosenBandID } = useContext(GlobalContext);

  const formatEvent = (eventName) => {
    return eventName.length > 70 ? `${eventName.slice(0, 70)}...` : eventName;
  };

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
    <ul className="band-events-wrapper">
      {events.length
        ? events.map((event) => {
            return (
              <li className="events-list-item" key={event.id}>
                <span className="events-list-item-name">
                  {formatEvent(event.displayName)}
                </span>
                <button>SAVE</button>
              </li>
            );
          })
        : "loading"}
    </ul>
  );
};
