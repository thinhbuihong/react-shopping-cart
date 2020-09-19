import { createStore, combineReducers, compose,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer";
import { cartReducer } from "./reducers/cartReducers";



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
  products: productsReducer,
  cart:cartReducer,
}), composeEnhancer(applyMiddleware(thunk))
)
export default store;