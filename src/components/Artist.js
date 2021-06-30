import React, { useState, useEffect } from "react";
import axios from "axios";

import { fetchBandImage, useSpotify } from "./hooks/useSpotify";
import { Card, CardContent, Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Loader } from "./Loader";
import { EventList } from "./Event/EventList";

const customStyles = (image) => {
  return makeStyles((theme) =>
    createStyles({
      mainContainer: {
        position: "relative",
        ...theme.card,
        gridArea: "event",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%)`,
        [theme.breakpoints.down("xs")]: {
          margin: "0px auto 0px auto",
          height: "100vh !important",
          width: "100vw",
        },
        [theme.breakpoints.up("xs")]: {
          height: "65vh",
        },
        [theme.breakpoints.up("lg")]: {
          height: "90vh",
          padding: 0,
        },
      },
      artistEventsWrapper: {
        height: "100%",
        backgroundSize: "cover",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, .8) 100%) ,url(
            "${image}"
          )`,
        [theme.breakpoints.down("xs")]: {
          backgroundPosition: "center",
          height: "100%",
        },
        [theme.breakpoints.up("sm")]: {
          backgroundPosition: "center",
        },
        [theme.breakpoints.up("lg")]: {
          backgroundRepeat: "no-repeat",
        },
      },
      header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        fontSize: "30px",
        height: "70px",
        [theme.breakpoints.down("xs")]: {
          fontSize: "25px",
          fontWeight: "900",
          marginTop: "100px",
        },
        [theme.breakpoints.up("sm")]: {
          background: "rgba(0,0,0,0.8)",
          boxShadow: "0px 0px 25px 10px black",
        },
      },
      input: {
        background: "white",
        padding: "0px 5px",
      },
    })
  );
};

const getEvents = async (artistID) => {
  return await axios
    .get(
      `https://api.songkick.com/api/3.0/artists/${artistID}/calendar.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}`
    )
    .then((res) => {
      const events = res.data.resultsPage.results.event;
      if (events !== undefined) {
        return events;
      } else {
        return [];
      }
    })
    .catch((e) => console.log("error", e));
};

export const Artist = (props) => {
  const { match, location } = props;

  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [artistImage, setArtistImage] = useSpotify(match.params.artistName);

  useEffect(() => {
    const init = async () => {
      setArtistImage("");
      setLoading(true);
      const artistID = new URLSearchParams(location.search).get("artistID");
      const artistEvents = await getEvents(artistID);
      setEvents(artistEvents);
      setLoading(false);
    };

    init();
  }, [location]);

  const classes = customStyles(artistImage)();
  return (
    <Container className={classes.mainContainer} disableGutters>
      {isLoading || artistImage === "" ? (
        <Loader
          customPosition={{
            margin: "auto",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
      ) : (
        <Card className={classes.artistEventsWrapper}>
          <EventList
            events={events}
            displayName={match.params.artistName}
            {...props}
          />
        </Card>
      )}
    </Container>
  );
};
