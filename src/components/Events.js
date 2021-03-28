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
import { updateFavorites } from "./localStorage";
import { FeaturedVideoSharp } from "@material-ui/icons";

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
  const [favorites, setFavorites] = useState([]);

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

  useEffect(() => {
    // setFavorites(localStorage.getItem("favorites").favorites);
  }, []);
  return (
    <List dense className={classes.root}>
      <button
        style={{ width: "25px", height: "25px" }}
        onClick={() => {
          const favor = localStorage.getItem("favorites");
          console.log(JSON.parse(favor));
          // const res = favor.map((entry) => {
          //   return JSON.parse(entry[1]);
          // });
          // console.log(res);
        }}
      ></button>
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
                      onClick={() => updateFavorites("add", event)}
                      // checked={favorites.indexOf(event) !== -1}
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
