import React, { useEffect, useRef, useState } from "react";

import { Loader } from "./Loader";
import { MatchedBands } from "./MatchedBands";

export const Input = (props) => {
  const [inputValue, setInputValue] = useState("");

  const [placeholder, setPlaceholder] = useState("type in a band name");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <ul className="input-container">
      <li>
        <input
          name="searchInput"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={() => setPlaceholder("")}
          onBlur={() => setPlaceholder("type in a band name")}
          autoComplete="off"
          ref={inputRef}
        />
      </li>
      {inputValue ? (
        <MatchedBands
          searchString={inputValue}
          onClick={() => setInputValue("")}
        />
      ) : null}
    </ul>
  );
};
