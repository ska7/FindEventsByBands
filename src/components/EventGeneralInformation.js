import React, { useContext } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Container, makeStyles, Typography } from "@material-ui/core";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { FavoritesContext } from "./context/favoritesContext";

const useStyles = makeStyles((theme) => ({
  checkbox: {
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.7)",
      borderRadius: "50%",
    },
  },
  link: {
    ...theme.links,
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
  name: { fontWeight: "700" },
  date: {
    fontWeight: "900",
  },
  folded: {
    display: "flex",
    flexDirection: "row",

    width: "100%",
  },
}));

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

const checkIfSaved = (eventID, favorites) => {
  return favorites.find((event) => event.id === eventID);
};

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

export const EventGeneralInformation = ({ event }) => {
  const classes = useStyles();

  const { favorites, setFavorites } = useContext(FavoritesContext);

  return (
    <Container className={classes.folded}>
      <Container className={classes.eventDate}>
        <Typography color="secondary" className={classes.date}>
          {formatDate(event.start.date)}
        </Typography>
        {event.start.time && (
          <Typography>{formatTime(event.start.time)}</Typography>
        )}
      </Container>
      <Container className={classes.eventName}>
        <Typography className={classes.name}>{event.displayName}</Typography>
        <Typography className={classes.location}>
          {event.location.city}
        </Typography>
      </Container>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder fontSize="medium" color="secondary" />}
            onClick={() => updateFavorites(event, favorites, setFavorites)}
            checked={checkIfSaved(event.id, favorites)}
            checkedIcon={<Favorite />}
            name="checkedH"
          />
        }
      />
      {/* <ListItemSecondaryAction>
        
      </ListItemSecondaryAction> */}
    </Container>
  );
};
