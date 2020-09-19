import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../types";


const initialState=JSON.parse(localStorage.getItem("cartItems")) || [];
export const cartReducer=(
  state={cartItems:initialState} , 
  action)=>{
  switch(action.type){
    case ADD_TO_CART:
      return {
        cartItems:action.payload.cartItems
      }
    case REMOVE_FROM_CART:
      return{
        cartItems:action.payload.cartItems
      }
    case CLEAR_CART:
      return{
        cartItems:[],
      }

    default:
      return state;
  }
}