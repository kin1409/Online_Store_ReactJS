import { combineReducers, legacy_createStore as createStore } from "redux";
import { authReducer, cartReducer } from "./store";

const rootReducer = combineReducers({

    auth: authReducer,
    cart: cartReducer,
})

const store = createStore(
    rootReducer,
);

export default store;