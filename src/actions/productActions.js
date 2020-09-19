import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = () =>{
  return async (dispatch)=>{
    const res = await fetch("/api/products");
    const data = await res.json();
    dispatch({
      type:FETCH_PRODUCTS,
      payload: data,
    })
  }
}

export const filterProducts = (products, size) =>{
  return (dispatch)=>{
    dispatch({
      type:FILTER_PRODUCTS_BY_SIZE,
      payload: {
        size, 
        items:size=== ""? products: 
        products.filter(x=> x.availableSizes.indexOf(size) >= 0)
      }
    })
  }
}

export const sortProducts = (products, sort) =>{
  return (dispatch) =>{
    dispatch({
      type:ORDER_PRODUCTS_BY_PRICE,
      payload:{
        sort,
        items:products.slice().sort((a,b)=>{
          if(sort === "lowest")
            return a.price - b.price;
          else
            return b.price - a.price;
        })
      }
    })
  }
}