import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = ( product) =>{
  return (dispatch, getSate) =>{
    const cartItems = getSate().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.map(x=>{
      if(x._id === product._id){
        alreadyExists=true;
        x.count++;
      }
    });
    if(!alreadyExists){
      cartItems.push({...product, count:1});
    }
    dispatch({
      type:ADD_TO_CART,
      payload:{
        cartItems
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}

export const removeFromCart = ( product) =>{
  return (dispatch, getSate) =>{
    const cartItems=getSate().cart.cartItems.slice().filter(x=>x._id!==product._id);
    dispatch({
      type:REMOVE_FROM_CART,
      payload:{cartItems}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}