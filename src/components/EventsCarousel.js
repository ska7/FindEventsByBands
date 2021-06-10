import React from "react";

import Carousel from "react-material-ui-carousel";
import { Card, useMediaQuery } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { red, blue, green } from "@material-ui/core/colors";
import { useFavorites } from "./hooks/useFavorites";
import { EventDetails } from "./EventDetails";

const useCustomStyles = (
  widthAbove1025,
  widthBetween1024and960,
  widthBetween959and600,
  widthBelow600
) => {
  return makeStyles((theme) => {
    // Tablets and big laptops
    if (widthAbove1025) {
      return createStyles({
        carousel: {
          gridArea: "event",
          height: "800px",
          width: "100%",
        },
      });
      // Tablets and small laptops
    } else if (widthBetween1024and960) {
      return createStyles({
        carousel: {
          gridArea: "event",
          height: "1100px",
          width: "100%",
        },
      });
    } else if (widthBetween959and600) {
      return createStyles({});
    } else if (widthBelow600) {
      return createStyles({});
    }
  });
};

export const EventsCarousel = () => {
  const { favorites } = useFavorites();

  const widthAbove1025 = useMediaQuery("(min-width: 1025px)");
  const widthBetween1024and960 = useMediaQuery(
    "(min-width: 960px) and (max-width: 1024px)"
  );
  const widthBetween959and600 = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  );
  const widthBelow600 = useMediaQuery("min-width: 599px");

  const classes = useCustomStyles(
    widthAbove1025,
    widthBetween1024and960,
    widthBetween959and600,
    widthBelow600
  )();
  return (
    <Carousel
      className={classes.carousel}
      autoPlay={false}
      navButtonsAlwaysVisible
      timeout={700}
      interval={12000}
    >
      {favorites.map((event) => (
        <EventDetails event={event} />
      ))}
    </Carousel>
  );
};
