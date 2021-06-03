import React, { useState, useEffect } from "react";
import axios from "axios";

import { fetchBandImage } from "./hooks/spotifyAPI";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Loader } from "./Loader";
import { Events } from "./Events";

const customStyles = (image) => {
  return makeStyles((theme) =>
    createStyles({
      root: {
        ...theme.card,
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
          "${image}"
        )`,
      },
      header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.6)",
        boxShadow: "0px 0px 25px 10px black",
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

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const bandID = new URLSearchParams(location.search).get("bandID");
    setLoading(true);
    updateImage(match.params.bandName, setImage);

    // We should make sure both the image and the events are ready before setting the loader off

    axios
      .get(
        `https://api.songkick.com/api/3.0/artists/${bandID}/calendar.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}`
      )
      .then((res) => {
        const events = res.data.resultsPage.results.event;
        if (events !== undefined) {
          setEvents(events);
        } else {
        }
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  const classes = customStyles(image)();
  return (
    <>
      <div className="band-events-container">
        <Card className={classes.root}>
          <Typography className={classes.header}>
            {match.params.bandName}
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
