import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectedCartItems = createSelector([selectCart], (cart) =>
  cart.cartItems ? cart.cartItems : []
);

export const hideCart = createSelector([selectCart], (cart) => cart.hidden);

export const cartItemCount = createSelector([selectedCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const totalCartAmount = createSelector([selectedCartItems], (items) =>
  items
    ? items.reduce((total, curr) => total + curr.price * curr.quantity, 0)
    : 0
);
