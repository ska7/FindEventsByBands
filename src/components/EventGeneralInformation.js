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
  const standAloneStyles = {
    checkbox: {
      "&:hover": {
        backgroundColor: "rgba(255,255,255, 0.7)",
        borderRadius: "50%",
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
      padding: "0",
      margin: "0",
    },
    location: {
      fontWeight: "500",
      color: "rgb(220,220,220)",
      textAlign: "center",
    },
    eventName: {
      width: "80%",
      padding: "0px 40px",
    },
    name: {
      fontWeight: "700",
      color: "white",
      fontSize: "27px",
      textAlign: "center",
    },
    date: {
      fontWeight: "900",
      fontSize: "25px",
    },
    mainContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      // background: `rgba(0, 0, 0, 0.5)`,
      padding: "20px 30px",
    },
  };

  // const itemOfListStyles = {
  //   checkbox: {
  //     "&:hover": {
  //       backgroundColor: "rgba(255,255,255, 0.7)",
  //       borderRadius: "50%",
  //     },
  //   },
  //   eventTime: {
  //     color: "rgb(220,220,220)",
  //   },
  //   link: {
  //     ...theme.links,
  //   },
  //   eventDate: {
  //     width: "10%",
  //     padding: "0",
  //     margin: "0",
  //   },
  //   location: {
  //     fontWeight: "300",
  //     color: "rgb(220,220,220)",
  //   },
  //   eventName: {
  //     width: "80%",
  //   },
  //   name: { fontWeight: "700", color: "white" },
  //   date: {
  //     fontWeight: "900",
  //   },
  //   mainContainer: {
  //     display: "flex",
  //     flexDirection: "row",

  //     width: "100%",
  //   },
  // };

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
              padding: "20px 30px",
              // border: "1px solid red",
              [theme.breakpoints.down("xs")]: {},
            },
            checkbox: {
              border: "1px soldi red",
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.7)",
                borderRadius: "50%",
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
              padding: "0",
              margin: "0",
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
            },
            name: {
              fontWeight: "700",
              color: "white",
              fontSize: "27px",
              textAlign: "center",

              [theme.breakpoints.down("xs")]: {
                fontSize: "20px",
              },
            },
            date: {
              fontWeight: "900",
              fontSize: "25px",
            },
            favoriteBtn: {
              margin: 0,
            },
          }
        : // Item Of List Styles
          {
            checkbox: {
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.7)",
                borderRadius: "50%",
              },
            },
            eventTime: {
              color: "rgb(220,220,220)",
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
            },
            eventName: {
              width: "80%",
            },
            name: {
              fontWeight: "700",
              color: "white",
            },
            date: {
              fontWeight: "900",
            },
            mainContainer: {
              display: "flex",
              flexDirection: "row",

              width: "100%",
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

  console.log(hours, minutes);

  return `${hours}:${minutes}`;
};

export const EventGeneralInformation = ({ event, isStandAlone }) => {
  const classes = useStyles(isStandAlone)();

  const { favorites, setFavorites } = useContext(FavoritesContext);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(checkIfSaved(event.id, favorites));
    console.log(classes);
    // console.log(classes);
  }, [favorites]);

  return (
    <Container className={classes.mainContainer}>
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
