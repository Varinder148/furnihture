import React from "react";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./cartIcon.styles.scss";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const CartIcon = ({ hidden, history, cartItemsCount, toggle, onClick }) => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  const check = () => {
    onClick();
    if (vw >= 800) {
      toggle();
    } else {
      if (!hidden) {
        toggleCartHidden();
      }
      history.push("/checkout");
    }
  };

  return (
    <div className="cart-icon" onClick={check}>
      <FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
      <span>{cartItemsCount}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: () => dispatch(toggleCartHidden()),
  };
};

const mapPropsToDispatch = ({ cart: { cartItems, hidden } }) => ({
  cartItemsCount: cartItems.reduce(
    (count, cartItem) => count + cartItem.quantity,
    0
  ),
  hidden: hidden,
});

export default connect(
  mapPropsToDispatch,
  mapDispatchToProps
)(withRouter(CartIcon));
