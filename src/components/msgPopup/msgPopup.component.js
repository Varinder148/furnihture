import React, { useState } from "react";

import {
  faCheck,
  faCross,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./msgPopup.style.scss";

const MsgPopup = (props) => {
  let { status, redirect, history, onClick } = props;
  return (
    <>
      <div className="msgPopup">
        <button className="close-icon " onClick={onClick}>
          X
        </button>
        <div className={`content ${status}`}>
          <span className="icon " hidden={status !== "payment"}>
            <img src="https://i.imgflip.com/5azowq.jpg"></img>
          </span>

          <span className="icon" hidden={status !== "error"}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size="3x"
            ></FontAwesomeIcon>
          </span>

          <span
            className="icon "
            hidden={!(status === "success" || status === "payment")}
          >
            <FontAwesomeIcon icon={faCheck} size="3x"></FontAwesomeIcon>
          </span>

          <span className="msg">{props.children}</span>
        </div>
      </div>
    </>
  );
};
export default MsgPopup;
