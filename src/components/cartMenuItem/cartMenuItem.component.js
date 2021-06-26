import React from "react";

import "./cartMenuItem.styles.scss";

const cartMenuItem = (props) => {
  let { item } = props;
  return (
    <div className="cart-menu-item">
      <img src={item.url}></img>
      <span>{item.name}</span>
    </div>
  );
};

export default cartMenuItem;
