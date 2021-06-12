import { buyItems } from "./cart.action";
import cart from "./cart.types";
import {
  addItemToCart,
  removeItemFromCart,
  removeOneItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
  hidden: true,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cart.ADD_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case cart.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case cart.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case cart.REMOVE_ONE_CART_ITEM:
      return {
        ...state,
        cartItems: removeOneItemFromCart(state.cartItems, action.payload),
      };
    case cart.EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
