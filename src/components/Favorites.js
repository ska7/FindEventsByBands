import React, { useState, useEffect, useContext } from "react";

import { Container, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { getSavedFavorites, useFavorites } from "./hooks/useFavorites";
import { FavoritesContext } from "./context/favoritesContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      background: "#85070b",
      boxShadow: "1px 0px 10px 5px black",
      position: "relative",
      overflowY: "auto",
      height: "100vh",
      padding: 0,
    },
    title: {
      width: "100%",
      height: "50px",
      color: "white",
      margin: "10px auto",
      padding: "10px",
      fontWeight: "500",
      textAlign: "center",
      margin: "35px 0px",
    },
    listItem: {
      fontFamily: "Inconsolata, monospace",
      transition: "all 0.5s ease",
      padding: "20px",
      height: "auto",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      },
    },
    list: {
      width: "100%",
      color: "white",
      flexDirection: "column",
    },
    link: {
      ...theme.links,
    },
  })
);

export const Favorites = () => {
  const classes = useStyles();

  const { favorites } = useContext(FavoritesContext);

  return (
    // <div className="favorites-container">
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        FAVORITE EVENTS
      </Typography>
      <List className={classes.list}>
        {favorites.map((event) => {
          return (
            <ListItem className={classes.listItem}>
              <Link to={`/event/${event.id}`} className={classes.link}>
                {event.displayName}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Container>
    // </div>
  );
};
