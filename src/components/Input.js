import React, { useEffect, useRef, useState } from "react";
import { throttle, debounce } from "lodash";
import { Link } from "react-router-dom";
import axios from "axios";
import { MatchedBands } from "./MatchedBands";

export const Input = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [bands, setBands] = useState([]);
  const [placeholder, setPlaceholder] = useState("type in a band name");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const debouncedFetchBands = useRef(
    debounce((searchString) => fetchBands(searchString), 1000)
  );
  const throttledFetchBands = useRef(
    throttle((searchString) => fetchBands(searchString), 1500)
  );

  const fetchBands = async (bandName) => {
    await axios
      .get(
        `https://api.songkick.com/api/3.0/search/artists.json?apikey=K0cI0s0IC8ii7i2w&query=${bandName}`
      )
      .then((res) => {
        try {
          const matchedBands = res.data.resultsPage.results.artist.filter(
            (band) => {
              return band.displayName
                .toLowerCase()
                .includes(bandName.toLowerCase());
            }
          );

          setBands(matchedBands.slice(0, 5));
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => console.log(e));
  };

  const clearInput = () => setInputValue("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (inputValue) {
      throttledFetchBands.current(inputValue);
      debouncedFetchBands.current(inputValue);
    } else {
      setBands([]);
    }
  }, [inputValue]);

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
      {bands.length
        ? bands.map((band) => {
            return (
              <Link
                key={band.id}
                onClick={() => clearInput()}
                to={`/band/${band.id}`}
              >
                {band.displayName}
              </Link>
            );
          })
        : null}
    </ul>
  );
};
