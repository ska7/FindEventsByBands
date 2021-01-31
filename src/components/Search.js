import React, { useState } from "react";
import { SearchResults } from "./SearchResults";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="search-wrapper">
      <input
        name="searchInput"
        value={inputValue}
        onChange={handleChange}
      ></input>
      <SearchResults searchString={inputValue} />
    </div>
  );
};
