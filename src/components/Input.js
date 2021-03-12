import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Input as Inp } from "@material-ui/core";

import React, { useEffect, useRef, useState } from "react";
import { MatchedBands } from "./old-components/MatchedBands";

const useStyles = makeStyles((theme) =>
  createStyles({
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

export const Input = (props) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="input-container">
      <ul className="input-list">
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
      </ul>
    </div>
  );
};
