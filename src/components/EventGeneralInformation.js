import React, { useContext, useState, useEffect } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Container,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { FavoritesContext } from "./context/favoritesContext";
import { theme } from "./Theme";
import { checkIfSaved, updateFavorites } from "./hooks/useFavorites";

const useStyles = (isStandAlone) => {
  return makeStyles((theme) =>
    createStyles(
      isStandAlone
        ? // Standalone Styles
          {
            mainContainer: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "20px",
              // border: "1px solid red",
              // background: `linear-gradient(top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 59%, rgba(0, 0, 0, 0.8) 100%)`,
              // boxShadow: "0px 0px 20px 10px black",
              [theme.breakpoints.down("xs")]: {},
              [theme.breakpoints.up("xs")]: {
                marginTop: "100px",
                padding: "0px 40px",
              },
            },
            eventTime: {
              color: "rgb(220,220,220)",
              fontSize: "17px",
            },
            link: {
              ...theme.links,
            },
            eventDate: {
              width: "10%",
              padding: 0,
              margin: "0",
              // border: "1px solid red",
            },
            location: {
              fontWeight: "500",
              color: "rgb(220,220,220)",
              textAlign: "center",
              [theme.breakpoints.down("xs")]: {
                marginTop: "10px",
                fontSize: "15px",
              },
            },
            eventName: {
              width: "80%",
              padding: "0px 40px",
              [theme.breakpoints.up("xs")]: {},
            },
            name: {
              fontWeight: "700",
              color: "white",
              fontSize: "27px",
              textAlign: "center",

              [theme.breakpoints.down("xs")]: {
                fontSize: "20px",
              },
              [theme.breakpoints.down("md")]: {
                fontSize: "23px",
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "27px",
              },
            },
            date: {
              fontWeight: "900",
              fontSize: "25px",
            },
            favoriteBtn: {
              width: "10%",
              // border: "1px solid red",
              margin: 0,
              padding: 0,
            },
          }
        : // Item Of List Styles
          {
            mainContainer: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            checkbox: {
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.7)",
                borderRadius: "50%",
              },
            },
            eventTime: {
              color: "rgb(220,220,220)",
              [theme.breakpoints.down("xs")]: {
                fontSize: "15px",
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
              color: "rgb(220,220,220)",
              [theme.breakpoints.down("xs")]: {
                padding: "0px 20px",
              },
            },
            eventName: {
              width: "80%",
            },
            name: {
              fontWeight: "700",
              color: "white",
              [theme.breakpoints.down("xs")]: {
                padding: "0px 20px",
              },
            },
            date: {
              fontWeight: "900",
            },
            favoriteBtn: {
              // height: "40px",
              // width: "40px",
              [theme.breakpoints.down("xs")]: {
                margin: 0,
              },
            },
          }
    )
  );
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

  return `${hours}:${minutes}`;
};

export const EventGeneralInformation = ({ event, isStandAlone }) => {
  const classes = useStyles(isStandAlone)();

  const { favorites, setFavorites } = useContext(FavoritesContext);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(checkIfSaved(event.id, favorites));
  }, [favorites]);

  return (
    <Container className={classes.mainContainer} id="event-general-information">
      <Container className={classes.eventDate}>
        <Typography color="secondary" className={classes.date}>
          {formatDate(event.start.date)}
        </Typography>
        {event.start.time && (
          <Typography className={classes.eventTime}>
            {formatTime(event.start.time)}
          </Typography>
        )}
      </Container>
      <Container className={classes.eventName}>
        <Typography className={classes.name}>{event.displayName}</Typography>
        <Typography className={classes.location}>
          {event.location.city}
        </Typography>
      </Container>
      <FormControlLabel
        className={classes.favoriteBtn}
        control={
          <Checkbox
            icon={
              <FavoriteBorder
                fontSize={isStandAlone ? "large" : "medium"}
                color="secondary"
              />
            }
            onClick={() => updateFavorites(event, favorites, setFavorites)}
            checked={isChecked}
            checkedIcon={
              <Favorite fontSize={isStandAlone ? "large" : "medium"} />
            }
            name="checkedH"
          />
        }
      />
    </Container>
  );
};
