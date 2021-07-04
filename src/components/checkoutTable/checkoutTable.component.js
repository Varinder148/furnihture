import React, { useState } from "react";
import { connect } from "react-redux";
import CartMenuItem from "../cartMenuItem/cartMenuItem.component";
import "./checkoutTable.style.scss";
import {
  addItem,
  emptyCart,
  removeItem,
  removeOneItem,
} from "../../redux/cart/cart.action";
import { createStructuredSelector } from "reselect";
import {
  hideCart,
  selectedCartItems,
  totalCartAmount,
} from "../../redux/cart/cart.selectors";
import { currUser } from "../../redux/user/user.selectors";
import MsgPopup from "../msgPopup/msgPopup.component";
import tumbleweed from '../../assets/tumbleweed.png'


const CheckoutTable = ({
  total,
  removeOneItem,
  loggedInUser,
  emptyCart,
  removeItem,
  hidden,
  addItem,
  cartItems,
  ...others
}) => {
  // let total = 0;
  const [status, setStatus] = useState(0);
  const [msg, setMsg] = useState("");
  const [showBox, setShowBox] = useState(false);

  const buyStuff = async () => {
    if (cartItems.length > 0 && loggedInUser) {
      setShowBox(true);
      setMsg("Payment done");
      setStatus("payment");
      emptyCart();
    } else if (!loggedInUser) {
      setShowBox(true);
      setMsg("You need to be logged in to buy.");
      setStatus("error");
    } else {
      setShowBox(true);
      setMsg("Add something to cart first");
      setStatus("error");
    }
  };

  return (
    <>
      {showBox ? (
        <MsgPopup
          status={status}
          onClick={() => {
            setShowBox(false);
          }}
        >
          {msg}
        </MsgPopup>
      ) : null}

      <div className="checkout">
        <ul>
          {cartItems.length ? (
            cartItems.map((item) => {
              return (
                <li key={item.id}>
                  <div className="list-content">
                    <CartMenuItem item={item}></CartMenuItem>
                    <div>
                      <p className="aligned">
                        <span
                          className="clickable"
                          onClick={() => removeOneItem(item)}
                        >
                          {" "}
                          &#10094;{" "}
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          className="clickable"
                          onClick={() => addItem(item)}
                        >
                          {" "}
                          &#10095;{" "}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="aligned">
                        <span> </span>
                        <span>${item.price * item.quantity}</span>
                        <span
                          className="clickable"
                          onClick={() => removeItem(item)}
                        >
                          {" "}
                          &#10007;{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <>
              <h3>
                So empty..
              </h3>
              <div className='tumbleweed-wrapper'>
              <img className='tumbleweed' src={tumbleweed} alt='tumbleweed'></img>
              </div>
            </>
          )}
        </ul>
      </div>
      <div className="net-total">
        <p>Net Total: </p>
        <p>${total}</p>
        <button onClick={buyStuff}>Pay here</button>
      </div>
      {/* <BirdSvg></BirdSvg> */}
      {/* <object type="image/svg+xml" data={BirdSvg}>svg-animation</object> */}
    </>
  );
};

// const mapPropsToDispatch = ({ cart: { cartItems, hidden } }) => ({
//     cartItems,
//     hidden
// })

const mapPropsToDispatch = createStructuredSelector({
  total: totalCartAmount,
  hidden: hideCart,
  cartItems: selectedCartItems,
  loggedInUser: currUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (item) => dispatch(removeItem(item)),
    addItem: (item) => dispatch(addItem(item)),
    removeOneItem: (item) => dispatch(removeOneItem(item)),
    emptyCart: () => dispatch(emptyCart()),
  };
};

export default connect(mapPropsToDispatch, mapDispatchToProps)(CheckoutTable);
// export default CheckoutTable
