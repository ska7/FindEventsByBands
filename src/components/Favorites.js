import React, { useState, useEffect, useContext } from "react";

import { List, ListItem, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { getSavedFavorites, useFavorites } from "./hooks/useFavorites";
import { FavoritesContext } from "./context/favoritesContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      width: "100%",
      height: "50px",
      color: "#A7929E",
      margin: "10px auto",
      padding: "10px",
      fontWeight: "500",
      textAlign: "center",
      textShadow: "0px 0px 5px black",
    },
    list: {
      width: "100%",
      color: "white",
      flexDirection: "column",
      "& .MuiListItem-root": {
        padding: "10px",
        height: "auto",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
  })
);

export const Favorites = () => {
  const classes = useStyles();

  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favorites-container">
      <Typography variant="h5" className={classes.title}>
        FAVORITE EVENTS
      </Typography>
      <List className={classes.list}>
        {favorites.map((event) => {
          return <ListItem>{event.displayName}</ListItem>;
        })}
      </List>
    </div>
  );
};
