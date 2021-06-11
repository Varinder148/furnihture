import React from "react";
import "./cartIconMenu.styles.scss";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import { connect } from "react-redux";
import CartMenuItem from "../cartMenuItem/cartMenuItem.component";
import { Link } from "react-router-dom";

const CartIconMenu = (props) => {
  let { hidden, cartItems, toggleCartHidden } = props;
  return (
    <>
      <div className="cart-icon-menu" hidden={hidden}>
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return (
                <li key={item.id} className="item">
                  <span className="wrapper">
                    <CartMenuItem item={item}></CartMenuItem>
                  </span>
                  <p className="quantity"> x {item.quantity}</p>
                </li>
              );
            })
          ) : (
            <p>No items in cart</p>
          )}
        </ul>
        <Link
          to={`/checkout`}
          style={{ textDecoration: "none", color: "chocolate" }}
          onClick={() => {
            toggleCartHidden();
          }}
        >
          <button className="go-to-cart">Go To Cart</button>
        </Link>
      </div>
    </>
  );
};

const mapPropsToDispatch = ({ cart: { hidden, cartItems } }) => ({
  hidden,
  cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapPropsToDispatch, mapDispatchToProps)(CartIconMenu);
