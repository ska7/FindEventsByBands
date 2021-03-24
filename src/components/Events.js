import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

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
    },
  },
}));

export const Events = ({ events }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);

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
                <Checkbox
                  className={classes.checkbox}
                  edge="end"
                  onChange={handleToggle(event)}
                  checked={checked.indexOf(event) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
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
