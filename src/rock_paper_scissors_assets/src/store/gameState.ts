import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";
import {setPlayerName} from "./playerInfo";

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
        },
        // selects a player for inspection
        setPlayerToInspect: (state, action: PayloadAction<string>) => {
            // if we are in a match, we cannot view scores
            if (state.inMatch)
                return;

            // set our high scores flag
            state.inspectPlayerName = action.payload;

            // if we are opening, clear any other flags
            if (action.payload !== '') {
                state.highScoresOpen = false;
                state.errorMessage = '';
            }
        },
    },
    extraReducers: builder =>
        builder.addCase(setPlayerName, () =>
            // return to initial state
            initialState
        )
})

// pull actions
export const {setInMatch, setHighScoresOpen, setPlayerToInspect} = gameStateSlice.actions;

// selectors

// are we in a match
export const selectInMatch = (state: RootState) => state.gameState.inMatch;

// is high scores open
export const selectIsHighScoresOpen = (state: RootState) => state.gameState.highScoresOpen;

// is player inspection open
export const selectIsInspectPlayerOpen = (state: RootState) => state.gameState.inspectPlayerName !== '';

// what player are we inspecting
export const selectPlayerToInspect = (state: RootState) => state.gameState.inspectPlayerName;

export default gameStateSlice.reducer;
