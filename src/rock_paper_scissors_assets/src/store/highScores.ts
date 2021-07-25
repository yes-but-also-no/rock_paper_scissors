import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

// this tracks high scores and player rankings
export type HighScores = [string, number][];

// initial state for this slice
const initialState: HighScores = []

// params for player high score
interface PlayerHighScoreParams {
    playerName: string; // the player to update
    score: number; // their score
}

// helper to sort high scores
export const sortHighScores = (highScores: HighScores): HighScores =>
    highScores.sort(([, a], [, b]) => b - a);

// create a slice of state
const highScoresSlice = createSlice({
    name: 'highScores',
    initialState,
    reducers: {
        // adds the high scores into the store
        setHighScores: (state, action: PayloadAction<HighScores>) =>
            action.payload,
        // updates a single players high score
        updatePlayerHighScore: (state, action: PayloadAction<PlayerHighScoreParams>) => {
            // expand action
            const {playerName, score} = action.payload;

            // loop all scores
            const updated: HighScores = state
                .map(([pName, pScore]) => {
                    // if its not us, it stays the same
                    if (pName !== playerName)
                        return [pName, pScore];

                    // it is us! update score
                    return [pName, score];
                });

            // sort
            return sortHighScores(updated);
        }
    }
})

// pull actions
export const {setHighScores, updatePlayerHighScore} = highScoresSlice.actions;

// selectors

// are we in a match
export const selectAllHighScores = (state: RootState) => state.highScores;

export default highScoresSlice.reducer;
