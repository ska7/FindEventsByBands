import React from "react";

import Carousel from "react-material-ui-carousel";
import { Container, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useFavorites } from "./hooks/useFavorites";
import { EventDetails } from "./EventDetails";
import { useTheme } from "@material-ui/styles";
import backgroundImage from "../img/no-favorite-events.jpeg";

import MicIcon from "@material-ui/icons/Mic";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    carousel: {
      gridArea: "event",
      width: "100%",
      // border: "1px solid red",
      [theme.breakpoints.down("xs")]: {
        position: "absolute",
        height: "100vh",
      },
      [theme.breakpoints.up("md")]: {
        height: "auto",
        // border: "1px solid red",
      },
      [theme.breakpoints.up("lg")]: {},
    },
    noFavoriteEventsWrapper: {
      ...theme.card,
      background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%), url(${backgroundImage})`,
      backgroundSize: "cove",
      backgroundPosition: "center",
      color: "white",
      display: "flex",
      justifyContent: "center",
      // alignItems: "center",

      // fontFamily: "Inconsolata, monospace",
      [theme.breakpoints.down("xs")]: {
        paddingTop: "50%",
        width: "100vw",
        height: "100vh",
        fontSize: "50px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "70vh",
      },
      [theme.breakpoints.up("lg")]: {
        height: "90vh",
      },
    },
    noFavoriteEventsText: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.up("xs")]: {
        fontSize: "40px",
      },
    },
    carouselButtons: {
      next: "20px",
    },
  })
);

export const EventsCarousel = () => {
  const { favorites } = useFavorites();

  const theme = useTheme();

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
          display: favorites.length ? "block" : "none",
        },
      }}
      navButtonsProps={{
        style: {
          padding: xsScreen ? "4px" : "9px",
          background: "transparent",
          border: xsScreen
            ? `1px solid ${theme.palette.secondary.main}`
            : "1px solid #676563",
          background: "rgb(39, 38, 43)",
        },
        // className: classes.carouselButtons,
      }}
    >
      {favorites.length ? (
        favorites.map((event) => <EventDetails event={event} />)
      ) : (
        <Container className={classes.noFavoriteEventsWrapper}>
          <span className={classes.noFavoriteEventsText}>
            START
            <br /> EXPLORING
            <br />
            EVENTS!
          </span>
        </Container>
      )}
    </Carousel>
  );
};
