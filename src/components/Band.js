import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Loader } from "./Loader";
import { Events } from "./Events";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      ...theme.eventDetailsCard,
    },
  })
);

export const Band = ({ match }) => {
  const [bandID, setBandID] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const chosenBandID = match.params.bandID;
  const classes = useStyles();

  useEffect(() => {
    setBandID(match.params.bandID || "");
    if (bandID) {
      try {
        setLoading(true);
        axios
          .get(
            `https://api.songkick.com/api/3.0/artists/${bandID}/calendar.json?apikey=K0cI0s0IC8ii7i2w`
          )
          .then((res) => {
            const events = res.data.resultsPage.results.event;
            if (events !== undefined) {
              setEvents(events);
              console.log("events", events);
            } else {
              console.log("no events");
              setEvents("");
            }
          });
      } catch (e) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    }
  }, [bandID]);
  return (
    <div className="band-events-container">
      <Card className={classes.root}>
        <h1>{bandID}</h1>
        {loading && !events.length ? <Loader /> : <Events events={events} />}
      </Card>
    </div>
  );
};
