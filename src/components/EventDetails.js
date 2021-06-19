import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Grid,
  List,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useSpotify } from "./hooks/useSpotify";
import { Loader } from "./Loader";
import { EventLineUp } from "./EventLineUp";
import { Event } from "./Event";
import { useFavorites } from "./hooks/useFavorites";

const customStyles = (image) => {
  return makeStyles((theme) =>
    createStyles({
      mainContainer: {
        ...theme.card,
        gridArea: "event",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
          ${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        [theme.breakpoints.down("xs")]: {
          paddingTop: "90px",
          height: "100vh",
          width: "100vw",
          overflowY: "auto",
          borderRadius: "0px",
          margin: 0,
          "&::-webkit-scrollbar": {
            "-webkitAppearance": "none",
          },
          "&::-webkit-scrollbar:vertical": {
            width: "4px",
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "4px",
            backgroundColor: "grey",
          },
        },
      },
    })
  );
};

export const EventDetails = ({ event }) => {
  const [artistImage, setArtistImage] = useSpotify(
    event.performance[0].displayName
  );

  const theme = useTheme();

  const classes = customStyles(artistImage)();

  return (
    <Grid className={classes.mainContainer}>
      <Event
        event={event}
        collapse={false}
        hoverFocus={false}
        isStandAlone={true}
      />
    </Grid>
  );
};
