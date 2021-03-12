import React from "react";

import { Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      ...theme.eventDetailsCard,
    },
  })
);

export const EventDetails = () => {
  const classes = useStyles();
  return (
    <div className="event-details-container">
      <Card className={classes.root}></Card>
    </div>
  );
};
