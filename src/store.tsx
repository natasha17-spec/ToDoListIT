import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleware from "redux-thunk";
import todolistReducer from "./reducer";

const rootReducer = combineReducers({
    todolist: todolistReducer
});

type RootReducerType= typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;
