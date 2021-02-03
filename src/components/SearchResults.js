import { throttle } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BandEvents } from "./BandEvents";

export const SearchResults = ({ searchString }) => {
  const [bands, setBands] = useState([]);
  const [last, setLast] = useState(0);
  const [clickedBandID, setClickedBandID] = useState("");

  const fetchBands = async (bandName) => {
    await axios
      .get(
        `https://api.songkick.com/api/3.0/search/artists.json?apikey=K0cI0s0IC8ii7i2w&query=${bandName}`
      )
      .then((res) => {
        try {
          const matchedBands = res.data.resultsPage.results.artist.filter(
            (band) => {
              return band.displayName.includes(bandName);
            }
          );

          console.log(matchedBands);

          setBands(matchedBands.slice(0, 5));
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => console.log(e));
  };

  const throttledFetchBands = useRef(
    throttle((searchString) => fetchBands(searchString), 3000)
  );

  useEffect(() => {
    searchString && throttledFetchBands.current(searchString);
  }, [searchString]);

  return (
    <>
      <ul>
        {bands.map((band) => {
          return (
            <li key={band.id} onClick={() => setClickedBandID(band.id)}>
              {band.displayName}
            </li>
          );
        })}
        {clickedBandID && <BandEvents bandID={clickedBandID} />}
      </ul>
    </>
  );
};
