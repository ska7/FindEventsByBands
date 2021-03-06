import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, Input, List } from "@material-ui/core";

import React, { useState } from "react";
import { MatchedResults } from "./MatchedResults";

const useStyles = makeStyles((theme) =>
  createStyles({
    searchInputListContainer: {
      position: "relative",
      gridArea: "search",
      [theme.breakpoints.down("xs")]: {
        height: "90px",
        width: "60vw",
        transition: "all 0.5s ease",
        width: "100vw",
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      },
      [theme.breakpoints.up("md")]: {},
    },
    searchInputList: {
      padding: 0,
      position: "absolute",
      top: 0,
      height: "auto",
      width: "90%",
      zIndex: "25",
      margin: "auto 0px auto 0px",
      borderRadius: "10px",
      transition: "all 0.3s ease",
      border: "1px solid black",
      [theme.breakpoints.down("xs")]: {
        marginTop: "20px",
        width: "50%",
        "&:focus-within": {
          width: "90%",
        },
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "70px",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "80px",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "40px",
      },
    },
    input: {
      ...theme.input,
      height: "50px",
      width: "100%",
      boxShadow: "0px 0px 10px 1px black",
      "&:focus-within": {
        boxShadow: "0px 0px 10px 3px black",
      },
    },
    inputProps: {
      [theme.breakpoints.down("xs")]: {
        padding: 0,
        "&&::placeholder": {
          fontSize: "12px",
          textAlign: "center",
        },
        "&:focus-within": {
          paddingLeft: "50px",
          textAlign: "left",
          fontSize: "16px",
          "&&::placeholder": {
            textAlign: "left",
          },
        },
      },
      [theme.breakpoints.up("sm")]: {
        paddingLeft: "50px",
      },
    },
    inputEmpty: {
      borderRadius: "10px",
    },
  })
);

export const Search = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const classes = useStyles();
  return (
    <Container className={classes.searchInputListContainer}>
      <List className={classes.searchInputList}>
        <Input
          className={classes.input}
          classes={{
            root: !inputValue && classes.inputEmpty,
            focused: classes.focused,
          }}
          inputProps={{ className: classes.inputProps }}
          disableUnderline="false"
          color="primary"
          autoFocus
          value={inputValue}
          onChange={handleChange}
          placeholder="search artist or location"
        />
        {inputValue ? (
          <MatchedResults
            searchString={inputValue}
            onClick={() => setInputValue("")}
          />
        ) : null}
      </List>
    </Container>
  );
};

