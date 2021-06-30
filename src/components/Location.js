import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "./Loader";
import { EventList } from "./Event/EventList";

import { Card, Container } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const customStyles = (image) => {
  return makeStyles((theme) =>
    createStyles({
      mainContainer: {
        position: "relative",
        ...theme.card,
        gridArea: "event",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%)`,
        [theme.breakpoints.down("xs")]: {
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
      locationEventsWrapper: {
        height: "100%",
        backgroundSize: "cover",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, .8) 100%) ,url(
            "${image}"
          )`,
        [theme.breakpoints.down("xs")]: {
          backgroundPosition: "center",
          minHeight: "100%",
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
          height: "50px",
          fontSize: "25px",
          fontWeight: "900",
          marginTop: "100px",
        },
        [theme.breakpoints.up("sm")]: {
          background: "rgba(0,0,0,0.6)",
          boxShadow: "0px 0px 25px 10px black",
        },
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

const fetchLocationImage = async (location) => {
  return await axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${location}%20city&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
    )
    .then((res) => res.data.results[0].urls.full)
    .catch((e) => console.log(e));
};

export const Location = (props) => {
  const { match, location } = props;

  const [locationImage, setLocationImage] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const locationID = new URLSearchParams(location.search).get("locationID");
    setLoading(true);

    const init = async (locationID) => {
      // Fetching location image to apply as a background to the wrapper
      // https://unsplash.com/documentation#public-authentication

      const image = await fetchLocationImage(match.params.locationName);
      setLocationImage(image);

      // Fetching events by location
      await axios
        .get(
          `https://api.songkick.com/api/3.0/events.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}&location=sk:${locationID}`
        )
        .then((res) => {
          setEvents(res.data.resultsPage.results.event);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    };

    init(locationID);
  }, [location]);

  const classes = customStyles(locationImage)();
  return (
    <Container className={classes.mainContainer} disableGutters>
      {isLoading || locationImage === "" ? (
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
        <Card className={classes.locationEventsWrapper}>
          <EventList
            events={events}
            displayName={`Events in ${match.params.locationName}`}
            {...props}
          />
        </Card>
      )}
    </Container>
  );
};
