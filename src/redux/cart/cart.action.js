import cart from "./cart.types";

export const addItem = item =>
{
return ({
    type: cart.ADD_TO_CART,
    payload: item
})
}
export const toggleCartHidden = ()=>{
    
    return ({
        type: cart.TOGGLE_CART_HIDDEN
    })
}


export const removeItem =item =>{
    return ({
        type: cart.REMOVE_CART_ITEM,
        payload: item
    })
}

export const removeOneItem = item =>{
    return ({
        type: cart.REMOVE_ONE_CART_ITEM,
        payload: item
    })
}

export const emptyCart =item =>{
    return ({
        type:cart.EMPTY_CART
    })
}