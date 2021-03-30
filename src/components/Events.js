import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { checkIfSaved, updateFavorites } from "./localStorage";
import { useFavorites } from "./hooks/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    display: "flex",
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
}));

export const Events = ({ events }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);
  const [favorites, setFavorites] = useFavorites();

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

  useEffect(() => {
    // console.log("favs in the events comp", favorites);
  }, [checked]);

  return (
    <List dense className={classes.root}>
      {events.length ? (
        events.map((event) => {
          const labelId = `checkbox-list-secondary-label-${event.id}`;
          return (
            <ListItem key={event.id} button>
              <ListItemText
                id={labelId}
                primary={event.displayName}
                className={classes.listItem}
              />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={
                        <FavoriteBorder fontSize="medium" color="secondary" />
                      }
                      onClick={() => setFavorites(event)}
                      onChange={handleToggle(event)}
                      // checked={checkIfSaved(event.id)}
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