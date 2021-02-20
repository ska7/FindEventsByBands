import React, { useEffect, useRef, useState } from "react";
import { MatchedBands } from "./MatchedBands";

export const Input = (props) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [matchedBandsVisible, showMatchedBands] = useState(false);
  const [placeholder, setPlaceholder] = useState("type in a band name");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      showMatchedBands(true);
    } else {
      showMatchedBands(false);
    }
  };

  const clearInput = () => setInputValue("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div className="input-container">
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
      </div>

      {matchedBandsVisible && (
        <MatchedBands searchString={inputValue} clearInput={clearInput} />
      )}
    </div>
  );
};
