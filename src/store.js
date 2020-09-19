import { createStore, combineReducers, compose,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer";



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
  products: productsReducer,
}), composeEnhancer(applyMiddleware(thunk))
)
export default store;