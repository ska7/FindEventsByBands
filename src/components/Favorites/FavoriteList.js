import { createStyles, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { FavoriteItem } from "./FavoriteItem";

const useStyles = makeStyles((theme) =>
  createStyles({
    noFavoriteEvents: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export const FavoriteList = ({ favorites, isXsScreen }) => {
  const classes = useStyles();
  return (
    <>
      {favorites.length ? (
        favorites.map((event) => {
          return <FavoriteItem event={event} />;
        })
      ) : (
        <ListItem className={classes.noFavoriteEvents} isXsScreen={isXsScreen}>
          You don't have any favorite events yet
        </ListItem>
      )}
    </>
  );
};
