import { Container } from "@material-ui/core";
import React from "react";
import loader from "../img/loader-red.png";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const customStyles = (centerV) => {
  return makeStyles((theme) =>
    createStyles({
      "@keyframes spin": {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
      loader: {
        position: "absolute",
        animation: "$spin 1s forwards linear infinite",
        height: "130px",
        width: "130px",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
      },
      centerVertically: {
        marginTop: "auto",
        marginBottom: "auto",
        top: 0,
        bottom: 0,
      },
    })
  );
};

export const Loader = ({ centerVertically = false }) => {
  const classes = customStyles()();
  return (
    <img
      className={`${classes.loader} ${
        centerVertically && classes.centerVertically
      }`}
      src={loader}
      alt="loader"
    ></img>
  );
};
