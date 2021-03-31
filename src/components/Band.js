import React, { useState, useEffect } from "react";
import axios from "axios";

import { fetchBandImage } from "./spotifyAPI";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Loader } from "./Loader";
import { Events } from "./Events";
import { Favorites } from "./Favorites";

const customStyles = (image) => {
  return makeStyles((theme) =>
    createStyles({
      root: {
        ...theme.card,
      },
      header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        textAlign: "center",
        fontSize: "30px",
        height: "70px",
      },
      eventsList: {
        height: "90%",
        width: "100%",
        overflow: "auto",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
      "${image}"
    )`,
        backgroundPosition: "50% 30%",
      },
    })
  );
};

const updateImage = async (bandName, updateState) => {
  const image = await fetchBandImage(bandName);
  updateState(image);
};

export const Band = ({ location, match }) => {
  const [bandID, setBandID] = useState("");
  const [bandName, setBandName] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search).get("bandID");

    setBandID(params);
    setBandName(match.params.bandName);
    updateImage(bandName, setImage);
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
              // console.log("events", events);
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
  }, [bandID, location]);

  const classes = customStyles(image)();
  return (
    <>
      <div className="band-events-container">
        <Card className={classes.root}>
          <Typography className={classes.header}>{bandName}</Typography>
          <CardContent className={classes.eventsList}>
            {loading && !events.length && image ? (
              <Loader />
            ) : (
              <Events events={events} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
