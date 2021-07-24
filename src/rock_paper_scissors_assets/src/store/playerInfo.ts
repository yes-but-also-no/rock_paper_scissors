import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

// this tracks all info related to the player
// high scores, rank, etc
interface PlayerInfo {
    playerName: string; // the name the player is using, or anonymous for anon play
    score: number; // this players current score
}

// initial state for this slice
const initialState: PlayerInfo = {
    playerName: '', // start with no name
    score: 0 // and no score
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

            // reset score
            state.score = 0;

            // TODO: Fetch score
        }
    }
})

// pull actions
export const { setPlayerName } = playerInfoSlice.actions;

// selectors

// has the player chosen a name?
export const selectHasPickedName = (state: RootState) => state.playerInfo.playerName !== '';

export default playerInfoSlice.reducer;
