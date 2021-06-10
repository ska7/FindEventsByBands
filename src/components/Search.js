import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, Input, List, useMediaQuery } from "@material-ui/core";

import React, { useEffect, useRef, useState } from "react";
import { MatchedBands } from "./MatchedBands";
import { theme } from "./Theme";

const useCustomStyles = (
  widthAbove1025,
  widthBetween1024and960,
  widthBetween959and600,
  widthBelow600
) => {
  return makeStyles((theme) => {
    // Tablets and big laptops
    if (widthAbove1025) {
      return createStyles({
        searchInputListContainer: {
          position: "relative",
          gridArea: "search",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
        },
        searchInputList: {
          padding: 0,
          position: "absolute",
          zIndex: "15",
          marginTop: "25px",
          margin: "0px auto",
          left: 0,
          right: 0,
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
          position: "relative",
          height: "50px",
          width: "100%",
        },
        inputEmpty: {
          borderRadius: "10px",
        },
      });
      // Tablets and small laptops
    } else if (widthBetween1024and960) {
      return createStyles({
        searchInputListContainer: {
          position: "relative",
          gridArea: "search",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          width: "90%",
        },
        searchInputList: {
          padding: 0,
          position: "absolute",
          zIndex: "15",
          margin: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          height: "50px",
          width: "90%",
          borderRadius: "10px",
          transition: "all 0.3s ease",
          "&:focus-within": {
            boxShadow: "0px 0px 10px 1px black",
          },
        },
        root: {
          ...theme.input,
          position: "relative",
          height: "50px",
          width: "100%",
        },
        inputEmpty: {
          borderRadius: "10px",
        },
      });
    } else if (widthBetween959and600) {
      return createStyles({
        searchInputListContainer: {
          position: "relative",
          gridArea: "search",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        },
        searchInputList: {
          padding: 0,
          position: "absolute",
          zIndex: "15",
          marginTop: "25px",
          margin: "0px auto",
          left: 0,
          right: 0,
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
          position: "relative",
          height: "50px",
          width: "100%",
        },
        inputEmpty: {
          borderRadius: "10px",
        },
      });
    }
  });
};

export const Search = (props) => {
  const [inputValue, setInputValue] = useState("");

  const widthAbove1025 = useMediaQuery("(min-width: 1025px)");
  const widthBetween1024and960 = useMediaQuery(
    "(min-width: 960px) and (max-width: 1024px)"
  );
  const widthBetween959and600 = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  );
  const widthBelow600 = useMediaQuery("min-width: 599px");

  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const classes = useCustomStyles(
    widthAbove1025,
    widthBetween1024and960,
    widthBetween959and600,
    widthBelow600
  )();
  return (
    <Container className={classes.searchInputListContainer}>
      <List className={classes.searchInputList}>
        <Input
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

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     searchInputListContainer: {
//       position: "relative",
//       gridArea: "search",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       padding: 0,
//       [theme.breakpoints.up("sm")]: {
//         position: "relative",
//         gridArea: "search",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 0,
//       },
//       // [theme.breakpoints.up("lg")]: {
//       //   position: "relative",
//       //   gridArea: "search",
//       //   display: "flex",
//       //   flexDirection: "column",
//       //   alignItems: "center",
//       //   padding: 0,
//       // },
//     },
//     searchInputList: {
//       padding: 0,
//       position: "absolute",
//       zIndex: "15",
//       marginTop: "25px",
//       margin: "0px auto",
//       left: 0,
//       right: 0,
//       height: "auto",
//       width: "90%",
//       borderRadius: "10px",
//       transition: "all 0.3s ease",
//       "&:focus-within": {
//         boxShadow: "0px 0px 10px 1px black",
//       },
//     },
//     root: {
//       ...theme.input,
//       position: "relative",
//       height: "50px",
//       width: "100%",
//     },
//     inputEmpty: {
//       borderRadius: "10px",
//     },
//   })
// );
