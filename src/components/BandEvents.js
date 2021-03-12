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

export const BandEvents = () => {
  const classes = useStyles();
  return (
    <div className="band-events-container">
      <Card className={classes.root}></Card>
    </div>
  );
};
