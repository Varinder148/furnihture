export const addItemToCart=( cartList, item)=>{
    const itemFound= cartList.find(
        cartItem => cartItem.id === item.id)
    
    if(itemFound){
        return cartList.map(cartItem =>
            cartItem.id === item.id
            ?{...cartItem, quantity: cartItem.quantity+1}
            :
            cartItem
            )
    }
    return [...cartList, {...item,quantity:1}]
}


export const removeItemFromCart= (cartList,ListItem) => {
    let filteredList = cartList.filter( ( item ) => item!==ListItem)
    return filteredList
}

export const removeOneItemFromCart = (cartList, ListItem) =>{

    return ListItem.quantity===1? removeItemFromCart(cartList,ListItem)
    :
    cartList.map( item => 
        item.id === ListItem.id?
        {...item ,quantity: ListItem.quantity-1}
        :
        item
    )
}
