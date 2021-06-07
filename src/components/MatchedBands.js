import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { throttle } from "lodash";
import axios from "axios";
import { Loader } from "./Loader";
import { BandsList } from "./BandsList";

export const MatchedBands = ({ searchString, onClick }) => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(false);

  //
  const throttledFetchBands = useRef(
    throttle((searchString) => fetchBands(searchString), 1000, {
      trailing: true,
    })
  );

  const fetchBands = async (bandName) => {
    setLoading(true);
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

          setBands(matchedBands.slice(0, 8));
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchString) {
      throttledFetchBands.current(searchString);
    } else {
      setBands([]);
    }
  }, [searchString]);

  return (
    <>
      {loading ? (
        <Loader customPosition={{ right: "5%" }} size="50px" />
      ) : (
        <BandsList clearInput={onClick} bands={bands} />
      )}
    </>
  );
};
