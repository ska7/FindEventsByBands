import React from "react";
import { useSpotify } from "./hooks/useSpotify";
import { Link } from "react-router-dom";

// import { Link } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MicIcon from "@material-ui/icons/Mic";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      // ...theme.centerColumn,
      display: "flex",
      flexDirection: "column",
      fontFamily: "Inconsolata, monospace",
      textDecoration: "none",
      width: "100%",
      height: "70px",
      // textAlign: "left",
      padding: "20px 40px",
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
    },
    font: {
      fontFamily: "Inconsolata, monospace",
    },
    locationIcon: {
      paddingRight: "50px",
      // border: "1px solid red",
    },
    alignRow: {
      display: "flex",
      flexDirection: "row",
    },
    alignCentrally: {
      justifyContent: "center",
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

export const SearchResultsList = ({ artists, locations, clearInput }) => {
  const classes = useStyles();
  return (
    <>
      {locations.length &&
        locations.map((location) => {
          return (
            <Link
              className={`${classes.link} ${classes.location}`}
              key={location.id}
              to={`/location/${location.name}?locationID=${location.id}`}
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
        })}
      {artists.length &&
        artists.map((band) => {
          return (
            <Link
              className={`${classes.link} ${classes.alignRow}`}
              key={band.id}
              to={`/band/${band.displayName}?bandID=${band.id}`}
              onClick={clearInput}
            >
              <Icon className={classes.locationIcon}>
                <MicIcon />
              </Icon>
              {formatArtistName(band.displayName)}
            </Link>
          );
        })}
      {!artists.length && !locations.length && <Link>No band found!</Link>}
    </>
  );
};
