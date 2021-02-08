import React, { useContext, useRef, useState, useEffect } from "react";
import { MatchedBands } from "./MatchedBands";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { BandEvents } from "./BandEvents";
import { GlobalContext } from "../context/FavoritesContext";
import { FavoritesModal } from "./FavoritesModal";
import heartIcon from "../img/heart.png";

export const Search = () => {
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

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          name="searchInput"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type in a band name"
          autoComplete="off"
          ref={inputRef}
        />
      </div>
      <img
        onClick={() => openModal(!modalIsOpen)}
        id="btn-favorites-icon"
        src={heartIcon}
        alt="favorites-icon"
      />
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
          <CSSTransition in={bandEventsVisible} timeout={300} classNames="fade">
            <BandEvents />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
