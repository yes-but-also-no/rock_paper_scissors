import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";
import {AnonymousName} from "../constants";

// this tracks all info related to the player
// high scores, rank, etc
interface PlayerInfo {
    playerName: string; // the name the player is using, or anonymous for anon play
}

// initial state for this slice
const initialState: PlayerInfo = {
    playerName: '', // start with no name
}

// create a slice of state
const playerInfoSlice = createSlice({
    name: 'playerInfo',
    initialState,
    reducers: {
        // sets the local players name
        setPlayerName: (state, action: PayloadAction<string>) => {
            // save name
            state.playerName = action.payload;
        }
    }
})

// pull actions
export const { setPlayerName } = playerInfoSlice.actions;

// selectors

// has the player chosen a name?
export const selectHasPickedName = (state: RootState) => state.playerInfo.playerName !== '';

// check if anon
export const selectPlayerIsAnonymous = (state: RootState) => state.playerInfo.playerName === AnonymousName;

// get the name
export const selectPlayerName = (state: RootState) => state.playerInfo.playerName;

export default playerInfoSlice.reducer;
