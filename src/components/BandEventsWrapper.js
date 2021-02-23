import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EventInfoModal } from "./EventInfoModalLayout";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { SaveButton } from "./SaveButton";
import { Loader } from "./Loader";
import { BandEvents } from "./BandEvents";

export const BandEventsWrapper = ({ match }) => {
  const chosenBandID = match.params.bandID;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chosenBandID) {
      try {
        setLoading(true);
        axios
          .get(
            `https://api.songkick.com/api/3.0/artists/${chosenBandID}/calendar.json?apikey=K0cI0s0IC8ii7i2w`
          )
          .then((res) => {
            console.log("reees", res);
            const events = res.data.resultsPage.results.event;
            if (events !== undefined) setEvents(events);
            else setEvents("");
            setLoading(false);
          });
      } catch (e) {
        console.log("hui tam");
        setLoading(false);
      }
    }
    console.log("event in state", events);
  }, [chosenBandID]);

  return (
    <ul className="band-events-wrapper">
      {loading && !events.length ? <Loader /> : <BandEvents events={events} />}
    </ul>
  );
};
