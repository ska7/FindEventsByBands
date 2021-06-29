import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/favoritesContext";
import { updateFavorites } from "../hooks/useFavorites";

import { IconButton, ListItem } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
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
      [theme.breakpoints.down("xs")]: {
        margin: "10px 0px",
      },
    },
    link: {
      ...theme.links,
    },
  })
);

export const FavoriteItem = ({ event }) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem} key={event.id}>
      <Link to={`/event/${event.id}`} className={classes.link}>
        {event.displayName}
      </Link>
      <IconButton aria-label="delete" size="small">
        <HighlightOffIcon
          onClick={() => updateFavorites(event, favorites, setFavorites)}
          fontSize="inherit"
          style={{ color: "white" }}
        />
      </IconButton>
    </ListItem>
  );
};
