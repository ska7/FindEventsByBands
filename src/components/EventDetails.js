import React, { useEffect, useState } from "react";
import { fetchBandImage } from "./spotifyAPI";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      ...theme.card,
    },
  })
);

export const EventDetails = () => {
  const classes = useStyles();

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {}, []);
  return (
    <div className="event-details-container">
      <Card className={classes.root}></Card>
    </div>
  );
};
