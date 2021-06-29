import React from "react";
import { EventLineUp } from "./EventLineUp";
import { EventGeneralInformation } from "./EventGeneralInformation";

import { createStyles, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = (image) => {
  return makeStyles((theme) =>
    createStyles({
      standAloneStyles: {
        position: "relative",
        ...theme.card,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gridArea: "event",
        background: `linear-gradient(top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 59%, rgba(0, 0, 0, 1) 100%) ,url(
          ${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.5s ease",
        overflowY: "auto",
        overflowX: "hidden",
        "&:hover": {
          backgroundColor: "transparent",
        },
        [theme.breakpoints.down("xs")]: {
          paddingTop: "150px",
          height: "100vh",
          width: "100vw",
          borderRadius: "0px",
          margin: 0,
          "&::-webkit-scrollbar": {
            position: "absolute",
            right: 0,
            "-webkitAppearance": "none",
          },
          "&::-webkit-scrollbar:vertical": {
            position: "absolute",
            width: "4px",
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            right: 0,
            position: "absolute",
            borderRadius: "4px",
            backgroundColor: "grey",
          },
        },
        [theme.breakpoints.up("sm")]: {
          height: "65vh",
        },
        [theme.breakpoints.up("lg")]: {
          height: "90vh",
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
  backgroundImage,
}) => {
  const classes = useStyles(backgroundImage)();
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
        eventURL={event.uri}
      />
    </ListItem>
  );
};
