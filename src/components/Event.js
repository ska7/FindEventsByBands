import React, { useState } from "react";
import { EventLineUp } from "./EventLineUp";
import { EventGeneralInformation } from "./EventGeneralInformation";

import { createStyles, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./Theme";
import { useSpotify } from "./hooks/useSpotify";

const useStyles = () => {
  return makeStyles((theme) =>
    createStyles({
      standAloneStyles: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        transition: "all 0.5s ease",
        borderTop: "1px solid rgba(255, 255, 255, 0.0)",
        borderBottom: "1px solid rgba(255, 255, 255, 0)",
        overflowY: "auto",
        "&:hover": {
          backgroundColor: "transparent",
        },
        [theme.breakpoints.down("xs")]: {
          // paddingTop: "30px",
          paddingTop: "50px",
        },
      },
      itemOfListStyles: {
        paddingTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "auto",
        transition: "all 0.5s ease",
        borderTop: "1px solid rgba(255, 255, 255, 0.0)",
        borderBottom: "1px solid rgba(255, 255, 255, 0)",
        "&:hover": {
          backgroundColor: "rgba(0,0,0, 0.2)",
          borderTop: "1px solid rgba(255, 255, 255, 0.3)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        },
      },
    })
  );
};

export const Event = ({
  event,
  collapse = true,
  isStandAlone,
  artistImage = "",
}) => {
  const classes = useStyles()();
  return (
    <ListItem
      key={event.id}
      button
      className={
        isStandAlone ? classes.standAloneStyles : classes.itemOfListStyles
      }
      button={false}
      disableGutters
      id="event-card-top"
    >
      <EventGeneralInformation event={event} isStandAlone={isStandAlone} />
      <EventLineUp
        artists={event.performance.map((artist) => {
          return { id: artist.artist.id, name: artist.displayName };
        })}
        collapse={collapse}
        isStandAlone={isStandAlone}
        cancelled={event.status === "cancelled" ? true : false}
      />
    </ListItem>
  );
};
