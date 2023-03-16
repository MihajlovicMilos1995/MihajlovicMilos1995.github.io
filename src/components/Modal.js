import React from "react";
import style from "../styles/Modal.module.css";
import ReactDOM from "react-dom";

const BackdropCart = ({ setCartIsShown }) => {
  return (
    <div className={style.backdrop} onClick={() => setCartIsShown(false)}></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackdropCart setCartIsShown={props.setCartIsShown} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
