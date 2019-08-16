import React from 'react';
export const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show===true ? "modal display-block" : "modal display-none";
    console.log(show);
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <br></br>
          <center><button onClick={handleClose}>close</button></center>
        </section>
      </div>
    );
};
