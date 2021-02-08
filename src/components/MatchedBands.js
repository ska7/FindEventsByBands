import { throttle, debounce } from "lodash";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/FavoritesContext";
import { Loader } from "./Loader";

export const MatchedBands = ({ searchString }) => {
  const {
    showMatchedBands,
    setChosenBandID,
    showBandEvents,
    setInputValue,
  } = useContext(GlobalContext);
  const [bands, setBands] = useState([]);

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

  const throttledFetchBands = useRef(
    throttle((searchString) => fetchBands(searchString), 1500)
  );

  const debouncedFetchBands = useRef(
    debounce((searchString) => fetchBands(searchString), 1000)
  );

  const handleBandClick = (bandID, bandName) => {
    setInputValue(bandName);
    setChosenBandID(bandID);
    showBandEvents(true);
    showMatchedBands(false);
  };

  useEffect(() => {
    if (searchString) {
      throttledFetchBands.current(searchString);
      debouncedFetchBands.current(searchString);
    }
  }, [searchString]);

  return (
    <ul className="matched-bands-wrapper">
      {bands.length ? (
        bands.map((band) => {
          return (
            <li
              key={band.id}
              onClick={() => handleBandClick(band.id, band.displayName)}
            >
              {band.displayName}
            </li>
          );
        })
      ) : (
        <Loader />
      )}
    </ul>
  );
};
