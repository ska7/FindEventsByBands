import { Container } from "@material-ui/core";
import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
  },
}));

export const EventsFilter = () => {
  const classes = useStyles();
  return (
    <>
      <Input classNamee={classes.input} />
    </>
  );
};
