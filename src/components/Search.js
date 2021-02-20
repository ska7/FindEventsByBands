import React, { useContext, useRef, useState, useEffect } from "react";
import { MatchedBands } from "./MatchedBands";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { BandEvents } from "./BandEvents";
import { GlobalContext } from "../context/FavoritesContext";
import { FavoritesModal } from "./FavoritesModal";

import { FavoritesHeartButton } from "./FavoritesHeartButton";

export const Search = (props) => {
  const [modalIsOpen, openModal] = useState(false);
  const inputRef = useRef(null);

  // Context
  const {
    matchedBandsVisible,
    bandEventsVisible,
    showMatchedBands,
    showBandEvents,
    inputValue,
    setInputValue,
    placeholder,
    setPlaceholder,
  } = useContext(GlobalContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      showMatchedBands(true);
      showBandEvents(false);
      setPlaceholder("Type in a band name");
    } else {
      showMatchedBands(false);
      showBandEvents(false);
    }
  };

  useEffect(() => {
    console.log(props);
    inputRef.current.focus();
  }, []);

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          name="searchInput"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          ref={inputRef}
        />
      </div>

      {
        <TransitionGroup component={null}>
          {modalIsOpen && (
            <CSSTransition in={modalIsOpen} timeout={300} classNames="scale">
              <FavoritesModal />
            </CSSTransition>
          )}
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
            <CSSTransition
              in={bandEventsVisible}
              timeout={300}
              classNames="fade"
            >
              <BandEvents />
            </CSSTransition>
          )}
        </TransitionGroup>
      }
    </div>
  );
};
