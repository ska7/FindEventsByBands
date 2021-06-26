import { Button, Container, TextField } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = (activeFilter) => {
  return makeStyles((theme) => ({
    inputContainer: {
      position: "relative",
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
      [theme.breakpoints.down("sm")]: {
        margin: "15px auto 40px auto",
        width: "100%",
      },
    },
    input: {
      width: "100%",
      background: "white",
      borderRadius: "15px",
      textAlign: "center",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    applyFilterSlide: {
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
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
    inputProps: {
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        "&&::placeholder": {
          textAlign: `${activeFilter ? "right" : "center"} `,
          paddingRight: `${activeFilter ? "18%" : 0}`,
          margin: 0,
          fontSize: "13px",
        },
        fontSize: "13px",
      },
      [theme.breakpoints.up("sm")]: {
        "&&::placeholder": {
          textAlign: "center",
          paddingLeft: "10%",
        },
      },
      [theme.breakpoints.up("lg")]: {
        "&&::placeholder": {
          textAlign: "center",
        },
      },
    },
  }));
};

export const EventsFilter = ({ setFilterStringFunc }) => {
  const [placeholder, setPlaceholder] = useState("Filter by city or country");
  const [value, setValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const theme = useTheme();

  const classes = useStyles(activeFilter)();

  return (
    <Container className={classes.inputContainer} disableGutters>
      <TextField
        className={classes.input}
        inputProps={{ className: classes.inputProps, maxLength: "15" }}
        InputProps={{ disableUnderline: true }}
        variant="standard"
        fullWidth
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
        className={classes.applyFilterSlide}
      >
        <Button
          onClick={() => {
            setFilterStringFunc(value);
            setActiveFilter(
              theme.breakpoints.down("sm") && value.length > 7
                ? `${value.slice(0, 7)}...`
                : value
            );
            setValue("");
          }}
        >
          FILTER
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
          size="small"
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
