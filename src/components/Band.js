import React, { useState, useEffect } from "react";
import axios from "axios";

import { fetchBandImage } from "./hooks/spotifyAPI";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Loader } from "./Loader";
import { Events } from "./Events";

import { EventsFilter } from "./EventsFilter";

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
      subHeader: {
        background: "rgba(0,0,0,0.8)",
        color: "white",
        textAlign: "center",
        paddingBottom: "20px",
        fontSize: "20px",
      },
      eventsList: {
        height: "95%",
        width: "100%",
        overflow: "auto",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
      "${image}"
    )`,
        backgroundSize: "cover",
        backgroundPosition: "50% 30%",
      },
      input: {
        background: "white",
        padding: "0px 5px",
      },
    })
  );
};

const updateImage = async (bandName, updateState) => {
  const image = await fetchBandImage(bandName);
  updateState(image);
};

export const Band = (props) => {
  const { match, location } = props;
  const [bandID, setBandID] = useState("");
  const [bandName, setBandName] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search).get("bandID");
    console.log(props);

    setBandID(params);
    setBandName(match.params.bandName);
    updateImage(bandName, setImage);
    if (bandID) {
      try {
        setLoading(true);
        axios
          .get(
            `https://api.songkick.com/api/3.0/artists/${bandID}/calendar.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}`
          )
          .then((res) => {
            const events = res.data.resultsPage.results.event;
            if (events !== undefined) {
              setEvents(events);
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
          <Typography className={classes.subHeader}>
            {/* <EventsFilter setFilterStringFunc={setFilterString} /> */}
            found {events.length} events
          </Typography>
          <CardContent className={classes.eventsList}>
            {loading && !events.length && image ? (
              <Loader />
            ) : (
              <Events events={events} {...props} />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
