import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useFavorites, checkIfSaved } from "./hooks/useFavorites";
import { FavoritesContext } from "./context/favoritesContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    flexDirection: "column",
    "& .MuiListItem-root": {
      height: "70px",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  checkbox: {
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.2)",
      borderRadius: "50%",
    },
  },
  link: {
    ...theme.links,
  },
  listItem: {
    width: "95%",
  },
}));

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

export const Events = (props) => {
  const { events, match, location } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const checkIfSaved = (eventID) => {
    return favorites.find((event) => event.id === eventID);
  };

  useEffect(() => {}, []);

  return (
    <List dense className={classes.root}>
      {events.length ? (
        events.map((event) => {
          const labelId = `checkbox-list-secondary-label-${event.id}`;
          return (
            <ListItem key={event.id} button>
              <Link
                className={classes.link}
                to={`/band/${match.params.bandName}/event/${event.id}`}
              >
                <ListItemText
                  id={labelId}
                  primary={event.displayName}
                  className={classes.listItem}
                  // onClick
                />
              </Link>
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <FavoriteBorder fontSize="medium" color="secondary" />
                      }
                      onClick={() =>
                        updateFavorites(event, favorites, setFavorites)
                      }
                      onChange={handleToggle(event)}
                      checked={checkIfSaved(event.id, favorites)}
                      checkedIcon={<Favorite />}
                      name="checkedH"
                    />
                  }
                />
              </ListItemSecondaryAction>
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
