import React from "react";

import "./cartMenuItem.styles.scss";

const cartMenuItem = (props) => {
  let { item } = props;
  return (
    <div className="cart-menu-item">
      {/* <span className='name'> */}
      <img src={item.url}></img>
      <span>{item.name}</span>
      {/* </span> */}
      {/* {props.children} */}
    </div>
  );
};

export default cartMenuItem;
