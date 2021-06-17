import React from "react";

import Carousel from "react-material-ui-carousel";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useFavorites } from "./hooks/useFavorites";
import { EventDetails } from "./EventDetails";

const useStyles = makeStyles((theme) =>
  createStyles({
    carousel: {
      gridArea: "event",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        position: "absolute",
        height: "100vh",
      },
      [theme.breakpoints.up("md")]: {
        height: "800px",
      },
    },
  })
);

export const EventsCarousel = () => {
  const { favorites } = useFavorites();

  const xsScreen = useMediaQuery("(max-width: 450px)");

  const classes = useStyles();
  return (
    <Carousel
      className={classes.carousel}
      autoPlay={false}
      navButtonsAlwaysVisible
      timeout={700}
      interval={12000}
      indicators={xsScreen ? false : true}
      navButtonsWrapperProps={{
        style: {
          bottom: xsScreen ? "3%" : 0,
          top: xsScreen ? "unset" : 0,
        },
      }}
      navButtonsProps={{
        style: {
          padding: xsScreen ? "5px" : "9px",
        },
      }}
    >
      {favorites.map((event) => (
        <EventDetails event={event} />
      ))}
    </Carousel>
  );
};
