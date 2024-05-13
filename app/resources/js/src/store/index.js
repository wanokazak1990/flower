import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {authReducer} from "./auth";
import {thunk} from "redux-thunk";
import {cartReducer} from "./Cart.js";


const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
})

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
