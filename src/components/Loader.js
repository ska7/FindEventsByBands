import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import loader from "../img/loader-red.png";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Fade } from "@material-ui/core";

const customStyles = (customPosition, size) => {
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
        height: `${size}`,
        width: `${size}`,
      },
      customPosition: {
        ...customPosition,
      },
    })
  );
};

export const Loader = ({ customPosition = {}, size = "130px" }) => {
  const classes = customStyles(customPosition, size)();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <img
      className={`${classes.loader} ${classes.customPosition}`}
      src={loader}
      alt="loader"
    ></img>
  );
};
