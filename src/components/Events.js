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

import { useFavorites, checkIfSaved } from "./hooks/useFavorites";
import { FavoritesContext } from "./context/favoritesContext";
import { Link } from "react-router-dom";
import { EventGeneralInformation } from "./EventGeneralInformation";
import { EventLineUp } from "./EventLineUp";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    flexDirection: "column",
  },
  container: {},
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
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    // minHeight: "150px",
    height: "auto",
    transition: "all 0.5s ease",
    borderTop: "1px solid rgba(255, 255, 255, 0.0)",
    borderBottom: "1px solid rgba(255, 255, 255, 0)",
    "&:hover": {
      // backgroundColor: "rgba(255,255,255, 0.1)",
      backgroundColor: "rgba(0,0,0, 0.2)",
      borderTop: "1px solid rgba(255, 255, 255, 0.3)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    },
  },
}));

export const Events = (props) => {
  const { events, match, location } = props;
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <List dense className={classes.root}>
      {events.length ? (
        events.map((event) => {
          const labelId = `checkbox-list-secondary-label-${event.id}`;
          return (
            <ListItem key={event.id} button className={classes.listItem}>
              <EventGeneralInformation event={event} />
              <EventLineUp
                artists={event.performance.map((artist) => {
                  return { id: artist.id, artistName: artist.displayName };
                })}
                collapse={true}
                cancelled={event.status === "cancelled" ? true : false}
              />
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
