import React, { useState } from "react";
import { EventLineUp } from "./EventLineUp";
import { EventGeneralInformation } from "./EventGeneralInformation";

import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./Theme";
import { useSpotify } from "./hooks/spotifyAPI";

const useStyles = (isStandAlone) => {
  const standAloneStyles = {
    listItem: {
      paddingTop: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      height: "auto",
      transition: "all 0.5s ease",
      borderTop: "1px solid rgba(255, 255, 255, 0.0)",
      borderBottom: "1px solid rgba(255, 255, 255, 0)",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  };

  const itemOfListStyles = {
    listItem: {
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
  };

  return makeStyles((theme) =>
    isStandAlone ? standAloneStyles : itemOfListStyles
  );
};

export const Event = ({
  event,
  collapse = true,
  isStandAlone,
  artistImage = "",
}) => {
  const classes = useStyles(isStandAlone)();
  return (
    <ListItem key={event.id} button className={classes.listItem}>
      <EventGeneralInformation event={event} isStandAlone={isStandAlone} />
      <EventLineUp
        artists={event.performance.map((artist) => {
          return { id: artist.id, name: artist.displayName };
        })}
        collapse={collapse}
        isStandAlone={isStandAlone}
        cancelled={event.status === "cancelled" ? true : false}
      />
    </ListItem>
  );
};
