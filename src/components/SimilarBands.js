import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
    },
  })
);

export const SimilarBands = () => {
  const classes = useStyles();

  return (
    <div className="similar-bands-container">
      <List className={classes.root}>
        <ListItem>band name</ListItem>
        <ListItem>another name</ListItem>
        <ListItem>another name</ListItem>
        <ListItem>another name</ListItem>
      </List>
    </div>
  );
};
