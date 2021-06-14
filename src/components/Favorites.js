import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "./context/favoritesContext";
import {
  getSavedFavorites,
  updateFavorites,
  useFavorites,
} from "./hooks/useFavorites";

import { Container, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      gridArea: "favorites",
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
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
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

  const { favorites, setFavorites } = useContext(FavoritesContext);

  return (
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        FAVORITE EVENTS
      </Typography>
      <List className={classes.list}>
        {favorites.map((event) => {
          return (
            <ListItem className={classes.listItem} key={event.id}>
              <Link to={`/event/${event.id}`} className={classes.link}>
                {event.displayName}
              </Link>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                size="small"
              >
                <HighlightOffIcon
                  onClick={() =>
                    updateFavorites(event, favorites, setFavorites)
                  }
                  fontSize="inherit"
                  style={{ color: "white" }}
                />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};
