import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

// this tracks high scores and player rankings
export type HighScores = [string, number][];

// initial state for this slice
const initialState: HighScores = []

// create a slice of state
const highScoresSlice = createSlice({
    name: 'highScores',
    initialState,
    reducers: {
        // adds the high scores into the store
        setHighScores: (state, action: PayloadAction<HighScores>) =>
            action.payload
    }
})

// pull actions
export const {setHighScores} = highScoresSlice.actions;

// selectors

// are we in a match
export const selectAllHighScores = (state: RootState) => state.highScores;

export default highScoresSlice.reducer;
