import React, { useState, useEffect } from "react";

import { Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useFavorites } from "./hooks/useLocalStorage";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      width: "100%",
      height: "50px",
      color: "white",
      margin: "10px auto",
      padding: "10px",
      fontWeight: "500",
      textAlign: "center",
      textShadow: "0px 0px 5px black",
    },
  })
);

export const Favorites = () => {
  const classes = useStyles();

  // const [favorites, setFavorites] = useLocalStorage("favorites", {});

  return (
    <div className="favorites-container">
      <Typography variant="h5" className={classes.title}>
        FAVORITE EVENTS
      </Typography>
      {/* {favorites.map(event => {
        return <
      })} */}
    </div>
  );
};
