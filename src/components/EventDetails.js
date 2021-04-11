import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
import { useSpotify } from "./spotifyAPI";
import { Loader } from "./Loader";

const customStyles = (image) => {
  return makeStyles((theme) =>
    createStyles({
      root: {
        ...theme.card,
        // background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url("${image}")`,
        // backgroundPosition: "50% 30%",
      },
      cardContainer: {
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "row",
        width: "100%",
      },
      eventInfoContainer: {
        background:
          "linear-gradient(top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%)",
        color: "white",
        width: "70%",
        borderBottom: "2px solid grey",
        "& h6": {
          padding: "20px 0px",
        },
      },
      artists: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        background: "#33393d",
        color: "white",
        padding: "20px 0px",
        "& p": {
          paddingLeft: "20px",
        },
      },
      bandImage: {
        height: "200px",
        width: "30%",
      },
    })
  );
};

export const EventDetails = (props) => {
  const { match, location } = props;

  const [event, setEvent] = useState({});
  const [artists, setArtists] = useState([]);
  // const imageURL = useSpotify(`${artists[0]}`);
  const imageURL =
    "https://i.scdn.co/image/6422c2b56c9fdf3e0e4df4f02867143725ed1077";

  useEffect(() => {
    axios
      .get(
        `https://api.songkick.com/api/3.0/events/${match.params.eventID}.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}`
      )
      .then(({ data }) => {
        setEvent(data.resultsPage.results.event);
        setArtists(
          data.resultsPage.results.event.performance.map(
            (artist) => artist.displayName
          )
        );
      });
  }, []);

  const classes = customStyles()();

  return (
    <div className="event-details-container">
      <Card className={classes.root}>
        {artists.length ? (
          <>
            {" "}
            <Typography className={classes.artists}>
              {artists.slice(0, 3).map((artist) => (
                <p>{artist}</p>
              ))}
            </Typography>
            <CardContent className={classes.cardContainer}>
              <CardMedia
                image={imageURL}
                title="bandImage"
                className={classes.bandImage}
              />
              <CardContent className={classes.eventInfoContainer}>
                <Typography variant="h7">{event.start.date}</Typography>
                <Typography variant="h6" gutterBottom>
                  {event.displayName}
                </Typography>
                <Typography variant="h7">{event.location.city}</Typography>
              </CardContent>
            </CardContent>{" "}
          </>
        ) : (
          <Loader />
        )}
      </Card>
    </div>
  );
};
