import React from "react";
import "./checkout.scss";
import CheckoutTable from "../../components/checkoutTable/checkoutTable.component";
import Minion from "../../svgAnimations/minion.animation/minion.animation";

const Checkout = (props) => {
  return (
    <>
      <h1 className="checkout-title">
        <span>Done, Already?</span>
        <div className="stonks">
          <Minion />
        </div>
      </h1>
      <div className="checkout-table">
        <CheckoutTable></CheckoutTable>
      </div>
    </>
  );
};

export default Checkout;
