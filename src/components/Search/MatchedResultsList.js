import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MicIcon from "@material-ui/icons/Mic";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "Inconsolata, monospace",
      textDecoration: "none",
      width: "100%",
      height: "70px",
      padding: "20px 40px 20px 15px",
      background: "#dddddd",
      color: "#504f4f",
      fontWeight: "bold",
      transition: "all 0.5s ease",
      margin: 0,
      "&:nth-last-child(1)": {
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      },
      "&:hover": {
        cursor: "pointer",
        textDecoration: "none",
        background: "#222323",
        color: "white",
      },
    },
    location: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      background: "#dfdfdf",
    },
    country: {
      fontWeight: "100",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    font: {
      fontFamily: "Inconsolata, monospace",
    },
    locationIcon: {
      paddingRight: "50px",
    },
    alignRow: {
      display: "flex",
      flexDirection: "row",
    },
    alignCentrally: {
      justifyContent: "center",
      alignItems: "center",
    },
    alignArtist: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  })
);

const formatArtistName = (name) => {
  if (name.length > 20) {
    return `${name.slice(0, 20)}...`;
  } else {
    return name;
  }
};

export const MatchedResultsList = ({ artists, locations, clearInput }) => {
  const classes = useStyles();
  return (
    <>
      {locations.length
        ? locations.map((location) => {
            return (
              <Link
                className={`${classes.link} ${classes.location} ${classes.alignRow}`}
                key={location.metroArea.id}
                to={`/location/${location.metroArea.displayName}?locationID=${location.metroArea.id}`}
                onClick={clearInput}
              >
                <span
                  className={`${classes.font} ${classes.alignRow} ${classes.alignCentrally}`}
                >
                  <Icon className={classes.locationIcon}>
                    <LocationOnIcon />
                  </Icon>
                  {formatArtistName(location.metroArea.displayName)}
                </span>
                <span className={`${classes.country} ${classes.font}`}>
                  {formatArtistName(location.metroArea.country.displayName)}
                </span>
              </Link>
            );
          })
        : null}
      {artists.length
        ? artists.map((band) => {
            return (
              <Link
                className={`${classes.link} ${classes.alignArtist}`}
                key={band.id}
                to={`/artist/${band.displayName}?artistID=${band.id}`}
                onClick={clearInput}
              >
                <Icon className={classes.locationIcon}>
                  <MicIcon />
                </Icon>
                {formatArtistName(band.displayName)}
              </Link>
            );
          })
        : null}
      {!artists.length && !locations.length && (
        <Link className={`${classes.link} ${classes.alignArtist}`}>
          No band found!
        </Link>
      )}
    </>
  );
};
