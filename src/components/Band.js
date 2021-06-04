import React, { useState, useEffect } from "react";
import axios from "axios";

import { fetchBandImage, useSpotify } from "./hooks/spotifyAPI";
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
        position: "relative",
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

  // const artistImage = useSpotify(match.params.bandName);

  useEffect(() => {
    const bandID = new URLSearchParams(location.search).get("bandID");
    setLoading(true);
    // updateImage(match.params.bandName, setImage);

    // We should make sure both the image and the events are ready before setting the loader off

    // Group all these actions into one async function "init"

    // The events are not reinitialize, we should reset events each time a new band is forming

    const init = async () => {
      setEvents([]);
      // setImage(artistImage);
      await axios
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
        .catch((e) => console.log("error", e))
        .finally(() => {
          setLoading(false);
        });
    };

    init();
  }, [location]);

  const classes = customStyles(image)();
  return (
    <>
      <div className="band-events-container">
        <Card className={classes.root}>
          <Typography className={classes.header}>
            {match.params.bandName}
          </Typography>
          {/* <CardContent className={classes.eventsList}> */}
          {loading ? <Loader /> : <Events events={events} {...props} />}
          {/* </CardContent> */}
        </Card>
      </div>
    </>
  );
};
