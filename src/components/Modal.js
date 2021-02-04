import React from "react";

export const Modal = ({ modalIsOpen }) => {
  return (
    <div className="favorites-modal-overlay">
      {modalIsOpen ? (
        <div className="favorites-modal">Heeey we're open</div>
      ) : null}
    </div>
  );
};
