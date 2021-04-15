import React from "react";

import Carousel from "react-material-ui-carousel";
import { Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { red, blue, green } from "@material-ui/core/colors";
import { useFavorites } from "./hooks/useFavorites";
import { EventDetails } from "./EventDetails";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      ...theme.card,
      height: "500px !important",
    },
    carousel: {
      height: "800px",
      width: "100%",
    },
  })
);

export const EventsCarousel = () => {
  const { favorites } = useFavorites();

  const classes = useStyles();
  return (
    <Carousel className={classes.carousel} autoPlay timeout={1000}>
      {favorites.map((event) => (
        <EventDetails eventID={event.id} />
      ))}
    </Carousel>
  );
};