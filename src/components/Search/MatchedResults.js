import React, { useState, useRef, useEffect } from "react";
import { throttle } from "lodash";
import axios from "axios";
import { Loader } from "../Loader";
import { MatchedResultsList } from "./MatchedResultsList";

import { useMediaQuery } from "@material-ui/core";

export const MatchedResults = ({ searchString, onClick }) => {
  const [artists, setArtists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const xsScreen = useMediaQuery("(max-width: 450px)");

  const throttledFetchResults = useRef(
    throttle((searchString) => fetchResults(searchString), 1000, {
      trailing: true,
    })
  );

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    // First we fetch locations

    await axios
      .get(
        `https://api.songkick.com/api/3.0/search/locations.json?query=${searchQuery}&apikey=${process.env.REACT_APP_SONGKICK_API_KEY}
        `
      )
      .then((res) => {
        // console.log("locations", res);
        if (res.data.resultsPage.results.hasOwnProperty("location")) {
          // console.log("huy", res.data.resultsPage.results.location.slice(0, 3));
          setLocations(res.data.resultsPage.results.location.slice(0, 3));
        } else {
          return [];
        }
      })
      .catch((e) => console.log(e));

    // Second we fetch artists

    await axios
      .get(
        `https://api.songkick.com/api/3.0/search/artists.json?apikey=${process.env.REACT_APP_SONGKICK_API_KEY}&query=${searchQuery}`
      )
      .then((res) => {
        try {
          const matchedArtists = res.data.resultsPage.results.artist.filter(
            (band) => {
              return band.displayName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            }
          );

          setArtists(matchedArtists.slice(0, 5));
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
      throttledFetchResults.current(searchString);
    } else {
      setArtists([]);
    }
  }, [searchString]);

  return (
    <>
      {loading ? (
        <Loader
          customPosition={
            xsScreen
              ? { left: "3%", top: 0, bottom: 0, margin: "auto 0px" }
              : { right: "5%" }
          }
          size={xsScreen ? "35px" : "50px"}
        />
      ) : (
        <MatchedResultsList
          clearInput={onClick}
          artists={artists}
          locations={locations}
        />
      )}
    </>
  );
};
