import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { CardContent, List, ListItemText, Typography } from "@material-ui/core";
import { useSpotify } from "./spotifyAPI";
import { Loader } from "./Loader";

const customStyles = (image) => {
  return makeStyles((theme) =>
    createStyles({
      root: {
        ...theme.card,
        overflow: "auto",
        background: "#212527",
      },
      cardContainer: {
        margin: 0,
        padding: 0,
        width: "100%",
      },
      eventInfoContainer: {
        color: "white",
        width: "100%",
        padding: "30px 0px 0px 0px",
        "& span": {
          padding: "0px 10px",
        },
        "& h6": {
          padding: "20px 10px",
          fontWeight: "900",
        },
        "& h5": {
          padding: "20px 0px",
        },
        // Line Up
        "& h4": {
          background: "transparent",
          padding: "10px 0px",
          textAlign: "center",
          width: "100%",
          color: "white",
        },
      },
      artists: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // background: "#212527",
        background: "#6280A5",
        color: "white",
        textAlign: "center",
        padding: "20px 10px",
        "& span": {
          fontWeight: "00",
          fontSize: "20px",
        },
      },
      lineUp: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "35px",
        color: "white",
        // overflowWrap: "break-word",
        "& p": {
          padding: "25px",
        },
      },
      bandImage: {
        height: "0",
        // paddingTop: "59.25%",
        paddingTop: "29.25%",
        backgroundAttachment: "fixed",
        // backgroundPosition: "50% 30%",
        backgroundPosition: "50% 30%",
        backgroundSize: "cover",
        width: "50%",
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
    "https://i.scdn.co/image/cec568293ff75ff6fcf9b284b8f387a4b1c8a00f";

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
            <List className={classes.artists}>
              {artists.slice(0, 3).map((artist) => (
                <ListItemText>{artist}</ListItemText>
              ))}
              {artists.length > 3 ? (
                <ListItemText>{`and ${artists.length - 3} more`}</ListItemText>
              ) : null}
            </List>
            <CardContent className={classes.cardContainer}>
              <CardMedia
                image={imageURL}
                title="bandImage"
                className={classes.bandImage}
              />
              <CardContent className={classes.eventInfoContainer}>
                <Typography variant="h7">{event.start.date}</Typography>
                <Typography variant="h6">{event.displayName}</Typography>
                <Typography variant="subtitle1">
                  {event.location.city}
                </Typography>
                {artists.length > 1 ? (
                  <>
                    <Typography variant="h4">Line Up:</Typography>
                    <List className={classes.lineUp}>
                      {artists.map((artist) => (
                        <ListItemText> {artist}</ListItemText>
                      ))}
                    </List>{" "}
                  </>
                ) : null}
              </CardContent>
            </CardContent>
          </>
        ) : (
          <Loader />
        )}
      </Card>
    </div>
  );
};
