import { Container, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import logo from "../img/favorites-background.jpeg";

import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      width: "100%",
      height: "50px",
      color: "white",
      margin: "10px auto",
      padding: "10px",
      fontWeight: "500",
      textAlign: "center",
      textShadow: "0px 0px 5px black",
    },
  })
);

export const Favorites = () => {
  const classes = useStyles();

  return (
    <div className="favorites-container">
      <Typography variant="h5" className={classes.title}>
        FAVORITE EVENTS
      </Typography>
    </div>
    // <Container></Container>
  );
};
