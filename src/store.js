import { createStore, combineReducers, compose,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer";
import { cartReducer } from "./reducers/cartReducers";
import {orderReducer} from './reducers/orderReducer';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
  products: productsReducer,
  cart:cartReducer,
  order:orderReducer,
}), composeEnhancer(applyMiddleware(thunk))
)
export default store;