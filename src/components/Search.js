import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, Input as Inp, List } from "@material-ui/core";

import React, { useEffect, useRef, useState } from "react";
import { MatchedBands } from "./MatchedBands";

const useStyles = makeStyles((theme) =>
  createStyles({
    searchInputListContainer: {
      gridArea: "search",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
    },
    searchInputList: {
      padding: 0,
      position: "relative",
      marginTop: "25px",
      height: "auto",
      width: "90%",
      borderRadius: "10px",
      transition: "all 0.3s ease",
      "&:focus-within": {
        boxShadow: "0px 0px 10px 1px black",
      },
    },
    root: {
      ...theme.input,
      height: "50px",
      width: "100%",
    },
    inputEmpty: {
      borderRadius: "10px",
    },
  })
);

export const Search = (props) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <Container className={classes.searchInputListContainer}>
      <List className={classes.searchInputList}>
        <li>
          <Inp
            className={classes.root}
            classes={{
              root: !inputValue && classes.inputEmpty,
              focused: classes.focused,
            }}
            disableUnderline="false"
            color="primary"
            autoFocus="true"
            value={inputValue}
            onChange={handleChange}
            placeholder="type in a band name"
          />
        </li>
        {inputValue ? (
          <MatchedBands
            searchString={inputValue}
            onClick={() => setInputValue("")}
          />
        ) : null}
      </List>
    </Container>
  );
};
