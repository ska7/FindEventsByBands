import React, { useEffect, useState } from "react";

import axios from "axios";
import { Loader } from "./Loader";
import { EventInfoModalContent } from "./EventInfoModalContent";

export const EventInfoModalLayout = ({ match }) => {
  const eventID = match.params.eventID;
  const [event, setEvent] = useState({});
  const [active, setActive] = useState(true);

  const formatEvent = (eventName) => {
    return eventName.length > 90 ? `${eventName.slice(0, 90)}...` : eventName;
  };

  useEffect(() => {
    axios
      .get(
        `https://api.songkick.com/api/3.0/events/${eventID}.json?apikey=K0cI0s0IC8ii7i2w`
      )
      .then(({ data }) => {
        setEvent(data.resultsPage.results.event);
      });
  }, []);
  return (
    <>
      {active ? (
        <div className="event-info-modal-layout">
          {event.hasOwnProperty("id") ? (
            <EventInfoModalContent
              event={event}
              close={() => setActive(false)}
            />
          ) : (
            <Loader />
          )}
        </div>
      ) : null}
    </>
  );
};
