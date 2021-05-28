import React from "react";
import { EventLineUp } from "./EventLineUp";
import { EventGeneralInformation } from "./EventGeneralInformation";

import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./Theme";

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "auto",
    transition: "all 0.5s ease",
    borderTop: "1px solid rgba(255, 255, 255, 0.0)",
    borderBottom: "1px solid rgba(255, 255, 255, 0)",
    "&:hover": {
      // backgroundColor: "rgba(255,255,255, 0.1)",
      backgroundColor: "rgba(0,0,0, 0.2)",
      borderTop: "1px solid rgba(255, 255, 255, 0.3)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    },
  },
}));

export const Event = ({ event }) => {
  const classes = useStyles();

  return (
    <ListItem key={event.id} button className={classes.listItem}>
      <EventGeneralInformation event={event} />
      <EventLineUp
        artists={event.performance.map((artist) => {
          return { id: artist.id, name: artist.displayName };
        })}
        collapse={true}
        cancelled={event.status === "cancelled" ? true : false}
      />
    </ListItem>
  );
};
