import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  CardContent,
  List,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useSpotify } from "./hooks/spotifyAPI";
import { Loader } from "./Loader";
import { EventLineUp } from "./EventLineUp";

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
      artist: {
        fontSize: "13px",
        color: "white",
        transition: "all 0.2s ease",
        borderBottom: "none",
        "&:hover": {
          fontWeight: "800",
        },
      },
      eventInfoContainer: {
        height: "250px",
        display: "flex",
        color: "white",
        width: "100%",
        padding: "0px 0px 0px 0px",
        borderBottom: "1px solid white",
        "& span": {
          padding: "0px 10px",
        },
        "& h6": {
          padding: "40px 10px",
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
      eventMeta: {
        height: "100%",
        color: "white",
      },
      artists: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // background: "#212527",
        // background: "#6280A5",
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
        textAlign: "center",
        flexDirection: "row",
        alignItems: "center",
        margin: "35px 0px",
        color: "white",
        padding: "10px",
        // overflowWrap: "break-word",
        "& li:nth-child(1)": { color: "yellow" },

        "& li": {
          display: "inline",
          padding: "10px 10px",
          margin: "10px",
        },
      },
      bandImage: {
        height: "100%",
        // paddingTop: "59.25%",
        paddingTop: "29.25%",
        backgroundAttachment: "fixed",
        // backgroundPosition: "50% 30%",
        backgroundPosition: "50% 30%",
        backgroundSize: "cover",
        width: "60%",
      },
    })
  );
};

const createTableRow = (artists, classes) => {
  const chunks = [];

  for (let i = 5; i < artists.length; i += 5) {
    const chunk = artists.slice(i, i + 5);
    chunks.push(
      <TableRow>
        {chunk.map((artist) => (
          <TableCell className={classes.artist}>{artist.displayName}</TableCell>
        ))}
      </TableRow>
    );
  }

  console.log(chunks);

  return <TableBody>{chunks.map((chunk) => chunk)}</TableBody>;
};

export const EventDetails = (props) => {
  const { match, location, eventID } = props;
  const [event, setEvent] = useState({});
  const [artists, setArtists] = useState([]);
  // const imageURL = useSpotify(`${artists[0]}`);
  const imageURL =
    "https://i.scdn.co/image/cec568293ff75ff6fcf9b284b8f387a4b1c8a00f";

  useEffect(() => {
    // If URL does not contain the id, eventID will be passed into request
    const id = match ? match.params.eventID : eventID;
    axios
      .get(
        `https://api.songkick.com/api/3.0/events/${id}.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}`
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
              <CardContent className={classes.eventInfoContainer}>
                {imageURL ? (
                  <CardMedia
                    image={imageURL}
                    title="bandImage"
                    className={classes.bandImage}
                  />
                ) : (
                  <Loader />
                )}
                <CardContent className={classes.eventMeta}>
                  <Typography variant="h7">{event.start.date}</Typography>
                  <Typography variant="h6">{event.displayName}</Typography>
                  <Typography variant="subtitle1">
                    {event.location.city}
                  </Typography>
                </CardContent>
              </CardContent>
              <EventLineUp
                artists={artists}
                collapse={false}
                cancelled="true"
              />
            </CardContent>
          </>
        ) : (
          <Loader />
        )}
      </Card>
    </div>
  );
};
