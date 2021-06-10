import React, { useState } from "react";
import { EventLineUp } from "./EventLineUp";
import { EventGeneralInformation } from "./EventGeneralInformation";

import { createStyles, ListItem, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./Theme";
import { useSpotify } from "./hooks/useSpotify";

// const useStyles = (isStandAlone) => {
//   const standAloneStyles = {
//     listItem: {
//       paddingTop: "20px",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-around",
//       height: "auto",
//       transition: "all 0.5s ease",
//       borderTop: "1px solid rgba(255, 255, 255, 0.0)",
//       borderBottom: "1px solid rgba(255, 255, 255, 0)",
//       "&:hover": {
//         backgroundColor: "transparent",
//       },
//     },
//   };

//   const itemOfListStyles = {
//     listItem: {
//       paddingTop: "20px",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-around",
//       height: "auto",
//       transition: "all 0.5s ease",
//       borderTop: "1px solid rgba(255, 255, 255, 0.0)",
//       borderBottom: "1px solid rgba(255, 255, 255, 0)",
//       "&:hover": {
//         backgroundColor: "rgba(0,0,0, 0.2)",
//         borderTop: "1px solid rgba(255, 255, 255, 0.3)",
//         borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
//       },
//     },
//   };

//   return makeStyles((theme) =>

//   );
// };

const useCustomStyles = (
  isStandAlone,
  widthAbove1025,
  widthBetween1024and960,
  widthBetween959and600,
  widthBelow600
) => {
  return makeStyles((theme) => {
    // Tablets and big laptops
    if (widthAbove1025) {
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
      return createStyles(isStandAlone ? standAloneStyles : itemOfListStyles);
      // Tablets and small laptops
    } else if (widthBetween1024and960) {
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
      return createStyles(isStandAlone ? standAloneStyles : itemOfListStyles);
    } else if (widthBetween959and600) {
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
      return createStyles(isStandAlone ? standAloneStyles : itemOfListStyles);
    } else if (widthBelow600) {
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
      return createStyles(isStandAlone ? standAloneStyles : itemOfListStyles);
    }
  });
};

export const Event = ({ event, collapse = true, isStandAlone }) => {
  const widthAbove1025 = useMediaQuery("(min-width: 1025px)");
  const widthBetween1024and960 = useMediaQuery(
    "(min-width: 960px) and (max-width: 1024px)"
  );
  const widthBetween959and600 = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  );
  const widthBelow600 = useMediaQuery("min-width: 599px");

  const classes = useCustomStyles(
    isStandAlone,
    widthAbove1025,
    widthBetween1024and960,
    widthBetween959and600,
    widthBelow600
  )();

  return (
    <ListItem
      key={event.id}
      button
      className={classes.listItem}
      button={false}
      disableGutters
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
