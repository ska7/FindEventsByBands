import React, { useState, useEffect } from "react";
import axios from "axios";

import { fetchBandImage, useSpotify } from "./hooks/useSpotify";
import { Card, CardContent, Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Loader } from "./Loader";
import { Events } from "./Events";

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
      bandWrapper: {
        height: "100%",
        // border: "1px solid red",
        backgroundSize: "cover",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
            "${image}"
          )`,
        [theme.breakpoints.down("xs")]: {
          backgroundPosition: "center",
          marginTop: "70px",
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
        background: "rgba(0,0,0,0.6)",
        color: "white",
        textAlign: "center",
        fontSize: "30px",
        height: "70px",
        [theme.breakpoints.down("xs")]: {
          // background: "rgba(0,0,0,0.3)",
          height: "50px",
          fontSize: "25px",
          fontWeight: "900",
        },
        [theme.breakpoints.up("xs")]: {
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

export const Band = (props) => {
  const { match, location } = props;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [artistImage, setArtistImage] = useSpotify(match.params.bandName);

  useEffect(() => {
    const bandID = new URLSearchParams(location.search).get("bandID");
    setLoading(true);
    setArtistImage("");

    const init = async () => {
      await axios
        .get(
          `https://api.songkick.com/api/3.0/artists/${bandID}/calendar.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}`
        )
        .then((res) => {
          const events = res.data.resultsPage.results.event;
          if (events !== undefined) {
            setEvents(events);
          }
        })
        .catch((e) => console.log("error", e))
        .finally(() => {
          setLoading(false);
        });
    };

    init();
  }, [location]);

  const classes = customStyles(artistImage)();
  return (
    <Container className={classes.mainContainer} disableGutters>
      {loading ? (
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
        <Card className={classes.bandWrapper}>
          <Typography className={classes.header}>
            {match.params.bandName}
          </Typography>
          <Events events={events} {...props} />
        </Card>
      )}
    </Container>
  );
};
