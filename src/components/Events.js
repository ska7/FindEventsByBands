import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useFavorites, checkIfSaved } from "./hooks/useFavorites";
import { FavoritesContext } from "./context/favoritesContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  checkbox: {
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.7)",
      borderRadius: "50%",
    },
  },
  link: {
    ...theme.links,
  },
  listItem: {
    height: "130px",
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.2)",
    },
  },
  eventDate: {
    width: "10%",
    padding: "0",
    margin: "0",
  },
  location: {
    fontWeight: "300",
  },
  eventName: {
    width: "80%",
  },
  date: {
    fontWeight: "900",
  },
}));

const updateFavorites = (event, favorites, setFavorites) => {
  const isPresent = checkIfSaved(event.id, favorites);

  if (isPresent) {
    const updatedFavorites = favorites.filter(
      (favoriteEvent) => favoriteEvent.id !== event.id
    );
    setFavorites([...updatedFavorites]);
  } else {
    const updatedFavorites = [...favorites, event];
    setFavorites([...updatedFavorites]);
  }
};

const formatDate = (date) => {
  // Date should come as yyyy-mm-dd

  let [year, month, day] = date.split("-");
  if (month.includes("0")) month = month.replace("0", "");

  const months = [
    "#",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return `${months[month]} ${day}`;
};

const formatTime = (time) => {
  // Time should come as hh:mm:ss

  const [hours, minutes] = time.split(":");

  console.log(hours, minutes);

  return `${hours}:${minutes}`;
};

export const Events = (props) => {
  const { events, match, location } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const checkIfSaved = (eventID) => {
    return favorites.find((event) => event.id === eventID);
  };

  useEffect(() => {}, []);

  return (
    <List dense className={classes.root}>
      {events.length ? (
        events.map((event) => {
          const labelId = `checkbox-list-secondary-label-${event.id}`;
          return (
            <ListItem key={event.id} button className={classes.listItem}>
              <Container className={classes.eventDate}>
                <Typography color="secondary" className={classes.date}>
                  {formatDate(event.start.date)}
                </Typography>
                {event.start.time && (
                  <Typography>{formatTime(event.start.time)}</Typography>
                )}
              </Container>
              <Container className={classes.eventName}>
                <Typography>{event.displayName}</Typography>
                <Typography className={classes.location}>
                  {event.location.city}
                </Typography>
              </Container>
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <FavoriteBorder fontSize="medium" color="secondary" />
                      }
                      onClick={() =>
                        updateFavorites(event, favorites, setFavorites)
                      }
                      onChange={handleToggle(event)}
                      checked={checkIfSaved(event.id, favorites)}
                      checkedIcon={<Favorite />}
                      name="checkedH"
                    />
                  }
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      ) : (
        <li
          id="no-events"
          style={{
            marginTop: "50%",
            fontSize: "25px",
          }}
        >
          This artist has no upcoming events!
        </li>
      )}
    </List>
  );
};
