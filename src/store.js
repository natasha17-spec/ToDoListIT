import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    todolist: todolistReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;
