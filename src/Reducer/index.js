import { combineReducers } from "redux";
import itemReducer from "./item.js";

const rootReducer = combineReducers({
    itemState: itemReducer
});

export default rootReducer;
