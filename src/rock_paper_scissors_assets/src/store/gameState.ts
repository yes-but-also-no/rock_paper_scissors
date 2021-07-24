import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

// this tracks the current game state
// popups, loading, etc
interface GameState {
    inMatch: boolean; // are we currently in a match? blocks header and footer
    errorMessage: string; // a current error to display
    inspectPlayerName: string; // a player we are inpsecting
    highScoresOpen: boolean; // is high scores open?
}

// initial state for this slice
const initialState: GameState = {
    inMatch: false,
    highScoresOpen: false,
    errorMessage: '',
    inspectPlayerName: ''
}

// create a slice of state
const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        // flags us as being in a match
        setInMatch: (state, action: PayloadAction<boolean>) => {
            // set our in match flag
            state.inMatch = action.payload;

            // if we are in a match, clear any other flags
            if (action.payload) {
                state.errorMessage = '';
                state.inspectPlayerName = '';
                state.highScoresOpen = false;
            }
        },
        // opens or closes the high scores menu
        setHighScoresOpen: (state, action: PayloadAction<boolean>) => {
            // if we are in a match, we cannot view scores
            if (state.inMatch)
                return;

            // set our high scores flag
            state.highScoresOpen = action.payload;

            // if we are opening, clear any other flags
            if (action.payload) {
                state.errorMessage = '';
                state.inspectPlayerName = '';
            }
        }
    }
})

// pull actions
export const {setInMatch, setHighScoresOpen} = gameStateSlice.actions;

// selectors

// are we in a match
export const selectInMatch = (state: RootState) => state.gameState.inMatch;

export default gameStateSlice.reducer;
