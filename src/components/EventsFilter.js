import { Button, Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";
import { Input } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  input: {
    position: "relative",
    width: "100%",
    background: "white",
    borderRadius: "15px",
    textAlign: "center",
    height: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    position: "relative",
    margin: "40px auto",
    height: "35px",
    overflow: "hidden",
    background: "#333333",
    width: "90%",
  },
  slide: {
    position: "absolute",
    right: "0%",
    overflow: "hidden",
  },
  applyFilterBtn: {
    fontSize: "12px",
  },
  deleteFilterBtn: {
    fontSize: "12px",
  },
  deleteFilterSlide: {
    position: "absolute",
    left: "0%",
    overflow: "hidden",
  },
}));

export const EventsFilter = ({ setFilterStringFunc }) => {
  const [placeholder, setPlaceholder] = useState("Filter by city or country");
  const [value, setValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const classes = useStyles();

  return (
    <Container className={classes.inputContainer} disableGutters>
      <Input
        className={classes.input}
        inputProps={{ style: { textAlign: "center" } }}
        fullWidth
        disableUnderline
        color="secondary"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={() => setPlaceholder("")}
        onBlur={() => setPlaceholder("Filter by city or country")}
      />
      <Slide
        in={value}
        direction="left"
        timeout={1000}
        className={classes.slide}
      >
        <Button
          className={classes.applyFilterBtn}
          onClick={() => {
            setFilterStringFunc(value);
            setActiveFilter(value);
          }}
        >
          APPLY FILTER
        </Button>
      </Slide>
      <Slide
        in={activeFilter}
        direction="right"
        timeout={1000}
        className={classes.deleteFilterSlide}
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.deleteFilterBtn}
          endIcon={<DeleteIcon />}
          onClick={() => {
            setActiveFilter("");
            setFilterStringFunc("");
          }}
        >
          {activeFilter}
        </Button>
      </Slide>
    </Container>
  );
};
