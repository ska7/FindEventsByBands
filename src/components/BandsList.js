import React from "react";

// import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useSpotify } from "./hooks/useSpotify";

const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      ...theme.centerColumn,
      fontFamily: "Inconsolata, monospace",
      textDecoration: "none",
      width: "100%",
      height: "70px",
      textAlign: "center",
      padding: "20px 40px",
      background: "#323a3d",
      color: "white",
      fontWeight: "bold",
      transition: "all 0.5s ease",
      "&:nth-last-child(1)": {
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      },
      "&:hover": {
        cursor: "pointer",
        textDecoration: "none",
        background: "#222323",
      },
    },
  })
);

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
              {band.displayName}
            </Link>
          );
        })
      ) : (
        <Link>No band found!</Link>
      )}
    </>
  );
};
