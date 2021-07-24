import {combineReducers} from "redux";
import playerInfo from "./playerInfo";
import gameState from "./gameState";
import {configureStore} from "@reduxjs/toolkit";

// combine slices
const reducer = combineReducers({
    playerInfo,
    gameState
});

// make the store
const store = configureStore({
    reducer
});

// typescript is high maintenance, so we need these
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
