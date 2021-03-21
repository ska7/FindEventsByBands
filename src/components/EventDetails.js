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

  useEffect(() => {
    // const updateImage = async () => {
    //   const image = await fetchBandImage("Depeche Mode");
    //   console.log(image);
    //   setImageURL(image);
    // };
    // updateImage();
  }, []);
  return (
    <div className="event-details-container">
      <Card className={classes.root}></Card>
    </div>
  );
};
