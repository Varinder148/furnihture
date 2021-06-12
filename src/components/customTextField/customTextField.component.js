import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useRef } from "react";
import { Button, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./customTextField.styles.scss";

const CustomTextField = (props) => {
  let { type, name, showError, errorMessage, ...others } = props;

  const renderTooltip = (props) => {
    return (
      <Tooltip id="tooltip" {...props}>
        {errorMessage}
      </Tooltip>
    );
  };
  return (
    <>
      <div className="textField">
        <label>{props.label ? props.label : name}</label>

        <OverlayTrigger
          placement="bottom"
          id="overlay"
          // delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
          show={showError}
        >
          <input name={name} type={type ? type : "text"} {...others} />
        </OverlayTrigger>
      </div>
    </>
  );
};
export default CustomTextField;
