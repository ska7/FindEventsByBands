import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, Input, List, useMediaQuery } from "@material-ui/core";

import React, { useEffect, useRef, useState } from "react";
import { MatchedBands } from "./MatchedBands";
import { theme } from "./Theme";

const useStyles = makeStyles((theme) =>
  createStyles({
    searchInputListContainer: {
      position: "relative",
      gridArea: "search",
      // border: "1px solid red",

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
      [theme.breakpoints.up("md")]: {
        height: "200px",
      },
    },
    searchInputList: {
      top: "0",
      padding: 0,
      position: "absolute",
      height: "auto",
      width: "90%",
      margin: "20px auto 0px auto",
      borderRadius: "10px",
      transition: "all 0.3s ease",
      border: "1px solid black",
      [theme.breakpoints.down("xs")]: {
        zIndex: "25",
        // margin: 0,
        width: "50%",
        "&:focus-within": {
          width: "90%",
        },
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "50px",
      },
    },
    input: {
      ...theme.input,
      height: "50px",
      width: "100%",
      "&:focus-within": {
        boxShadow: "0px 0px 10px 1px black",
      },
    },
    inputProps: {
      [theme.breakpoints.down("xs")]: {
        "&&::placeholder": {
          fontSize: "14px",
        },
        "&:focus-within": {
          paddingLeft: "40px",
        },
      },
    },
    inputEmpty: {
      borderRadius: "10px",
    },
  })
);

export const Search = (props) => {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

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

// const useCustomStyles = (
//   widthAbove1025,
//   widthBetween1024and960,
//   widthBetween959and600
// ) => {
//   return makeStyles((theme) =>
//     createStyles(() => {
//       if (widthAbove1025) {
//         return {
//           searchInputListContainer: {
//             background: "red",
//             position: "relative",
//             gridArea: "search",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: 0,
//           },
//           searchInputList: {
//             padding: 0,
//             position: "absolute",
//             zIndex: "15",
//             marginTop: "25px",
//             margin: "0px auto",
//             left: 0,
//             right: 0,
//             height: "auto",
//             width: "90%",
//             borderRadius: "10px",
//             transition: "all 0.3s ease",
//             "&:focus-within": {
//               boxShadow: "0px 0px 10px 1px black",
//             },
//           },
//           root: {
//             ...theme.input,
//             position: "relative",
//             height: "50px",
//             width: "100%",
//           },
//           inputEmpty: {
//             borderRadius: "10px",
//           },
//         };
//       } else if (widthBetween1024and960) {
//         return {
//           searchInputListContainer: {
//             position: "relative",
//             gridArea: "search",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: 0,
//           },

//           searchInputList: {
//             padding: 0,
//             position: "absolute",
//             zIndex: "15",
//             marginTop: "25px",
//             margin: "0px auto",
//             left: 0,
//             right: 0,
//             height: "auto",
//             width: "90%",
//             borderRadius: "10px",
//             transition: "all 0.3s ease",
//             "&:focus-within": {
//               boxShadow: "0px 0px 10px 1px black",
//             },
//           },
//           root: {
//             ...theme.input,
//             position: "relative",
//             height: "50px",
//             width: "100%",
//           },
//           inputEmpty: {
//             borderRadius: "10px",
//           },
//         };
//       } else if (widthBetween959and600) {
//         return {
//           searchInputListContainer: {
//             position: "relative",
//             gridArea: "search",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 0,
//           },
//           searchInputList: {
//             padding: 0,
//             position: "absolute",
//             zIndex: "15",
//             marginTop: "25px",
//             margin: "0px auto",
//             left: 0,
//             right: 0,
//             height: "auto",
//             width: "90%",
//             borderRadius: "10px",
//             transition: "all 0.3s ease",
//             "&:focus-within": {
//               boxShadow: "0px 0px 10px 1px black",
//             },
//           },
//           root: {
//             ...theme.input,
//             position: "relative",
//             height: "50px",
//             width: "100%",
//           },
//           inputEmpty: {
//             borderRadius: "10px",
//           },
//         };
//       }
//     })
//   );
// };
