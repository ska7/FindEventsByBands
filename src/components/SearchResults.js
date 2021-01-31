import _ from "lodash";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useThrottle, useThrottleFn } from "react-use";
// import throttle from "lodash/throttle";

export const SearchResults = ({ searchString }) => {
  const [bands, setBands] = useState([]);
  const [last, setLast] = useState(0);

  //   const throttle = (fn, delay) => {
  //     return (...args) => {
  //       console.log(...args);
  //       const now = new Date().getTime();
  //       console.log(now);
  //       if (now - last < delay) {
  //         return;
  //       }
  //       last = now;
  //       return fn(...args);
  //     };
  //   };

  const fetchBands = async (bandName) => {
    console.log(bandName);
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

          setBands(matchedBands.slice(0, 5));
          console.log(matchedBands);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {}, [searchString]);

  return (
    <ul>
      {bands.map((band) => {
        return <li>{band.displayName}</li>;
      })}
    </ul>
  );
};
