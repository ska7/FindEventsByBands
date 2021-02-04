import React, { useContext, useState } from "react";
import { MatchedBands } from "./MatchedBands";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { BandEvents } from "./BandEvents";
import { GlobalContext } from "../context/FavoritesContext";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    matchedBandsVisible,
    bandEventsVisible,
    showMatchedBands,
    showBandEvents,
  } = useContext(GlobalContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      showMatchedBands(true);
      showBandEvents(false);
    } else {
      showMatchedBands(false);
      showBandEvents(false);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        name="searchInput"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type in a band name"
        autoComplete="off"
      />
      <TransitionGroup component={null}>
        {matchedBandsVisible && (
          <CSSTransition
            in={matchedBandsVisible}
            classNames="fade"
            timeout={500}
          >
            <MatchedBands searchString={inputValue} />
          </CSSTransition>
        )}
        {bandEventsVisible && (
          <CSSTransition in={bandEventsVisible} timeout={300} classNames="fade">
            <BandEvents />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
