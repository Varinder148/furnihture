import React from "react";
import "./customHeading.style.scss";

const CustomHeading = (props) => (
  <>
    <h1 className="custom-heading">{props.children}</h1>
  </>
);

export default CustomHeading;
