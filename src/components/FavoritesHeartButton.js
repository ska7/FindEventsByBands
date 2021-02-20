import React, { useState } from "react";
import { FavoritesModal } from "./FavoritesModal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import heartIcon from "../img/heart.png";

export const FavoritesHeartButton = () => {
  const [modalIsOpen, openModal] = useState(false);
  return (
    <div>
      <img
        onClick={() => openModal(!modalIsOpen)}
        id="btn-favorites-icon"
        src={heartIcon}
        alt="favorites-icon"
      />
      <TransitionGroup>
        {modalIsOpen && (
          <CSSTransition in={modalIsOpen} timeout={300} classNames="scale">
            <FavoritesModal />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
