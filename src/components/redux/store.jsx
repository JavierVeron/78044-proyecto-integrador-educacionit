import { combineReducers, createStore } from "redux"
import ProductReducer from "./reducers/ProductReducer"
import CartReducer from "./reducers/CartReducer"

const rootReducer = combineReducers({productos:ProductReducer, carrito:CartReducer})
const store = createStore(rootReducer)

export default store