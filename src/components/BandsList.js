import React from "react";

// import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useSpotify } from "./hooks/useSpotify";

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
  })
);

const formatArtistName = (name) => {
  if (name.length > 20) {
    return `${name.slice(0, 20)}...`;
  } else {
    return name;
  }
};

export const BandsList = ({ bands, clearInput }) => {
  const classes = useStyles();
  return (
    <>
      {bands.length ? (
        bands.map((band) => {
          return (
            <Link
              className={classes.link}
              key={band.id}
              to={`/band/${band.displayName}?bandID=${band.id}`}
              onClick={clearInput}
            >
              {formatArtistName(band.displayName)}
            </Link>
          );
        })
      ) : (
        <Link>No band found!</Link>
      )}
    </>
  );
};
