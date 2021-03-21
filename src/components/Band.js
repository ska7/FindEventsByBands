import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Loader } from "./Loader";
import { Events } from "./Events";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      ...theme.card,
    },
    header: {
      // width: "50%",
      background: "rgba(0,0,0,0.8)",
      color: "white",
      textAlign: "center",
    },
    eventsList: {
      height: "90%",
      overflow: "auto",
      background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
        "https://i.scdn.co/image/2ec1d1c7a48df4244f0ba708eafd28b7afa6166b"
      )`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  })
);

export const Band = ({ location, match }) => {
  const [bandID, setBandID] = useState("");
  const [bandName, setBandName] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(location.search);
  const classes = useStyles();

  useEffect(() => {
    setBandID(params.get("bandID") || "");
    setBandName(match.params.bandName || "");
    console.log(match);
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
        <Typography variant="h2" className={classes.header}>
          {bandName}
        </Typography>
        <CardContent className={classes.eventsList}>
          {loading && !events.length ? <Loader /> : <Events events={events} />}
        </CardContent>
      </Card>
    </div>
  );
};
